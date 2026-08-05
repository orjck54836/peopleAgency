<template>
  <div>
    <!-- 篩選列 -->
    <div class="filter-bar">
      <select v-model="filterStatus" class="filter-select">
        <option value="">全部狀態</option>
        <option value="New">新進名單</option>
        <option value="In Progress">聯繫中</option>
        <option value="Scheduled">已安排諮詢</option>
        <option value="Consulted">已面談</option>
        <option value="Shortlisting">意向選校中</option>
        <option value="Closed-Won">已成交</option>
        <option value="Closed-Lost">放棄/失效</option>
      </select>

      <select v-model="filterIntensity" class="filter-select">
        <option value="">全部意向度</option>
        <option value="Hot">高意向 (Hot)</option>
        <option value="Warm">中意向 (Warm)</option>
        <option value="Cold">低意向 (Cold)</option>
        <option value="Unqualified">無意向</option>
      </select>

      <select v-model="filterConsultant" class="filter-select">
        <option value="">全部顧問</option>
        <option value="Shinbo">Shinbo</option>
        <option value="Luna">Luna</option>
        <option value="Aiden">Aiden</option>
        <option value="Angela">Angela</option>
      </select>

      <input
        v-model="search"
        class="filter-input"
        placeholder="搜尋姓名 / LINE ID..."
      />
    </div>

    <!-- 表格 -->
    <div class="table-wrap">
      <div class="table-header-actions">
        <span class="table-count">共 {{ filtered.length }} 筆</span>
        <NuxtLink to="/admin/leads/new" class="btn-primary">+ 新增諮詢</NuxtLink>
      </div>

      <table class="admin-table">
        <thead>
          <tr>
            <th>諮詢編號</th>
            <th>姓名</th>
            <th>LINE ID</th>
            <th>意向度</th>
            <th>狀態</th>
            <th>負責顧問</th>
            <th>預計出國</th>
            <th>下次跟進</th>
            <th>建立日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filtered.length === 0">
            <td colspan="9" class="empty">尚無資料</td>
          </tr>
          <tr
            v-for="lead in filtered"
            :key="lead.student_id"
            class="clickable"
            @click="navigateTo(`/admin/leads/${lead.student_id}`)"
          >
            <td class="mono">{{ lead.student_id }}</td>
            <td>{{ lead.name_zh }}</td>
            <td class="mono">{{ lead.line_id ?? '-' }}</td>
            <td>
              <span :class="`badge badge--${intensityClass(lead.lead_intensity)}`">
                {{ lead.lead_intensity ?? '-' }}
              </span>
            </td>
            <td>
              <span :class="`badge badge--status`">{{ lead.status }}</span>
            </td>
            <td>{{ lead.consultant ?? '-' }}</td>
            <td>{{ lead.intended_start ?? '-' }}</td>
            <td :class="isOverdue(lead.next_followup_date) ? 'overdue' : ''">
              {{ lead.next_followup_date ?? '-' }}
            </td>
            <td>{{ formatDate(lead.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { data: leads } = await useFetch<any[]>('/api/admin/students')

const filterStatus = ref('')
const filterIntensity = ref('')
const filterConsultant = ref('')
const search = ref('')

const filtered = computed(() => {
  return (leads.value ?? []).filter((l: any) => {
    if (filterStatus.value && l.status !== filterStatus.value) return false
    if (filterIntensity.value && l.lead_intensity !== filterIntensity.value) return false
    if (filterConsultant.value && l.consultant !== filterConsultant.value) return false
    if (search.value) {
      const q = search.value.toLowerCase()
      if (!l.name_zh?.toLowerCase().includes(q) && !l.line_id?.toLowerCase().includes(q)) return false
    }
    return true
  })
})

const route = useRoute()

onMounted(() => {
  const intensity = route.query.intensity as string
  if (intensity) filterIntensity.value = intensity
})

function intensityClass(intensity: string) {
  const map: Record<string, string> = {
    'Hot': 'hot', 'Warm': 'warm', 'Cold': 'cold', 'Unqualified': 'grey',
  }
  return map[intensity] ?? 'grey'
}

function formatDate(iso: string) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('zh-TW')
}

function isOverdue(date: string) {
  if (!date) return false
  return new Date(date) < new Date()
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-select, .filter-input {
  padding: 7px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  font-size: 13px;
  background: #fff;
  color: #333;
  outline: none;
}

.filter-input { min-width: 200px; }
.filter-select:focus, .filter-input:focus { border-color: #1a1a2e; }

.table-wrap {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
}

.table-header-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  border-bottom: 1px solid #e5e5e5;
}

.table-count { font-size: 13px; color: #888; }

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.admin-table th {
  text-align: left;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e5e5;
  background: #fafafa;
}

.admin-table td {
  padding: 11px 16px;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
}

.admin-table tr.clickable { cursor: pointer; }
.admin-table tr.clickable:hover td { background: #f9f9f9; }
.empty { text-align: center; color: #aaa; padding: 32px !important; }
.mono { font-family: monospace; font-size: 12px; color: #888; }
.overdue { color: #e53e3e; font-weight: 600; }

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

.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 7px 16px;
  background: #1a1a2e;
  color: #fff;
  border-radius: 6px;
  font-size: 13px;
  text-decoration: none;
  transition: background 0.15s;
}

.btn-primary:hover { background: #2e2e4e; }
</style>