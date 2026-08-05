<template>
  <div class="form-page">
    <div class="form-card">
      <h2 class="form-section-title">階段一：基本資料</h2>
      <div class="form-grid">
        <div class="form-field">
          <label>學生姓名（中文）<span class="required">*</span></label>
          <input v-model="form.name_zh" type="text" placeholder="王小明" />
        </div>
        <div class="form-field">
          <label>學生姓名（英文）</label>
          <input v-model="form.name_en" type="text" placeholder="WANG, XIAO-MING" />
        </div>
        <div class="form-field">
          <label>性別<span class="required">*</span></label>
          <select v-model="form.gender">
            <option value="">請選擇</option>
            <option>男</option>
            <option>女</option>
            <option>其他</option>
          </select>
        </div>
        <div class="form-field">
          <label>出生日期</label>
          <input v-model="form.birth_date" type="date" />
        </div>
        <div class="form-field">
          <label>聯絡電話<span class="required">*</span></label>
          <input v-model="form.phone" type="text" placeholder="0912-345-678" />
        </div>
        <div class="form-field">
          <label>電子郵件</label>
          <input v-model="form.email" type="email" placeholder="example@gmail.com" />
        </div>
        <div class="form-field">
          <label>LINE ID<span class="required">*</span></label>
          <input v-model="form.line_id" type="text" placeholder="@example" />
        </div>
        <div class="form-field">
          <label>目前身分</label>
          <select v-model="form.occupation">
            <option value="">請選擇</option>
            <option>高中生</option>
            <option>大學生</option>
            <option>在職人士</option>
            <option>待業中</option>
            <option>其他</option>
          </select>
        </div>
        <div class="form-field">
          <label>日語程度</label>
          <select v-model="form.japanese_level">
            <option>零基礎</option>
            <option>N5</option>
            <option>N4</option>
            <option>N3</option>
            <option>N2</option>
            <option>N1</option>
          </select>
        </div>
      </div>

      <h2 class="form-section-title">階段二：留學意向</h2>
      <div class="form-grid">
        <div class="form-field">
          <label>預計出國時間<span class="required">*</span></label>
          <select v-model="form.intended_start">
            <option value="">請選擇</option>
            <option>2026年10月期</option>
            <option>2027年1月期</option>
            <option>2027年4月期</option>
            <option>2027年7月期</option>
          </select>
        </div>
        <div class="form-field">
          <label>預計留學時長</label>
          <select v-model="form.intended_duration">
            <option value="">請選擇</option>
            <option>短期 (1~3個月)</option>
            <option>半年</option>
            <option>1年</option>
            <option>1.5年</option>
            <option>2年</option>
          </select>
        </div>
        <div class="form-field">
          <label>預估預算範圍</label>
          <select v-model="form.budget">
            <option value="">請選擇</option>
            <option>30萬台幣以下</option>
            <option>30~50萬台幣</option>
            <option>50~100萬台幣</option>
            <option>100萬台幣以上</option>
          </select>
        </div>
        <div class="form-field">
          <label>住宿偏好</label>
          <select v-model="form.accommodation_pref">
            <option value="">請選擇</option>
            <option>學校宿舍</option>
            <option>外租公寓</option>
            <option>寄宿家庭</option>
            <option>自行解決</option>
          </select>
        </div>
        <div class="form-field">
          <label>名單來源<span class="required">*</span></label>
          <select v-model="form.channel_source">
            <option value="">請選擇</option>
            <option>官網表單</option>
            <option>FB / IG 廣告</option>
            <option>LINE 官方帳號</option>
            <option>親友/舊生推薦</option>
            <option>留學展覽 / 講座</option>
            <option>合作學校轉介</option>
          </select>
        </div>
      </div>

      <h2 class="form-section-title">階段三：跟進設定</h2>
      <div class="form-grid">
        <div class="form-field">
          <label>負責顧問<span class="required">*</span></label>
          <select v-model="form.consultant">
            <option value="">請選擇</option>
            
            
            <option>Aiden</option>
            <option>Angela</option>
          </select>
        </div>
        <div class="form-field">
          <label>名單意向度</label>
          <select v-model="form.lead_intensity">
            <option>Warm</option>
            <option>Hot</option>
            <option>Cold</option>
            <option>Unqualified</option>
          </select>
        </div>
        <div class="form-field">
          <label>下次跟進日期</label>
          <input v-model="form.next_followup_date" type="date" />
        </div>
        <div class="form-field form-field--full">
          <label>諮詢紀錄與備註</label>
          <textarea v-model="form.notes" rows="4" placeholder="初次諮詢重點、特殊需求..." />
        </div>
      </div>

      <div class="form-actions">
        <NuxtLink to="/admin/leads" class="btn-secondary">取消</NuxtLink>
        <button class="btn-primary" :disabled="submitting" @click="submit">
          {{ submitting ? '儲存中...' : '儲存諮詢' }}
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

const form = reactive({
  name_zh: '',
  name_en: '',
  gender: '',
  birth_date: '',
  phone: '',
  email: '',
  line_id: '',
  occupation: '',
  japanese_level: '零基礎',
  intended_start: '',
  intended_duration: '',
  budget: '',
  accommodation_pref: '',
  channel_source: '',
  consultant: '',
  lead_intensity: 'Warm',
  next_followup_date: '',
  notes: '',
})

async function submit() {
  if (!form.name_zh || !form.phone || !form.line_id || !form.consultant || !form.channel_source || !form.intended_start) {
    error.value = '請填寫所有必填欄位（*）'
    return
  }

  submitting.value = true
  error.value = ''

  try {
    await $fetch('/api/admin/students', {
      method: 'POST',
      body: { ...form, status: 'New' },
    })
    navigateTo('/admin/leads')
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

.form-field label {
  font-size: 12px;
  font-weight: 600;
  color: #555;
}

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
.form-field textarea:focus {
  border-color: #1a1a2e;
}

.form-field textarea { resize: vertical; }

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