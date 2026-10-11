import { getSessionUser } from "~~/server/utils/auth"

export default defineEventHandler(async (event) => {
  return { user: getSessionUser(event) }
})
