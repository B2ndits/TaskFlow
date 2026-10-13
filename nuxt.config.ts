// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: { appName: 'TaskFlow' },   // 客户端可读；换环境用 NUXT_PUBLIC_APP_NAME 覆盖
    // sessionSecret: '',               // 真实项目：服务端专属密钥，用 NUXT_SESSION_SECRET 注入
  },

  // 混合渲染策略（进阶篇第 12 章）：
  routeRules: {
    '/': { prerender: true },          // 首页构建期静态化，秒开
    '/login': { headers: { 'x-robots-tag': 'noindex' } },
  },

  // 任务数据持久化到文件（去掉此段则纯内存，重启清空）
  nitro: {
    storage: { data: { driver: 'fs', base: './.data' } },
  },
})
