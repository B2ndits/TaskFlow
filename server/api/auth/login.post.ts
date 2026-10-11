import { SESSION_COOKIE } from "~~/shared/utils/constants"

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name?: string }>(event)
  const name = body?.name?.trim()
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "用户名不能为空" })
  }
  setCookie(event, SESSION_COOKIE, name, {
    path: "/",
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
  })
  return { name }
})
