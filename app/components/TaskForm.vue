<script setup lang="ts">
import type { TaskInput } from '#shared/types/task'

defineProps<{ disabled?: boolean }>()
const emit = defineEmits<{ submit: [input: TaskInput] }>()

const title = ref('')
const notes = ref('')

function onSubmit() {
  const t = title.value.trim()
  if (!t) return
  emit('submit', { title: t, notes: notes.value.trim() || undefined, status: 'todo' })
  title.value = ''
  notes.value = ''
}
</script>

<template>
  <form class="task-form" @submit.prevent="onSubmit">
    <input v-model="title" placeholder="要做什么？" />
    <input v-model="notes" placeholder="备注（可选）" />
    <button class="btn primary" type="submit" :disabled="disabled">添加</button>
  </form>
</template>