<template>
  <div>
    <div class="filter-bar">
      <select v-model="filterCoeStatus" class="filter-select">
        <option value="">全部 COE 狀態</option>
        <option>材料準備中</option>
        <option>已送交入管局</option>
        <option>在留資格認定證明書已核發</option>
        <option>補件中</option>
        <option>拒簽</option>
      </select>

      <select v-model="filterConsultant" class="filter-select">
        <option value="">全部顧問</option>
        
        
        <option>Aiden</option>
        <option>Angela</option>
      </select>

      <input v-model="search" class="filter-input" placeholder="搜尋姓名 / 護照號碼..." />
    </div>

    <div class="table-wrap">
      <div class="table-header-actions">
        <span class="table-count">共 {{ filtered.length }} 筆</span>
        <NuxtLink to="/admin/students/new" class="btn-primary">+ 新增成交學生</NuxtLink>
      </div>

      <table class="admin-table">
        <thead>
          <tr>
            <th>學員編號</th>
            <th>姓名</th>
            <th>報名學校</th>
            <th>入學學期</th>
            <th>COE 狀態</th>
            <th>簽證狀態</th>
            <th>負責顧問</th>
            <th>預計出境</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filtered.length === 0">
            <td colspan="8" class="empty">尚無資料</td>
          </tr>
          <tr
            v-for="student in filtered"
            :key="student.student_id"
            class="clickable"
            @click="navigateTo(`/admin/students/${student.student_id}`)"
          >
            <td class="mono">{{ student.student_id }}</td>
            <td>{{ student.name_zh }}</td>
            <td>{{ student.enrolled_school ?? '-' }}</td>
            <td>{{ student.enrolled_term ?? '-' }}</td>
            <td>
              <span :class="`badge badge--${coeClass(student.coe_status)}`">
                {{ student.coe_status ?? '-' }}
              </span>
            </td>
            <td>
              <span :class="`badge badge--${visaClass(student.visa_status)}`">
                {{ student.visa_status ?? '-' }}
              </span>
            </td>
            <td>{{ student.consultant ?? '-' }}</td>
            <td>{{ student.departure_date ?? '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { data: allStudents } = await useFetch<any[]>('/api/admin/students')

// 只顯示成交學生
const students = computed(() =>
  (allStudents.value ?? []).filter((s: any) => s.status === 'Closed-Won')
)

const filterCoeStatus = ref('')
const filterConsultant = ref('')
const search = ref('')

const filtered = computed(() => {
  return students.value.filter((s: any) => {
    if (filterCoeStatus.value && s.coe_status !== filterCoeStatus.value) return false
    if (filterConsultant.value && s.consultant !== filterConsultant.value) return false
    if (search.value) {
      const q = search.value.toLowerCase()
      if (
        !s.name_zh?.toLowerCase().includes(q) &&
        !s.passport_no?.toLowerCase().includes(q)
      ) return false
    }
    return true
  })
})

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