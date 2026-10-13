<script setup lang="ts">
// 全站标题模板：每个页面的 title 自动带站点后缀
useHead({
  titleTemplate: (title) => (title ? `${title} · TaskFlow` : 'TaskFlow'),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>