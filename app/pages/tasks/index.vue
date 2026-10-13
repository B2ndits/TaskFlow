<script setup lang="ts">
useSeoMeta({ title: '我的任务' })

// 数据逻辑全部在 composable，页面只做编排
const { filter, keyword, tasks, status, error, createTask, updateTask, removeTask } = useTasks()
</script>

<template>
  <section class="page">
    <h1>我的任务</h1>

    <!-- 新建 -->
    <TaskForm :disabled="status === 'pending'" @submit="createTask" />

    <!-- 筛选：改的是响应式 query → useFetch 自动重新请求 -->
    <div class="filters">
      <button
        v-for="f in ['all', 'todo', 'doing', 'done']"
        :key="f"
        class="chip"
        :class="{ active: filter === f }"
        @click="filter = f as any"
      >
        {{ f === 'all' ? '全部' : statusLabel(f) }}
      </button>
      <input v-model="keyword" class="search" placeholder="🔍 搜索标题/备注…" />
    </div>

    <!-- 三态：加载 / 错误 / 空态 / 数据 -->
    <p v-if="status === 'pending'" class="muted">加载中…</p>
    <div v-else-if="error" class="error">加载失败：{{ error.message }}</div>
    <p v-else-if="!tasks?.length" class="muted">没有任务，创建第一条吧 ✏️</p>

    <TransitionGroup v-else name="list" tag="ul" class="task-list">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="updateTask(task.id, { status: task.status === 'todo' ? 'doing' : task.status === 'doing' ? 'done' : 'todo' })"
        @remove="removeTask(task.id)"
      />
    </TransitionGroup>
  </section>
</template>