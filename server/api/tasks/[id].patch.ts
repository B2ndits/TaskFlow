import type { TaskInput } from '#shared/types/task'
import { requireUser } from '~~/server/utils/auth'
import { listTasks, saveTasks } from '~~/server/utils/db'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const id = getRouterParam(event, 'id')
  const patch = await readBody<Partial<TaskInput>>(event)

  const tasks = await listTasks(user)
  const task = tasks.find((t) => t.id === id)
  if (!task) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found', message: '任务不存在' })
  }

  if (patch.title !== undefined) {
    const title = patch.title.trim()
    if (!title) {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: '标题不能为空' })
    }
    task.title = title
  }
  if (patch.notes !== undefined) task.notes = patch.notes.trim() || undefined
  if (patch.status !== undefined) task.status = patch.status

  await saveTasks(user, tasks)
  return task
})