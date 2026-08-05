<template>
  <div class="form-page">
    <div v-if="pending" class="loading">載入中...</div>
    <div v-else-if="!school" class="loading">找不到此筆資料</div>
    <template v-else>
      <div class="status-bar">
        <div class="status-bar__left">
          <span class="mono">{{ school.school_id }}</span>
          <span :class="`badge badge--${cooperationClass(form.cooperation_status)}`">
            {{ form.cooperation_status }}
          </span>
          <span :class="`badge badge--${contractClass(form.contract_status)}`">
            {{ form.contract_status }}
          </span>
        </div>
        <div class="status-bar__right">
          <button class="btn-secondary" @click="navigateTo('/admin/schools')">返回列表</button>
          <button class="btn-primary" :disabled="submitting" @click="save">
            {{ submitting ? '儲存中...' : '儲存變更' }}
          </button>
        </div>
      </div>

      <div class="form-card">
        <h2 class="form-section-title">模組一：基本資料與課程設定</h2>
        <div class="form-grid">
          <div class="form-field">
            <label>學校英文名稱<span class="required">*</span></label>
            <input v-model="form.name_en" type="text" />
          </div>
          <div class="form-field">
            <label>學校日文名稱<span class="required">*</span></label>
            <input v-model="form.name_ja" type="text" />
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
            <label>完整地址</label>
            <textarea v-model="form.address" rows="2" />
          </div>
          <div class="form-field">
            <label>Google 地圖連結</label>
            <input v-model="form.google_maps_url" type="url" />
          </div>
          <div class="form-field">
            <label>學校官方網站</label>
            <input v-model="form.website" type="url" />
          </div>
          <div class="form-field">
            <label>合作狀態</label>
            <select v-model="form.cooperation_status">
              <option>合作中</option><option>簽約中</option>
              <option>暫停合作</option><option>已終止</option>
            </select>
          </div>
          <div class="form-field">
            <label>全校學生容量</label>
            <input v-model="form.capacity" type="number" />
          </div>
          <div class="form-field form-field--full">
            <label>提供課程類型</label>
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
            <label>抽成/佣金比例 (%)</label>
            <input v-model="form.commission_rate" type="number" />
          </div>
          <div class="form-field">
            <label>合約起始日期</label>
            <input v-model="form.contract_start" type="date" />
          </div>
          <div class="form-field">
            <label>合約到期日期</label>
            <input v-model="form.contract_end" type="date" />
          </div>
          <div class="form-field">
            <label>內部負責人員</label>
            <select v-model="form.internal_owner">
              <option value="">請選擇</option>
              
              <option>Aiden</option><option>Angela</option>
            </select>
          </div>
          <div class="form-field form-field--full">
            <label>佣金結算條件說明</label>
            <textarea v-model="form.commission_notes" rows="3" />
          </div>
        </div>

        <h2 class="form-section-title">模組三：學校聯絡人</h2>
        <div v-for="(contact, i) in form.contacts" :key="i" class="contact-block">
          <div class="contact-block__header">
            <span>聯絡人 {{ (i as number) + 1 }}</span>
            <button class="btn-remove" @click="removeContact(i as number)">移除</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>姓名</label>
              <input v-model="contact.name" type="text" />
            </div>
            <div class="form-field">
              <label>職務分類</label>
              <select v-model="contact.role">
                <option value="">請選擇</option>
                <option>招生部</option><option>財務/會計部</option>
                <option>學生生活輔導</option><option>學校負責人/校長</option>
              </select>
            </div>
            <div class="form-field">
              <label>Email</label>
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
            <input v-model="form.bank_name" type="text" />
          </div>
          <div class="form-field">
            <label>分行名稱</label>
            <input v-model="form.bank_branch" type="text" />
          </div>
          <div class="form-field">
            <label>分行代碼</label>
            <input v-model="form.bank_branch_code" type="text" />
          </div>
          <div class="form-field">
            <label>存款類型</label>
            <select v-model="form.bank_account_type">
              <option>普通預金</option><option>當座預金</option>
            </select>
          </div>
          <div class="form-field">
            <label>帳戶號碼</label>
            <input v-model="form.bank_account_no" type="password" />
          </div>
          <div class="form-field">
            <label>戶名</label>
            <input v-model="form.bank_account_name" type="text" />
          </div>
          <div class="form-field">
            <label>SWIFT / BIC Code</label>
            <input v-model="form.bank_swift" type="text" />
          </div>
          <div class="form-field">
            <label>結算幣別</label>
            <select v-model="form.bank_currency">
              <option>JPY</option><option>USD</option><option>TWD</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button class="btn-secondary" @click="navigateTo('/admin/schools')">返回列表</button>
          <button class="btn-primary" :disabled="submitting" @click="save">
            {{ submitting ? '儲存中...' : '儲存變更' }}
          </button>
        </div>

        <div v-if="saveError" class="form-error">{{ saveError }}</div>
        <div v-if="saveSuccess" class="form-success">已成功儲存</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const route = useRoute()
const id = route.params.id as string

const { data: school, pending } = await useFetch<any>(`/api/admin/schools/${id}`)

const form = reactive<Record<string, any>>({
  course_types: [] as string[],
  intake_terms: [] as string[],
  contacts: [] as any[],
})

const submitting = ref(false)
const saveError = ref('')
const saveSuccess = ref(false)

watch(school, (val) => {
  if (val) Object.assign(form, {
    ...val,
    course_types: val.course_types ?? [],
    intake_terms: val.intake_terms ?? [],
    contacts: val.contacts ?? [],
  })
}, { immediate: true })

const courseTypes = [
  '長期一般留學課程', '短期集中日語課程', '大學/大學院升學輔導',
  '商業日語/就職準備', 'JLPT 日檢衝刺班', '文化體驗/暑期營',
  '1對1 個人客製化課程', '特定技能/打工度假',
]

const terms = ['1月期', '4月期', '7月期', '10月期']

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

async function save() {
  submitting.value = true
  saveError.value = ''
  saveSuccess.value = false

  try {
    await $fetch(`/api/admin/schools/${id}`, {
      method: 'PUT',
      body: { ...form },
    })
    saveSuccess.value = true
    setTimeout(() => saveSuccess.value = false, 3000)
  } catch (e) {
    saveError.value = '儲存失敗，請再試一次'
  } finally {
    submitting.value = false
  }
}

function cooperationClass(status: string) {
  const map: Record<string, string> = {
    '合作中': 'green', '簽約中': 'warm',
    '暫停合作': 'cold', '已終止': 'grey',
  }
  return map[status] ?? 'grey'
}

function contractClass(status: string) {
  const map: Record<string, string> = {
    '正式生效': 'green', '草稿': 'grey',
    '審核中': 'warm', '已到期': 'hot', '續約洽談中': 'cold',
  }
  return map[status] ?? 'grey'
}
</script>

<style scoped>
.form-page { max-width: 860px; }
.loading { color: #888; padding: 40px 0; text-align: center; }

.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.status-bar__left { display: flex; align-items: center; gap: 10px; }
.status-bar__right { display: flex; gap: 10px; }

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

.checkbox-group { display: flex; flex-wrap: wrap; gap: 10px; }

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  font-weight: 400;
}

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

.mono { font-family: monospace; font-size: 12px; color: #888; }

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.badge--green { background: #c6f0d4; color: #2d8a4e; }
.badge--hot { background: #fde8e8; color: #e53e3e; }
.badge--warm { background: #fef3cd; color: #d97706; }
.badge--cold { background: #e8f4fd; color: #3182ce; }
.badge--grey { background: #f0f0f0; color: #888; }

.form-error {
  margin-top: 12px;
  padding: 10px 14px;
  background: #fde8e8;
  color: #e53e3e;
  border-radius: 6px;
  font-size: 13px;
}

.form-success {
  margin-top: 12px;
  padding: 10px 14px;
  background: #c6f0d4;
  color: #2d8a4e;
  border-radius: 6px;
  font-size: 13px;
}
</style>