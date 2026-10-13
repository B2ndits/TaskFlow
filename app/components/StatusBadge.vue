<script setup lang="ts">
import type { TaskStatus } from '#shared/types/task'
defineProps<{ status: TaskStatus }>()
// statusLabel 来自 shared/utils —— 前端自动导入，与 server 共用同一份
</script>

<template>
  <span class="badge" :class="status">{{ statusLabel(status) }}</span>
</template>