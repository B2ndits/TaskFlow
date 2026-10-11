import { requireUser } from "~~/server/utils/auth"
import { createId, listTasks, saveTasks } from "~~/server/utils/db"
import { Task, TaskInput } from "~~/shared/types/task"

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody<TaskInput>(event)

  const title = body?.title?.trim()
  if (!title) {
    throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "标题不能为空" })
  }
  const tasks = await listTasks(user)
  const task: Task = {
    id: createId(),
    title,
    notes: body.notes?.trim() || undefined,
    status: body.status ?? 'todo',
    createAt: new Date().toISOString()
  }
  tasks.push(task)
  await saveTasks(user, tasks)
  return task
})
