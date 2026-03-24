import { computed, ref, type Ref, unref } from 'vue'

export function buildLogoUrl(url: string | undefined, apiKey: string | undefined): string | null {
  if (!url || !apiKey) return null
  try {
    const domain = new URL(url).hostname.replace('www.', '')
    return `https://img.logo.dev/${domain}?token=${apiKey}`
  } catch {
    return null
  }
}

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

  const logoUrl = computed(() => buildLogoUrl(unref(url), logoDevKey.value))

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
