import type { Task } from '#shared/types/task'
import { sortTasks } from '#shared/utils/task'

const SEED: Task[] = [
  { id: 'seed-1', title: '体验 TaskFlow', notes: "第一条任务", status: "doing", createAt: "2026-01-01T08:00:00.000Z" },
  { id: 'seed-2', title: '改一下状态试试', status: "todo", createAt: "2026-01-01T09:00:00.000Z" },
  { id: 'seed-3', title: '体验 TaskFlow', notes: "欢迎来到 Nuxt 4 全栈世界", status: "done", createAt: "2026-01-01T07:00:00.000Z" },
]

const userKey = (user: string) => `tasks:${user}`

async function readTasks(user: string): Promise<Task[]> {
  const storage = useStorage('data')
  let tasks = await storage.get<Task[]>(userKey(user))
  if (!tasks) {
    tasks = structuredClone(SEED)
    await storage.set(userKey(user), tasks)
  }
  return tasks
}

async function writeTasks(user: string, tasks: Task[]) {
  await useStorage('data').set(userKey(user), tasks)
}

export async function listTasks(user: string): Promise<Task[]> {
  return sortTasks(await readTasks(user))
}

export async function saveTasks(user: string, tasks: Task[]) {
  await writeTasks(user, tasks)
}

export function createId(): string {
  return crypto.randomUUID()
}