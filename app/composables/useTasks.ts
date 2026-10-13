import type { TaskInput, TaskStatus } from '#shared/types/task'

export function useTasks() {
  // 筛选条件是"状态"，不是"请求"——把它做成响应式 query，
  // 变化时 useFetch 自动重新请求（进阶篇第 9 章的响应式 key/query）
  const filter = ref<TaskStatus | 'all'>('all')
  const keyword = ref('')

  const { data: tasks, status, error, refresh } = useFetch('/api/tasks', {
    key: 'tasks:list',
    query: computed(() => ({
      status: filter.value === 'all' ? undefined : filter.value,
      q: keyword.value.trim() || undefined,
    })),
  })

  // —— 写操作：交互触发 → 用 $fetch（API 层），完成后刷新列表缓存 ——
  async function createTask(input: TaskInput) {
    await taskApi.create(input)
    await refresh({ dedupe: 'cancel' })
  }

  async function updateTask(id: string, patch: Partial<TaskInput>) {
    const updated = await taskApi.update(id, patch)
    await refresh({ dedupe: 'cancel' })
    return updated
  }

  async function removeTask(id: string) {
    await taskApi.remove(id)
    await refresh({ dedupe: 'cancel' })
  }

  return { filter, keyword, tasks, status, error, refresh, createTask, updateTask, removeTask }
}