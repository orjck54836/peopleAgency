#!/usr/bin/env bash
set -euo pipefail

# 讀 .env.deploy
if [ -f .env.deploy ]; then
  export $(grep -v '^#' .env.deploy | xargs)
fi

# 預設
AWS_REGION="${AWS_REGION:-ap-northeast-3}"
S3_BUCKET="${S3_BUCKET:?S3_BUCKET 未設定}"
CLOUDFRONT_DIST_ID="${CLOUDFRONT_DIST_ID:?CLOUDFRONT_DIST_ID 未設定}"
SLS_STAGE="${SLS_STAGE:-dev}"

# 確認在含 serverless.yml 的資料夾
test -f serverless.yml || { echo "❌ 找不到 serverless.yml，請在專案根目錄執行"; exit 1; }

echo "==> Step 1: Build（前後端同一版）"
npm run build

echo "==> 檢查 Nitro 產物"
test -f .output/server/index.mjs || { echo "❌ .output/server/index.mjs 不存在"; exit 1; }
du -sh .output/server || true

echo "==> Step 1.5: 產生文章列表 JSON"
node scripts/generate-news-json.mjs

echo "==> Step 2: 同步前端到 S3：s3://$S3_BUCKET"

# 2a. _nuxt/ 帶 hash 資源 → 長快取（sync 自動設對 content-type，不用 cp）
aws s3 sync .output/public/_nuxt "s3://$S3_BUCKET/_nuxt" --delete \
  --cache-control "public,max-age=31536000,immutable" \
  ${AWS_PROFILE:+--profile "$AWS_PROFILE"} --region "$AWS_REGION"

# 2b. 其餘檔案（排除 _nuxt）→ 短快取
aws s3 sync .output/public "s3://$S3_BUCKET" \
  --exclude "_nuxt/*" \
  --cache-control "public,max-age=0,must-revalidate" \
  ${AWS_PROFILE:+--profile "$AWS_PROFILE"} --region "$AWS_REGION"

echo "==> Step 3: 部署後端（Serverless）"

# 先打包檢查 zip 內容
npx serverless package --stage "$SLS_STAGE" --verbose
unzip -l .serverless/*.zip | sed -n '1,60p' | tee /tmp/sls_zip_list.txt
grep -q ".output/server/index.mjs" /tmp/sls_zip_list.txt || { echo "❌ zip 內沒有 .output/server，檢查 package.patterns"; exit 1; }

# 正式部署（--force 確保上傳）
npx serverless deploy --stage "$SLS_STAGE" --force --verbose

echo "==> 取得 API 資訊（確認真的有部署）"
npx serverless info --stage "$SLS_STAGE" --verbose || true

echo "==> Step 4: CloudFront 清快取"
aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DIST_ID" \
  --paths '/*' \
  ${AWS_PROFILE:+--profile "$AWS_PROFILE"}

echo "==> Step 5: 確認 Lambda runtime"
RUNTIME=$(aws lambda get-function-configuration \
  --function-name "nuxt-nitro-${SLS_STAGE}-web" \
  --query "Runtime" --output text \
  ${AWS_PROFILE:+--profile "$AWS_PROFILE"} --region "$AWS_REGION" 2>/dev/null || echo "unknown")
echo "Lambda runtime: $RUNTIME"
if [ "$RUNTIME" != "nodejs22.x" ]; then
  echo "⚠️  runtime 不是 nodejs22.x，強制更新..."
  aws lambda update-function-configuration \
    --function-name "nuxt-nitro-${SLS_STAGE}-web" \
    --runtime nodejs22.x \
    ${AWS_PROFILE:+--profile "$AWS_PROFILE"} --region "$AWS_REGION" > /dev/null
  echo "✅ runtime 已更新為 nodejs22.x"
fi

echo "✅ 完成：前端 + 後端 部署成功（stage=$SLS_STAGE, region=$AWS_REGION）"