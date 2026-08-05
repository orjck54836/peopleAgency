<template>
  <div>
    <!-- 篩選列 -->
    <div class="filter-bar">
      <select v-model="filterStatus" class="filter-select">
        <option value="">全部合作狀態</option>
        <option>合作中</option>
        <option>簽約中</option>
        <option>暫停合作</option>
        <option>已終止</option>
      </select>

      <select v-model="filterCity" class="filter-select">
        <option value="">全部城市</option>
        <option>東京</option>
        <option>大阪</option>
        <option>京都</option>
        <option>橫濱</option>
        <option>名古屋</option>
        <option>福岡</option>
        <option>札幌</option>
        <option>神戶</option>
        <option>仙台</option>
        <option>廣島</option>
      </select>

      <input v-model="search" class="filter-input" placeholder="搜尋學校名稱..." />
    </div>

    <div class="table-wrap">
      <div class="table-header-actions">
        <span class="table-count">共 {{ filtered.length }} 筆</span>
        <NuxtLink to="/admin/schools/new" class="btn-primary">+ 新增學校</NuxtLink>
      </div>

      <table class="admin-table">
        <thead>
          <tr>
            <th>學校編號</th>
            <th>學校名稱（英文）</th>
            <th>學校名稱（日文）</th>
            <th>城市</th>
            <th>合作狀態</th>
            <th>合約狀態</th>
            <th>佣金比例</th>
            <th>內部負責人</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filtered.length === 0">
            <td colspan="8" class="empty">尚無資料</td>
          </tr>
          <tr
            v-for="school in filtered"
            :key="school.school_id"
            class="clickable"
            @click="navigateTo(`/admin/schools/${school.school_id}`)"
          >
            <td class="mono">{{ school.school_id }}</td>
            <td>{{ school.name_en }}</td>
            <td>{{ school.name_ja }}</td>
            <td>{{ school.city ?? '-' }}</td>
            <td>
              <span :class="`badge badge--${cooperationClass(school.cooperation_status)}`">
                {{ school.cooperation_status ?? '-' }}
              </span>
            </td>
            <td>
              <span :class="`badge badge--${contractClass(school.contract_status)}`">
                {{ school.contract_status ?? '-' }}
              </span>
            </td>
            <td>{{ school.commission_rate ? `${school.commission_rate}%` : '-' }}</td>
            <td>{{ school.internal_owner ?? '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { data: schools } = await useFetch<any[]>('/api/admin/schools')

const filterStatus = ref('')
const filterCity = ref('')
const search = ref('')

const filtered = computed(() => {
  return (schools.value ?? []).filter((s: any) => {
    if (filterStatus.value && s.cooperation_status !== filterStatus.value) return false
    if (filterCity.value && s.city !== filterCity.value) return false
    if (search.value) {
      const q = search.value.toLowerCase()
      if (
        !s.name_en?.toLowerCase().includes(q) &&
        !s.name_ja?.toLowerCase().includes(q)
      ) return false
    }
    return true
  })
})

function cooperationClass(status: string) {
  const map: Record<string, string> = {
    '合作中': 'green',
    '簽約中': 'warm',
    '暫停合作': 'cold',
    '已終止': 'grey',
  }
  return map[status] ?? 'grey'
}

function contractClass(status: string) {
  const map: Record<string, string> = {
    '正式生效': 'green',
    '草稿': 'grey',
    '審核中': 'warm',
    '已到期': 'hot',
    '續約洽談中': 'cold',
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