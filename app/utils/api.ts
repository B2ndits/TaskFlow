import type { Task, TaskInput } from '#shared/types/task'
export const taskApi = {
  list: (query: { status?: string, q?: string }) => $fetch<Task[]>('/api/tasks', { query }),
  detail: (id: string) => $fetch<Task>(`/api/tasks/${id}`),
  create: (body: TaskInput) => $fetch<Task>(`/api/tasks`, { method: 'POST', body }),
  update: (id: string, patch: Partial<TaskInput>) => $fetch<Task>(`api/tasks/${id}`, { method: 'PATCH', body: patch }),
  remove: (id: string) => $fetch(`/api/tasks/${id}`, { method: 'DELETE' })
}

export const authApi = {
  me: () => $fetch<{ user: string | null }>('/api/auth/me'),
  login: (name: string) => $fetch('/api/auth/login', { method: 'POST', body: { name } }),
  logout: () => $fetch('/api/auth/logout', { method: 'POST' })
}