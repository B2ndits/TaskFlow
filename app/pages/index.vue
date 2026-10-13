<script setup lang="ts">
// 首页会被 routeRules 静态化（见 Step 7），不写任何登录态相关请求
useSeoMeta({
  title: '极简任务管理',
  description: 'TaskFlow：一个用 Nuxt 4 构建的全栈任务管理应用',
  ogTitle: 'TaskFlow · 极简任务管理',
})
</script>

<template>
  <section class="hero">
    <h1>把事情一件件做完</h1>
    <p>Nuxt 4 全栈 Demo：SSR + Nitro API + useStorage</p>
    <NuxtLink to="/tasks" class="btn primary big">进入我的任务 →</NuxtLink>
  </section>
</template>