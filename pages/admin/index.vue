<template>
  <div class="dashboard">
    <!-- 統計卡片 -->
    <div class="stat-grid">
      <NuxtLink to="/admin/leads" class="stat-card">
        <div class="stat-card__label">諮詢名單</div>
        <div class="stat-card__value">{{ stats.leads }}</div>
        <div class="stat-card__sub">點擊查看列表 →</div>
      </NuxtLink>
      <NuxtLink to="/admin/students" class="stat-card">
        <div class="stat-card__label">成交學生</div>
        <div class="stat-card__value">{{ stats.students }}</div>
        <div class="stat-card__sub">點擊查看列表 →</div>
      </NuxtLink>
      <NuxtLink to="/admin/schools" class="stat-card">
        <div class="stat-card__label">合作學校</div>
        <div class="stat-card__value">{{ stats.schools }}</div>
        <div class="stat-card__sub">點擊查看列表 →</div>
      </NuxtLink>
      <NuxtLink to="/admin/leads?intensity=Hot" class="stat-card stat-card--highlight">
        <div class="stat-card__label">高意向名單</div>
        <div class="stat-card__value">{{ stats.hotLeads }}</div>
        <div class="stat-card__sub">點擊查看列表 →</div>
      </NuxtLink>
    </div>

    <!-- 最近諮詢 -->
    <div class="dashboard-section">
      <div class="dashboard-section__header">
        <h2>最近諮詢</h2>
        <NuxtLink to="/admin/leads/new" class="btn-primary">+ 新增諮詢</NuxtLink>
      </div>
      <table class="admin-table">
        <thead>
          <tr>
            <th>諮詢編號</th>
            <th>姓名</th>
            <th>意向度</th>
            <th>狀態</th>
            <th>負責顧問</th>
            <th>建立時間</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="recentLeads.length === 0">
            <td colspan="6" class="empty">尚無資料</td>
          </tr>
          <tr v-for="lead in recentLeads" :key="lead.student_id" class="clickable"
            @click="navigateTo(`/admin/leads/${lead.student_id}`)">
            <td class="mono">{{ lead.student_id }}</td>
            <td>{{ lead.name_zh }}</td>
            <td>
              <span :class="`badge badge--${intensityClass(lead.lead_intensity)}`">
                {{ lead.lead_intensity ?? '-' }}
              </span>
            </td>
            <td>{{ lead.status }}</td>
            <td>{{ lead.consultant ?? '-' }}</td>
            <td>{{ formatDate(lead.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { data: allStudents } = await useFetch<any[]>('/api/admin/students')
const { data: allSchools } = await useFetch<any[]>('/api/admin/schools')

const stats = computed(() => {
  const students = allStudents.value ?? []
  const schools = allSchools.value ?? []
  return {
    leads: students.filter((s: any) => s.status !== 'Closed-Won').length,
    students: students.filter((s: any) => s.status === 'Closed-Won').length,
    schools: schools.length,
    hotLeads: students.filter((s: any) => s.lead_intensity === 'Hot').length,
  }
})

const recentLeads = computed(() => {
  const students = allStudents.value ?? []
  return [...students]
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10)
})

function intensityClass(intensity: string) {
  const map: Record<string, string> = {
    'Hot': 'hot',
    'Warm': 'warm',
    'Cold': 'cold',
    'Unqualified': 'grey',
  }
  return map[intensity] ?? 'grey'
}

function formatDate(iso: string) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('zh-TW')
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* 統計卡片 */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px 24px;
  border: 1px solid #e5e5e5;
}

.stat-card--highlight {
  border-color: #c9a96e;
  background: #fffbf4;
}

.stat-card__label {
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
}

.stat-card__value {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1;
}

.stat-card--highlight .stat-card__value {
  color: #c9a96e;
}

.stat-card__sub {
  font-size: 11px;
  color: #aaa;
  margin-top: 4px;
}

/* Section */
.dashboard-section {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
}

.dashboard-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e5e5;
}

.dashboard-section__header h2 {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

/* Table */
.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.admin-table th {
  text-align: left;
  padding: 10px 24px;
  font-size: 11px;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e5e5;
  background: #fafafa;
}

.admin-table td {
  padding: 12px 24px;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
}

.admin-table tr.clickable {
  cursor: pointer;
}

.admin-table tr.clickable:hover td {
  background: #f9f9f9;
}

.empty {
  text-align: center;
  color: #aaa;
  padding: 32px !important;
}

.mono {
  font-family: monospace;
  font-size: 12px;
  color: #888;
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px 24px;
  border: 1px solid #e5e5e5;
  text-decoration: none;
  display: block;
  transition: border-color 0.15s, box-shadow 0.15s;
  cursor: pointer;
}

.stat-card:hover {
  border-color: #1a1a2e;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* Badge */
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

.badge--hot {
  background: #fde8e8;
  color: #e53e3e;
}

.badge--warm {
  background: #fef3cd;
  color: #d97706;
}

.badge--cold {
  background: #e8f4fd;
  color: #3182ce;
}

.badge--grey {
  background: #f0f0f0;
  color: #888;
}

/* Button */
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

.btn-primary:hover {
  background: #2e2e4e;
}
</style>