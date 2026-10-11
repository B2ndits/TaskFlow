import { SESSION_COOKIE } from "~~/shared/utils/constants"

export default defineEventHandler(async (event) => {
  deleteCookie(event, SESSION_COOKIE, { path: "/" })
  return { ok: true }
})
