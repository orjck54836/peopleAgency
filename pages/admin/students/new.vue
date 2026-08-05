<template>
  <div class="form-page">
    <div class="form-card">
      <h2 class="form-section-title">基本資料</h2>
      <div class="form-grid">
        <div class="form-field">
          <label>學生姓名（中文）<span class="required">*</span></label>
          <input v-model="form.name_zh" type="text" placeholder="王小明" />
        </div>
        <div class="form-field">
          <label>護照英文姓名<span class="required">*</span></label>
          <input v-model="form.passport_name" type="text" placeholder="與護照完全一致" />
        </div>
        <div class="form-field">
          <label>護照號碼<span class="required">*</span></label>
          <input v-model="form.passport_no" type="text" />
        </div>
        <div class="form-field">
          <label>護照到期日<span class="required">*</span></label>
          <input v-model="form.passport_expiry" type="date" />
        </div>
        <div class="form-field">
          <label>聯絡電話<span class="required">*</span></label>
          <input v-model="form.phone" type="text" />
        </div>
        <div class="form-field">
          <label>電子郵件</label>
          <input v-model="form.email" type="email" />
        </div>
        <div class="form-field">
          <label>LINE ID</label>
          <input v-model="form.line_id" type="text" />
        </div>
        <div class="form-field">
          <label>緊急聯絡人姓名<span class="required">*</span></label>
          <input v-model="form.emergency_name" type="text" />
        </div>
        <div class="form-field">
          <label>緊急聯絡人關係</label>
          <select v-model="form.emergency_relation">
            <option value="">請選擇</option>
            <option>父子/父女</option><option>母子/母女</option>
            <option>配偶</option><option>兄弟姊妹</option><option>其他</option>
          </select>
        </div>
        <div class="form-field">
          <label>緊急聯絡人電話<span class="required">*</span></label>
          <input v-model="form.emergency_phone" type="text" />
        </div>
      </div>

      <h2 class="form-section-title">報名學校與課程</h2>
      <div class="form-grid">
        <div class="form-field">
          <label>報名日本學校<span class="required">*</span></label>
          <input v-model="form.enrolled_school" type="text" placeholder="學校英文名稱" />
        </div>
        <div class="form-field">
          <label>報名校區/分校</label>
          <input v-model="form.enrolled_campus" type="text" />
        </div>
        <div class="form-field">
          <label>報名課程類型<span class="required">*</span></label>
          <select v-model="form.enrolled_course_type">
            <option value="">請選擇</option>
            <option>長期一般留學</option><option>短期集中</option>
            <option>升學輔導</option><option>商業日語</option>
            <option>JLPT衝刺</option><option>文化體驗/暑期營</option>
          </select>
        </div>
        <div class="form-field">
          <label>報名入學學期<span class="required">*</span></label>
          <select v-model="form.enrolled_term">
            <option value="">請選擇</option>
            <option>1月期</option><option>4月期</option>
            <option>7月期</option><option>10月期</option>
          </select>
        </div>
        <div class="form-field">
          <label>入學年份<span class="required">*</span></label>
          <select v-model="form.enrolled_year">
            <option value="">請選擇</option>
            <option>2026年</option><option>2027年</option><option>2028年</option>
          </select>
        </div>
        <div class="form-field">
          <label>課程總週數/年限</label>
          <select v-model="form.enrolled_duration">
            <option value="">請選擇</option>
            <option>12週</option><option>24週</option>
            <option>1年</option><option>1.5年</option><option>2年</option>
          </select>
        </div>
        <div class="form-field">
          <label>負責顧問<span class="required">*</span></label>
          <select v-model="form.consultant">
            <option value="">請選擇</option>
            
            <option>Aiden</option><option>Angela</option>
          </select>
        </div>
        <div class="form-field">
          <label>名單來源</label>
          <select v-model="form.channel_source">
            <option value="">請選擇</option>
            <option>官網表單</option><option>FB / IG 廣告</option>
            <option>LINE 官方帳號</option><option>親友/舊生推薦</option>
            <option>留學展覽 / 講座</option><option>合作學校轉介</option>
          </select>
        </div>
      </div>

      <h2 class="form-section-title">申請進度</h2>
      <div class="form-grid">
        <div class="form-field">
          <label>COE 審查進度</label>
          <select v-model="form.coe_status">
            <option>材料準備中</option>
            <option>已送交入管局</option>
            <option>在留資格認定證明書已核發</option>
            <option>補件中</option>
            <option>拒簽</option>
          </select>
        </div>
        <div class="form-field">
          <label>日本簽證辦理進度</label>
          <select v-model="form.visa_status">
            <option>未辦理</option>
            <option>日本台灣交流協會申請中</option>
            <option>已順利取得簽證</option>
          </select>
        </div>
        <div class="form-field">
          <label>預計出境日期</label>
          <input v-model="form.departure_date" type="date" />
        </div>
      </div>

      <div class="form-actions">
        <NuxtLink to="/admin/students" class="btn-secondary">取消</NuxtLink>
        <button class="btn-primary" :disabled="submitting" @click="submit">
          {{ submitting ? '儲存中...' : '新增成交學生' }}
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
  passport_name: '',
  passport_no: '',
  passport_expiry: '',
  phone: '',
  email: '',
  line_id: '',
  emergency_name: '',
  emergency_relation: '',
  emergency_phone: '',
  enrolled_school: '',
  enrolled_campus: '',
  enrolled_course_type: '',
  enrolled_term: '',
  enrolled_year: '',
  enrolled_duration: '',
  consultant: '',
  channel_source: '',
  coe_status: '材料準備中',
  visa_status: '未辦理',
  departure_date: '',
})

async function submit() {
  if (
    !form.name_zh || !form.passport_name || !form.passport_no ||
    !form.passport_expiry || !form.phone || !form.emergency_name ||
    !form.emergency_phone || !form.enrolled_school ||
    !form.enrolled_course_type || !form.enrolled_term ||
    !form.enrolled_year || !form.consultant
  ) {
    error.value = '請填寫所有必填欄位（*）'
    return
  }

  submitting.value = true
  error.value = ''

  try {
    await $fetch('/api/admin/students', {
      method: 'POST',
      body: { ...form, status: 'Closed-Won' },
    })
    navigateTo('/admin/students')
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
.form-field label { font-size: 12px; font-weight: 600; color: #555; }
.required { color: #e53e3e; margin-left: 2px; }

.form-field input,
.form-field select {
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
.form-field select:focus { border-color: #1a1a2e; }

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