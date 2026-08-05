<template>
  <div class="form-page">
    <div class="form-card">
      <h2 class="form-section-title">模組一：基本資料與課程設定</h2>
      <div class="form-grid">
        <div class="form-field">
          <label>學校英文名稱<span class="required">*</span></label>
          <input v-model="form.name_en" type="text" placeholder="Sendagaya Japanese Institute" />
        </div>
        <div class="form-field">
          <label>學校日文名稱<span class="required">*</span></label>
          <input v-model="form.name_ja" type="text" placeholder="千駄ヶ谷日本語學校" />
        </div>
        <div class="form-field">
          <label>所在城市<span class="required">*</span></label>
          <select v-model="form.city">
            <option value="">請選擇</option>
            <option>東京</option><option>大阪</option><option>京都</option>
            <option>橫濱</option><option>名古屋</option><option>福岡</option>
            <option>札幌</option><option>神戶</option><option>仙台</option>
            <option>廣島</option><option>千葉</option><option>埼玉</option>
            <option>其他日本城市</option>
          </select>
        </div>
        <div class="form-field">
          <label>都道府縣<span class="required">*</span></label>
          <select v-model="form.prefecture">
            <option value="">請選擇</option>
            <option>東京都</option><option>大阪府</option><option>京都府</option>
            <option>神奈川縣</option><option>愛知縣</option><option>福岡縣</option>
            <option>北海道</option><option>兵庫縣</option><option>宮城縣</option>
            <option>廣島縣</option><option>千葉縣</option><option>埼玉縣</option>
            <option>其他都道府縣</option>
          </select>
        </div>
        <div class="form-field form-field--full">
          <label>完整地址<span class="required">*</span></label>
          <textarea v-model="form.address" rows="2" placeholder="日文與英文完整街區地址" />
        </div>
        <div class="form-field">
          <label>Google 地圖連結</label>
          <input v-model="form.google_maps_url" type="url" placeholder="https://maps.google.com/..." />
        </div>
        <div class="form-field">
          <label>學校官方網站</label>
          <input v-model="form.website" type="url" placeholder="https://..." />
        </div>
        <div class="form-field">
          <label>合作狀態</label>
          <select v-model="form.cooperation_status">
            <option>簽約中</option><option>合作中</option>
            <option>暫停合作</option><option>已終止</option>
          </select>
        </div>
        <div class="form-field">
          <label>全校學生容量</label>
          <input v-model="form.capacity" type="number" placeholder="例: 300" />
        </div>
        <div class="form-field form-field--full">
          <label>提供課程類型<span class="required">*</span></label>
          <div class="checkbox-group">
            <label v-for="course in courseTypes" :key="course" class="checkbox-item">
              <input
                type="checkbox"
                :value="course"
                :checked="form.course_types?.includes(course)"
                @change="toggleCourse(course)"
              />
              {{ course }}
            </label>
          </div>
        </div>
        <div class="form-field form-field--full">
          <label>入學學期</label>
          <div class="checkbox-group">
            <label v-for="term in terms" :key="term" class="checkbox-item">
              <input
                type="checkbox"
                :value="term"
                :checked="form.intake_terms?.includes(term)"
                @change="toggleTerm(term)"
              />
              {{ term }}
            </label>
          </div>
        </div>
      </div>

      <h2 class="form-section-title">模組二：合約與分潤條件</h2>
      <div class="form-grid">
        <div class="form-field">
          <label>合約狀態</label>
          <select v-model="form.contract_status">
            <option>正式生效</option><option>草稿</option>
            <option>審核中</option><option>已到期</option><option>續約洽談中</option>
          </select>
        </div>
        <div class="form-field">
          <label>抽成/佣金比例 (%)<span class="required">*</span></label>
          <input v-model="form.commission_rate" type="number" placeholder="例: 15" />
        </div>
        <div class="form-field">
          <label>合約起始日期<span class="required">*</span></label>
          <input v-model="form.contract_start" type="date" />
        </div>
        <div class="form-field">
          <label>合約到期日期<span class="required">*</span></label>
          <input v-model="form.contract_end" type="date" />
        </div>
        <div class="form-field">
          <label>內部負責人員<span class="required">*</span></label>
          <select v-model="form.internal_owner">
            <option value="">請選擇</option>
            
            <option>Aiden</option><option>Angela</option>
          </select>
        </div>
        <div class="form-field form-field--full">
          <label>佣金結算條件說明</label>
          <textarea v-model="form.commission_notes" rows="3" placeholder="例：學生完成報名且繳清首期學費、出席率達80%等" />
        </div>
      </div>

      <h2 class="form-section-title">模組三：學校聯絡人</h2>
      <div v-for="(contact, i) in form.contacts" :key="i" class="contact-block">
        <div class="contact-block__header">
          <span>聯絡人 {{ (i as number) + 1 }}</span>
          <button class="btn-remove" @click="removeContact((i as number))">移除</button>
        </div>
        <div class="form-grid">
          <div class="form-field">
            <label>姓名<span class="required">*</span></label>
            <input v-model="contact.name" type="text" />
          </div>
          <div class="form-field">
            <label>職務分類<span class="required">*</span></label>
            <select v-model="contact.role">
              <option value="">請選擇</option>
              <option>招生部</option><option>財務/會計部</option>
              <option>學生生活輔導</option><option>學校負責人/校長</option>
            </select>
          </div>
          <div class="form-field">
            <label>Email<span class="required">*</span></label>
            <input v-model="contact.email" type="email" />
          </div>
          <div class="form-field">
            <label>電話</label>
            <input v-model="contact.phone" type="text" />
          </div>
          <div class="form-field">
            <label>LINE / WeChat ID</label>
            <input v-model="contact.im_id" type="text" />
          </div>
          <div class="form-field">
            <label>偏好溝通語言</label>
            <select v-model="contact.language">
              <option>日文</option><option>英文</option>
              <option>繁體中文</option><option>簡體中文</option>
            </select>
          </div>
        </div>
      </div>
      <button class="btn-add-contact" @click="addContact">+ 新增聯絡人</button>

      <h2 class="form-section-title">模組五：銀行帳務資料</h2>
      <div class="form-grid">
        <div class="form-field">
          <label>銀行名稱</label>
          <input v-model="form.bank_name" type="text" placeholder="例：三菱UFJ銀行" />
        </div>
        <div class="form-field">
          <label>分行名稱</label>
          <input v-model="form.bank_branch" type="text" />
        </div>
        <div class="form-field">
          <label>分行代碼</label>
          <input v-model="form.bank_branch_code" type="text" placeholder="3位數" />
        </div>
        <div class="form-field">
          <label>存款類型</label>
          <select v-model="form.bank_account_type">
            <option>普通預金</option><option>當座預金</option>
          </select>
        </div>
        <div class="form-field">
          <label>帳戶號碼</label>
          <input v-model="form.bank_account_no" type="password" placeholder="加密保護" />
        </div>
        <div class="form-field">
          <label>戶名</label>
          <input v-model="form.bank_account_name" type="text" />
        </div>
        <div class="form-field">
          <label>SWIFT / BIC Code</label>
          <input v-model="form.bank_swift" type="text" placeholder="例：BOTKJPJT" />
        </div>
        <div class="form-field">
          <label>結算幣別</label>
          <select v-model="form.bank_currency">
            <option>JPY</option><option>USD</option><option>TWD</option>
          </select>
        </div>
      </div>

      <div class="form-actions">
        <NuxtLink to="/admin/schools" class="btn-secondary">取消</NuxtLink>
        <button class="btn-primary" :disabled="submitting" @click="submit">
          {{ submitting ? '儲存中...' : '儲存學校' }}
        </button>
      </div>

      <div v-if="error" class="form-error">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const submitting = ref(false)
const error = ref('')

const courseTypes = [
  '長期一般留學課程', '短期集中日語課程', '大學/大學院升學輔導',
  '商業日語/就職準備', 'JLPT 日檢衝刺班', '文化體驗/暑期營',
  '1對1 個人客製化課程', '特定技能/打工度假',
]

const terms = ['1月期', '4月期', '7月期', '10月期']

const form = reactive<Record<string, any>>({
  name_en: '',
  name_ja: '',
  city: '',
  prefecture: '',
  address: '',
  google_maps_url: '',
  website: '',
  cooperation_status: '簽約中',
  capacity: '',
  course_types: [] as string[],
  intake_terms: [] as string[],
  contract_status: '正式生效',
  commission_rate: '',
  contract_start: '',
  contract_end: '',
  internal_owner: '',
  commission_notes: '',
  contacts: [] as any[],
  bank_name: '',
  bank_branch: '',
  bank_branch_code: '',
  bank_account_type: '普通預金',
  bank_account_no: '',
  bank_account_name: '',
  bank_swift: '',
  bank_currency: 'JPY',
})

function toggleCourse(course: string) {
  const idx = form.course_types.indexOf(course)
  if (idx === -1) form.course_types.push(course)
  else form.course_types.splice(idx, 1)
}

function toggleTerm(term: string) {
  const idx = form.intake_terms.indexOf(term)
  if (idx === -1) form.intake_terms.push(term)
  else form.intake_terms.splice(idx, 1)
}

function addContact() {
  form.contacts.push({
    name: '', role: '', email: '', phone: '', im_id: '', language: '日文',
  })
}

function removeContact(i: number) {
  form.contacts.splice(i, 1)
}

async function submit() {
  if (!form.name_en || !form.name_ja || !form.city || !form.prefecture ||
      !form.address || !form.commission_rate || !form.contract_start ||
      !form.contract_end || !form.internal_owner) {
    error.value = '請填寫所有必填欄位（*）'
    return
  }

  submitting.value = true
  error.value = ''

  try {
    await $fetch('/api/admin/schools', {
      method: 'POST',
      body: { ...form },
    })
    navigateTo('/admin/schools')
  } catch (e) {
    error.value = '儲存失敗，請再試一次'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.form-page { max-width: 860px; }

.form-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  padding: 28px 32px;
}

.form-section-title {
  font-size: 13px;
  font-weight: 700;
  color: #1a1a2e;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 24px 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e5e5;
}

.form-section-title:first-child { margin-top: 0; }

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-field--full { grid-column: 1 / -1; }
.form-field label { font-size: 12px; font-weight: 600; color: #555; }
.required { color: #e53e3e; margin-left: 2px; }

.form-field input,
.form-field select,
.form-field textarea {
  padding: 8px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  font-size: 13px;
  color: #333;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus { border-color: #1a1a2e; }
.form-field textarea { resize: vertical; }

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  font-weight: 400;
}

.checkbox-item input[type="checkbox"] { cursor: pointer; }

/* 聯絡人區塊 */
.contact-block {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.contact-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  font-size: 13px;
  font-weight: 600;
  color: #555;
}

.btn-remove {
  padding: 4px 10px;
  background: #fde8e8;
  color: #e53e3e;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.btn-add-contact {
  margin-top: 4px;
  padding: 8px 16px;
  background: #f5f5f5;
  color: #555;
  border: 1px dashed #ccc;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  width: 100%;
  transition: background 0.15s;
}

.btn-add-contact:hover { background: #eee; }

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #e5e5e5;
}

.btn-primary {
  padding: 8px 20px;
  background: #1a1a2e;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s;
}

.btn-primary:hover:not(:disabled) { background: #2e2e4e; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-secondary {
  padding: 8px 20px;
  background: #fff;
  color: #333;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s;
}

.btn-secondary:hover { background: #f5f5f5; }

.form-error {
  margin-top: 12px;
  padding: 10px 14px;
  background: #fde8e8;
  color: #e53e3e;
  border-radius: 6px;
  font-size: 13px;
}
</style>