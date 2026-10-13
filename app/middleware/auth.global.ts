export default defineNuxtRouteMiddleware((to) => {
  // 只保护 /tasks/**；首页、登录页放行
  if (!to.path.startsWith('/tasks')) return

  // useCookie 双端可用：SSR 读请求头，客户端读 document.cookie
  const session = useCookie(SESSION_COOKIE)   // 常量来自 shared/utils 自动导入
  if (!session.value) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})