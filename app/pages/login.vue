<script setup lang="ts">
useSeoMeta({ title: '登录' })
// robots 排除（示例）：
useHead({ meta: [{ name: 'robots', content: 'noindex' }] })

const route = useRoute()
const { login } = useAuth()

const name = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function onSubmit() {
  if (!name.value.trim() || loading.value) return
  loading.value = true
  errorMsg.value = ''
  try {
    // 登录成功后跳回来源页（?redirect=），没有则去任务列表
    await login(name.value.trim(), (route.query.redirect as string) || '/tasks')
  } catch (e) {
    errorMsg.value = e instanceof Error ? e.message : '登录失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="card narrow">
    <h1>登录 TaskFlow</h1>
    <p class="muted">Demo 级鉴权：输入任意用户名即可，数据按用户隔离。</p>
    <form @submit.prevent="onSubmit">
      <input v-model="name" placeholder="用户名，如 demo" autofocus />
      <button class="btn primary" type="submit" :disabled="loading">
        {{ loading ? '登录中…' : '登录' }}
      </button>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </form>
  </section>
</template>