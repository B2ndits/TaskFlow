<script setup lang="ts">
import type { Task } from '#shared/types/task'
defineProps<{ task: Task }>()
const emit = defineEmits<{ toggle: []; remove: [] }>()
</script>

<template>
  <li class="task-card">
    <button class="check" :title="'切换状态'" @click="emit('toggle')">
      {{ task.status === 'done' ? '✅' : '⬜' }}
    </button>
    <div class="body">
      <p class="title" :class="{ done: task.status === 'done' }">{{ task.title }}</p>
      <p v-if="task.notes" class="muted">{{ task.notes }}</p>
    </div>
    <StatusBadge :status="task.status" />
    <NuxtLink class="open" :to="`/tasks/${task.id}`">详情</NuxtLink>
    <button class="danger-link" @click="emit('remove')">删除</button>
  </li>
</template>