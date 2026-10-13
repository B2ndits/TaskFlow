import type { TaskInput } from '#shared/types/task'

export async function useTask(id: string) {
  // await：详情页要"拿到数据再渲染"（Suspense 阻塞），
  // 这样接口 404 时才能确定地抛出全屏错误页
  const { data: task, status, error, refresh } = await useFetch(`/api/tasks/${id}`, {
    key: `tasks:${id}`,
  })

  async function save(patch: Partial<TaskInput>) {
    const updated = await taskApi.update(id, patch)
    task.value = updated            // Nuxt 4：data 是 shallowRef，必须整体替换！
    await refreshNuxtData('tasks:list')   // 让列表页的缓存同步最新数据
    return updated
  }

  async function remove() {
    await taskApi.remove(id)
    await refreshNuxtData('tasks:list')
  }

  return { task, status, error, refresh, save, remove }
}