import { setCookie } from 'h3'

const attempts = new Map<string, { count: number; lockedUntil: number }>()

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const now = Date.now()
  const record = attempts.get(ip)

  if (record && record.lockedUntil > now) {
    throw createError({ statusCode: 429, message: '登入嘗試過多，請稍後再試' })
  }

  const { password } = await readBody(event)
  const config = useRuntimeConfig()

  if (password !== config.adminPassword) {
    const current = attempts.get(ip) ?? { count: 0, lockedUntil: 0 }
    current.count += 1
    if (current.count >= 5) {
      current.lockedUntil = now + 15 * 60 * 1000
    }
    attempts.set(ip, current)
    throw createError({ statusCode: 401, message: '密碼錯誤' })
  }

  attempts.delete(ip)

  setCookie(event, 'admin_auth', 'true', {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: '/',
    sameSite: 'strict',
  })

  return { ok: true }
})