import type { Task, TaskStatus } from "../types/task"

export const TASK_STATUSES: TaskStatus[] = ['todo', 'doing', 'done']

const LABELS: Record<TaskStatus, string> = {
  todo: "待办",
  doing: "进心中",
  done: "已完成"
}

/** 状态 → 中文标签：组件徽章用、server 校验也用 */
export function statusLabel(status: TaskStatus): string {
  return LABELS[status] ?? status
}

/** 统一排序：进行中 > 待办 > 已完成，同状态按创建时间倒序 —— server 输出前排一次 */
export function sortTasks(tasks: Task[]): Task[] {
  const order: Record<TaskStatus, number> = {
    doing: 0,
    todo: 1,
    done: 2
  }
  return [...tasks].sort((a, b) => order[a.status] - order[b.status] || b.createAt.localeCompare(a.createAt))
}