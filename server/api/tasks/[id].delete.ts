import { requireUser } from "~~/server/utils/auth"
import { listTasks, saveTasks } from "~~/server/utils/db"

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const id = getRouterParam(event, 'id')

  const tasks = await listTasks(user)
  const next = tasks.filter((t) => t.id !== id)
  if (next.length === tasks.length) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found', message: '任务不存在' })
  }
  await saveTasks(user, next)
  return { ok: true }
})