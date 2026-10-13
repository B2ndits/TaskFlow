<script setup lang="ts">
import type { TaskStatus } from '#shared/types/task'

definePageMeta({
  validate: (route) => typeof route.params.id === 'string',
})

const route = useRoute()
const router = useRouter()

// await：等数据就绪再渲染；404 时能确定地抛全屏错误页
const { task, save, remove } = await useTask(route.params.id as string)

// 数据没拿到（接口 404）→ 抛全屏错误页（错误处理协议见高级篇第 17 章）
if (!task.value) {
  throw createError({ statusCode: 404, statusMessage: 'Task Not Found', message: '任务不存在' })
}

// 编辑表单本地状态
const title = ref('')
const notes = ref('')
watchEffect(() => {
  if (task.value) {
    title.value = task.value.title
    notes.value = task.value.notes ?? ''
  }
})

const saving = ref(false)
async function onSave() {
  saving.value = true
  try {
    await save({ title: title.value, notes: notes.value })
  } finally {
    saving.value = false
  }
}

async function onSetStatus(s: TaskStatus) {
  await save({ status: s })
}

async function onRemove() {
  await remove()
  router.push('/tasks')
}

useSeoMeta({ title: () => task.value?.title ?? '任务详情' })
</script>

<template>
  <section class="page narrow" v-if="task">
    <NuxtLink to="/tasks" class="muted">← 返回列表</NuxtLink>
    <h1>{{ task.title }}</h1>

    <div class="status-row">
      <button
        v-for="s in ['todo', 'doing', 'done']"
        :key="s"
        class="chip"
        :class="{ active: task.status === s }"
        @click="onSetStatus(s as TaskStatus)"
      >
        {{ statusLabel(s) }}
      </button>
    </div>

    <form @submit.prevent="onSave">
      <label>标题<input v-model="title" /></label>
      <label>备注<textarea v-model="notes" rows="4" /></label>
      <div class="row">
        <button class="btn primary" type="submit" :disabled="saving">
          {{ saving ? '保存中…' : '保存' }}
        </button>
        <button class="btn danger" type="button" @click="onRemove">删除任务</button>
      </div>
    </form>
  </section>
</template>