import { getCookie } from 'h3'

export default defineEventHandler((event) => {
  const cookie = getCookie(event, 'admin_auth')
  if (!cookie) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
  return { ok: true }
})