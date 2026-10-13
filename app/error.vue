<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const recover = () => clearError({ redirect: '/' })

useHead({ title: () => `${props.error.statusCode} · TaskFlow` })
</script>

<template>
  <div class="error-page">
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message || error.statusMessage || '页面走丢了' }}</p>
    <button class="btn" @click="recover">返回首页</button>
  </div>
</template>