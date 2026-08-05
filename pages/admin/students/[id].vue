<template>
  <div class="form-page">
    <div v-if="pending" class="loading">載入中...</div>
    <div v-else-if="!student" class="loading">找不到此筆資料</div>
    <template v-else>
      <div class="status-bar">
        <div class="status-bar__left">
          <span class="mono">{{ student.student_id }}</span>
          <span :class="`badge badge--${coeClass(form.coe_status)}`">
            {{ form.coe_status ?? 'COE 未設定' }}
          </span>
          <span :class="`badge badge--${visaClass(form.visa_status)}`">
            {{ form.visa_status ?? '簽證未設定' }}
          </span>
        </div>
        <div class="status-bar__right">
          <button class="btn-secondary" @click="navigateTo('/admin/students')">返回列表</button>
          <button class="btn-primary" :disabled="submitting" @click="save">
            {{ submitting ? '儲存中...' : '儲存變更' }}
          </button>
        </div>
      </div>

      <div class="form-card">
        <h2 class="form-section-title">模組一：正式基本檔案</h2>
        <div class="form-grid">
          <div class="form-field">
            <label>學生姓名（中文）</label>
            <input v-model="form.name_zh" type="text" disabled class="disabled" />
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

        <h2 class="form-section-title">模組二：報名學校與課程</h2>
        <div class="form-grid">
          <div class="form-field">
            <label>報名日本學校<span class="required">*</span></label>
            <input v-model="form.enrolled_school" type="text" placeholder="學校英文名稱" />
          </div>
          <div class="form-field">
            <label>報名校區/分校</label>
            <input v-model="form.enrolled_campus" type="text" placeholder="例：東京本校" />
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
            <label>分配學校窗口</label>
            <input v-model="form.school_contact" type="text" />
          </div>
          <div class="form-field">
            <label>負責顧問</label>
            <select v-model="form.consultant">
              <option value="">請選擇</option>
              
              <option>Aiden</option><option>Angela</option>
            </select>
          </div>
        </div>

        <h2 class="form-section-title">模組三：申請與簽證進度</h2>
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
            <label>COE 核發日期</label>
            <input v-model="form.coe_issued_date" type="date" />
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
          <div class="form-field">
            <label>住宿安排進度</label>
            <select v-model="form.accommodation_status">
              <option>尋找中</option><option>已申請宿舍</option>
              <option>已簽約民間公寓</option><option>自行處理</option>
            </select>
          </div>
          <div class="form-field">
            <label>接機服務需求</label>
            <select v-model="form.airport_pickup">
              <option>不需要</option><option>需要接機</option>
            </select>
          </div>
        </div>

        <h2 class="form-section-title">模組四：學費財務對帳</h2>

        <div class="finance-section">
          <h3 class="finance-title">學校學費</h3>
          <div class="form-grid">
            <div class="form-field">
              <label>學校學費應繳總額 (JPY)</label>
              <input v-model="form.tuition_amount" type="number" placeholder="日圓金額" />
            </div>
            <div class="form-field">
              <label>學校學費繳納狀態</label>
              <select v-model="form.tuition_status">
                <option>等待學校 Invoice</option>
                <option>學生已匯款至學校</option>
                <option>學校已確認收到學費</option>
              </select>
            </div>
            <div class="form-field">
              <label>預計佣金金額 (JPY)</label>
              <input v-model="form.commission_amount" type="number" />
            </div>
            <div class="form-field">
              <label>校方佣金請款狀態</label>
              <select v-model="form.commission_status">
                <option>未到請款期</option>
                <option>已發送 Invoice 給校方</option>
                <option>學校已撥款</option>
                <option>問題對帳中</option>
              </select>
            </div>
            <div class="form-field">
              <label>佣金實際入帳日期</label>
              <input v-model="form.commission_received_date" type="date" />
            </div>
          </div>
        </div>

        <div class="finance-section">
          <h3 class="finance-title">住宿費</h3>
          <div class="form-grid">
            <div class="form-field">
              <label>住宿費應繳總額 (JPY)</label>
              <input v-model="form.housing_amount" type="number" placeholder="日圓金額" />
            </div>
            <div class="form-field">
              <label>住宿費繳納狀態</label>
              <select v-model="form.housing_status">
                <option>等待 Invoice</option>
                <option>學生已匯款</option>
                <option>已確認收到</option>
              </select>
            </div>
            <div class="form-field">
              <label>住宿預計返佣金額 (JPY)</label>
              <input v-model="form.housing_commission_amount" type="number" />
            </div>
            <div class="form-field">
              <label>住宿返佣請款狀態</label>
              <select v-model="form.housing_commission_status">
                <option>未到請款期</option>
                <option>已發送 Invoice 給住宿業者</option>
                <option>學校已撥款</option>
                <option>問題對帳中</option>
              </select>
            </div>
            <div class="form-field">
              <label>住宿返佣實際入帳日期</label>
              <input v-model="form.housing_commission_received_date" type="date" />
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button class="btn-secondary" @click="navigateTo('/admin/students')">返回列表</button>
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

const { data: student, pending } = await useFetch<any>(`/api/admin/students/${id}`)

const form = reactive<Record<string, any>>({})
const submitting = ref(false)
const saveError = ref('')
const saveSuccess = ref(false)

watch(student, (val) => {
  if (val) Object.assign(form, val)
}, { immediate: true })

async function save() {
  submitting.value = true
  saveError.value = ''
  saveSuccess.value = false

  try {
    await $fetch(`/api/admin/students/${id}`, {
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

function coeClass(status: string) {
  const map: Record<string, string> = {
    '材料準備中': 'grey',
    '已送交入管局': 'cold',
    '在留資格認定證明書已核發': 'green',
    '補件中': 'warm',
    '拒簽': 'hot',
  }
  return map[status] ?? 'grey'
}

function visaClass(status: string) {
  const map: Record<string, string> = {
    '未辦理': 'grey',
    '日本台灣交流協會申請中': 'cold',
    '已順利取得簽證': 'green',
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
.form-field select:focus { border-color: #1a1a2e; }
.disabled { background: #f5f5f5; color: #999; cursor: not-allowed; }

.finance-section {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 16px;
}

.finance-title {
  font-size: 13px;
  font-weight: 600;
  color: #555;
  margin: 0 0 14px;
}

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