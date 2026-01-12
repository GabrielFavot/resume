import { computed, ref, type Ref, unref } from 'vue'

export const useLogoFromUrl = (url: string | undefined | Ref<string | undefined>) => {
  const config = useRuntimeConfig()
  const logoDevKey = computed(() => config.public.logoDevApiKey)
  const hasError = ref(false)

  const domain = computed(() => {
    const urlValue = unref(url)
    if (!urlValue) return null

    try {
      const urlObj = new URL(urlValue)
      return urlObj.hostname.replace('www.', '')
    } catch {
      return null
    }
  })

  const logoUrl = computed(() => {
    if (!domain.value || !logoDevKey.value) return null
    return `https://img.logo.dev/${domain.value}?token=${logoDevKey.value}`
  })

  const handleError = () => {
    hasError.value = true
  }

  return {
    domain,
    logoUrl,
    hasError,
    handleError
  }
}
