import { authApi } from "~/utils/api"

export function useAuth() {
  // 同 key 共享（Nuxt 4 特性）：无论多少组件调用 useAuth，
  // /api/auth/me 只请求一次，data/status 全站同一份引用。
  // 服务端执行时自动带上浏览器 cookie（useRequestFetch），登录态 SSR 也是对的。
  const { data, status, refresh } = useFetch('/api/auth/me', { key: 'auth:me' })
  const user = computed(() => data.value?.user ?? null)

  async function login(name: string, redirect = '/tasks') {
    await authApi.login(name)      // 响应写入 cookie
    await refresh()                // 刷新共享的 auth:me
    await navigateTo(redirect)
  }

  async function logout() {
    await authApi.logout()
    await refresh()
    await navigateTo('/login')
  }

  return { user, status, login, logout }
}