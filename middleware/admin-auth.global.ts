import { getCookie } from 'h3'

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin') || to.path === '/admin/login') return

  if (process.client) {
    // client 端打 API 確認 cookie 是否有效
    try {
      await $fetch('/api/admin/auth/check')
    } catch {
      return navigateTo('/admin/login')
    }
    return
  }

  // server 端直接讀 cookie
  const event = useRequestEvent()
  const cookie = getCookie(event!, 'admin_auth')
  if (!cookie) return navigateTo('/admin/login')
})