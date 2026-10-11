import { requireUser } from "~~/server/utils/auth"
import { listTasks } from "~~/server/utils/db"

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const { status, q } = getQuery(event)

  let tasks = await listTasks(user)
  if (typeof status === 'string' && status !== 'all') {
    tasks = tasks.filter((t) => t.status === status)
  }
  if (typeof q === 'string' && q.trim()) {
    const kw = q.trim().toLowerCase()
    tasks = tasks.filter((t) => t.title.toLowerCase().includes(kw) || t.notes?.toLowerCase().includes(kw))
  }
  return tasks
})
