import { requireUser } from "~~/server/utils/auth"
import { listTasks } from "~~/server/utils/db"

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const id = getRouterParam(event, 'id')

  const task = ((await listTasks(user)).find((t) => t.id === id))
  if (!task) {
    throw createError({ statusCode: 404, statusMessage: "Not Found", message: "任务不存在" })
  }
  return task
})
