<script setup lang="ts">
const { user, logout } = useAuth()
</script>

<template>
  <div class="shell">
    <header class="nav">
      <NuxtLink to="/" class="brand">⚡ TaskFlow</NuxtLink>
      <nav>
        <NuxtLink to="/tasks">任务</NuxtLink>
        <ClientOnly v-if="user">
          <span class="user">👤 {{ user }}</span>
          <button class="btn ghost" @click="logout">登出</button>
        </ClientOnly>
        <NuxtLink v-else to="/login" class="btn">登录</NuxtLink>
      </nav>
    </header>

    <main class="main">
      <slot />
    </main>
  </div>
</template>