import type { H3Event } from "#imports";
import { SESSION_COOKIE } from '#shared/utils/constants'

export function getSessionUser(event: H3Event): string | null {
  return getCookie(event, SESSION_COOKIE) ?? null
}

export function requireUser(event: H3Event): string {
  const user = getSessionUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized", message: "请先登录" })
  }
  return user
}