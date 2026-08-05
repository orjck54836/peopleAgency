<template>
  <div class="form-page">
    <div v-if="pending" class="loading">載入中...</div>
    <div v-else-if="!lead" class="loading">找不到此筆資料</div>
    <template v-else>
      <!-- 頂部狀態列 -->
      <div class="status-bar">
        <div class="status-bar__left">
          <span class="mono">{{ lead.student_id }}</span>
          <span :class="`badge badge--${intensityClass(form.lead_intensity)}`">
            {{ form.lead_intensity }}
          </span>
          <span class="badge badge--status">{{ form.status }}</span>
        </div>
        <div class="status-bar__right">
          <button class="btn-secondary" @click="navigateTo('/admin/leads')">返回列表</button>
          <button class="btn-primary" :disabled="submitting" @click="save">
            {{ submitting ? '儲存中...' : '儲存變更' }}
          </button>
        </div>
      </div>

      <div class="form-card">
        <h2 class="form-section-title">基本資料</h2>
        <div class="form-grid">
          <div class="form-field">
            <label>學生姓名（中文）<span class="required">*</span></label>
            <input v-model="form.name_zh" type="text" />
          </div>
          <div class="form-field">
            <label>學生姓名（英文）</label>
            <input v-model="form.name_en" type="text" />
          </div>
          <div class="form-field">
            <label>性別</label>
            <select v-model="form.gender">
              <option value="">請選擇</option>
              <option>男</option><option>女</option><option>其他</option>
            </select>
          </div>
          <div class="form-field">
            <label>出生日期</label>
            <input v-model="form.birth_date" type="date" />
          </div>
          <div class="form-field">
            <label>聯絡電話</label>
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
            <label>目前身分</label>
            <select v-model="form.occupation">
              <option value="">請選擇</option>
              <option>高中生</option><option>大學生</option>
              <option>在職人士</option><option>待業中</option><option>其他</option>
            </select>
          </div>
          <div class="form-field">
            <label>日語程度</label>
            <select v-model="form.japanese_level">
              <option>零基礎</option><option>N5</option><option>N4</option>
              <option>N3</option><option>N2</option><option>N1</option>
            </select>
          </div>
        </div>

        <h2 class="form-section-title">留學意向</h2>
        <div class="form-grid">
          <div class="form-field">
            <label>預計出國時間</label>
            <select v-model="form.intended_start">
              <option value="">請選擇</option>
              <option>2026年10月期</option><option>2027年1月期</option>
              <option>2027年4月期</option><option>2027年7月期</option>
            </select>
          </div>
          <div class="form-field">
            <label>預計留學時長</label>
            <select v-model="form.intended_duration">
              <option value="">請選擇</option>
              <option>短期 (1~3個月)</option><option>半年</option>
              <option>1年</option><option>1.5年</option><option>2年</option>
            </select>
          </div>
          <div class="form-field">
            <label>預估預算範圍</label>
            <select v-model="form.budget">
              <option value="">請選擇</option>
              <option>30萬台幣以下</option><option>30~50萬台幣</option>
              <option>50~100萬台幣</option><option>100萬台幣以上</option>
            </select>
          </div>
          <div class="form-field">
            <label>住宿偏好</label>
            <select v-model="form.accommodation_pref">
              <option value="">請選擇</option>
              <option>學校宿舍</option><option>外租公寓</option>
              <option>寄宿家庭</option><option>自行解決</option>
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

        <h2 class="form-section-title">跟進狀態</h2>
        <div class="form-grid">
          <div class="form-field">
            <label>名單轉化狀態</label>
            <select v-model="form.status">
              <option>New</option>
              <option>In Progress</option>
              <option>Scheduled</option>
              <option>Consulted</option>
              <option>Shortlisting</option>
              <option>Closed-Won</option>
              <option>Closed-Lost</option>
            </select>
          </div>
          <div class="form-field">
            <label>名單意向度</label>
            <select v-model="form.lead_intensity">
              <option>Hot</option><option>Warm</option>
              <option>Cold</option><option>Unqualified</option>
            </select>
          </div>
          <div class="form-field">
            <label>負責顧問</label>
            <select v-model="form.consultant">
              <option value="">請選擇</option>
              
              <option>Aiden</option><option>Angela</option>
            </select>
          </div>
          <div class="form-field">
            <label>下次跟進日期</label>
            <input v-model="form.next_followup_date" type="date" />
          </div>
          <div v-if="form.status === 'Closed-Lost'" class="form-field">
            <label>未成交原因</label>
            <select v-model="form.lost_reason">
              <option value="">請選擇</option>
              <option>預算不足</option><option>改去其他國家</option>
              <option>選擇其他代辦</option><option>家長反對</option>
              <option>延後規劃</option><option>失聯 / 無回應</option>
            </select>
          </div>
          <div class="form-field form-field--full">
            <label>諮詢紀錄與備註</label>
            <textarea v-model="form.notes" rows="5" placeholder="歷次諮詢重點、特殊需求..." />
          </div>
        </div>

        <!-- 成交後欄位 -->
        <template v-if="form.status === 'Closed-Won'">
          <h2 class="form-section-title form-section-title--won">✓ 成交學生資料</h2>
          <div class="form-grid">
            <div class="form-field">
              <label>護照英文姓名</label>
              <input v-model="form.passport_name" type="text" placeholder="與護照完全一致" />
            </div>
            <div class="form-field">
              <label>護照號碼</label>
              <input v-model="form.passport_no" type="text" />
            </div>
            <div class="form-field">
              <label>護照到期日</label>
              <input v-model="form.passport_expiry" type="date" />
            </div>
            <div class="form-field">
              <label>緊急聯絡人姓名</label>
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
              <label>緊急聯絡人電話</label>
              <input v-model="form.emergency_phone" type="text" />
            </div>
          </div>
        </template>

        <div class="form-actions">
          <button class="btn-secondary" @click="navigateTo('/admin/leads')">返回列表</button>
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

const { data: lead, pending } = await useFetch<any>(`/api/admin/students/${id}`)

const form = reactive<Record<string, any>>({})
const submitting = ref(false)
const saveError = ref('')
const saveSuccess = ref(false)

watch(lead, (val) => {
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

function intensityClass(intensity: string) {
  const map: Record<string, string> = {
    'Hot': 'hot', 'Warm': 'warm', 'Cold': 'cold', 'Unqualified': 'grey',
  }
  return map[intensity] ?? 'grey'
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
.form-section-title--won { color: #2d8a4e; border-color: #c6f0d4; }

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

.badge--hot { background: #fde8e8; color: #e53e3e; }
.badge--warm { background: #fef3cd; color: #d97706; }
.badge--cold { background: #e8f4fd; color: #3182ce; }
.badge--grey { background: #f0f0f0; color: #888; }
.badge--status { background: #f0f0f0; color: #555; }

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