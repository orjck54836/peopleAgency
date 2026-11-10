import dims from './image-dims.json'

/**
 * 查圖片的原始寬高（由 scripts/generate-image-dims.mjs 產生）。
 * 查不到就回傳空物件，<img> 不帶 width / height，行為和以前一樣。
 */
export function imageDims(src?: string | null): { width?: number; height?: number } {
  if (!src) return {}
  let key = src
  try {
    key = decodeURI(src)
  } catch {
    // 不是合法的編碼字串就用原字串查
  }
  const size = (dims as Record<string, number[]>)[key]
  return size ? { width: size[0], height: size[1] } : {}
}
