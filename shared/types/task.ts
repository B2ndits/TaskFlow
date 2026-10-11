export type TaskStatus = 'todo' | 'doing' | 'done'

export interface Task {
    id: string
    title: string
    notes?: string
    status: TaskStatus
    createAt: string
}

export interface TaskInput {
    title: string
    notes?: string
    status?: TaskStatus
}