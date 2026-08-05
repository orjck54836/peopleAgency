<template>
  <div class="admin-shell">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <div class="admin-sidebar__brand">
        <span class="admin-sidebar__logo">皓學</span>
        <span class="admin-sidebar__label">後台管理</span>
      </div>

      <nav class="admin-sidebar__nav">
        <NuxtLink to="/admin" class="admin-sidebar__item" exact-active-class="is-active">
          <PhHouse weight="regular" />
          總覽
        </NuxtLink>

        <div class="admin-sidebar__section">學校管理</div>
        <NuxtLink to="/admin/schools" class="admin-sidebar__item" active-class="is-active">
          <PhBuildings weight="regular" />
          學校列表
        </NuxtLink>

        <div class="admin-sidebar__section">學生管理</div>
        <NuxtLink to="/admin/leads" class="admin-sidebar__item" active-class="is-active">
          <PhUserCirclePlus weight="regular" />
          諮詢名單
        </NuxtLink>
        <NuxtLink to="/admin/students" class="admin-sidebar__item" active-class="is-active">
          <PhGraduationCap weight="regular" />
          成交名單
        </NuxtLink>
      </nav>
      <button class="admin-sidebar__logout" @click="logout">登出</button>
    </aside>

    <!-- Main -->
    <div class="admin-main">
      <header class="admin-header">
        <h1 class="admin-header__title">{{ title }}</h1>
        <slot name="header-actions" />
      </header>
      <main class="admin-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const titleMap: Record<string, string> = {
  '/admin': '總覽',
  '/admin/schools': '學校列表',
  '/admin/schools/new': '新增學校',
  '/admin/leads': '諮詢名單',
  '/admin/leads/new': '新增諮詢',
  '/admin/students': '成交名單',
  '/admin/students/new': '新增成交學生',
}

const title = computed(() => {
  // 詳情頁
  if (route.path.match(/\/admin\/schools\/.+/)) return '學校詳情'
  if (route.path.match(/\/admin\/leads\/.+/)) return '諮詢詳情'
  if (route.path.match(/\/admin\/students\/.+/)) return '學生詳情'
  return titleMap[route.path] ?? '後台管理'
})

async function logout() {
  await $fetch('/api/admin/auth/logout', { method: 'POST' })
  navigateTo('/admin/login')
}
</script>

<style scoped>
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
  font-family: 'Noto Sans TC', sans-serif;
}

/* Sidebar */
.admin-sidebar {
  width: 220px;
  min-height: 100vh;
  background: #1a1a2e;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
}

.admin-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 20px 16px;
  border-bottom: 1px solid #2e2e4e;
}

.admin-sidebar__logo {
  font-size: 18px;
  font-weight: 700;
  color: #c9a96e;
}

.admin-sidebar__label {
  font-size: 11px;
  color: #888;
  letter-spacing: 0.05em;
}

.admin-sidebar__nav {
  padding: 12px 0;
  flex: 1;
}

.admin-sidebar__section {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #555;
  padding: 16px 20px 6px;
}

.admin-sidebar__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 20px;
  font-size: 13px;
  color: #aaa;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.admin-sidebar__item:hover {
  background: #2e2e4e;
  color: #fff;
}

.admin-sidebar__item.is-active {
  background: #2e2e4e;
  color: #c9a96e;
  border-left: 3px solid #c9a96e;
}

/* Main */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
}

.admin-header__title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

.admin-content {
  padding: 28px 32px;
  flex: 1;
  overflow-y: auto;
  background: #f5f5f5;
}

.admin-content > * {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

.admin-page {
  max-width: 1280px;
  width: 100%;
}

.admin-sidebar__logout {
  margin: auto 20px 20px;
  padding: 8px 16px;
  background: transparent;
  color: #555;
  border: 1px solid #2e2e4e;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.admin-sidebar__logout:hover {
  background: #2e2e4e;
  color: #fff;
}
</style>