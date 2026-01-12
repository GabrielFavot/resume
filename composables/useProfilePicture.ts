import { computed, ref, type Ref, unref, watch } from 'vue'

const GITHUB_HOSTNAME = 'github.com'
const LINKEDIN_HOSTNAME = 'linkedin.com'
const UNAVATAR_BASE_URL = 'https://unavatar.io'
const GITHUB_API_BASE_URL = 'https://api.github.com'

async function fetchGitHubAvatar(url: URL): Promise<string | null> {
    const username = url.pathname.split('/').filter(Boolean)[0]
    if (!username) return null

    const response = await $fetch<{ avatar_url: string }>(`${GITHUB_API_BASE_URL}/users/${username}`)
    return response.avatar_url
}

function fetchLinkedInAvatar(url: URL): string {
    return `${UNAVATAR_BASE_URL}/linkedin${url.pathname}`
}

function fetchGenericAvatar(url: URL): string {
    return `${UNAVATAR_BASE_URL}${url.pathname}`
}

async function getAvatarFromUrl(url: URL): Promise<string | null> {
    if (url.hostname.includes(GITHUB_HOSTNAME)) {
        return fetchGitHubAvatar(url)
    }

    if (url.hostname.includes(LINKEDIN_HOSTNAME)) {
        return fetchLinkedInAvatar(url)
    }

    return fetchGenericAvatar(url)
}

export const useProfilePicture = (profileUrl: string | undefined | Ref<string | undefined>) => {
    const avatarUrl = ref<string | null>(null)
    const hasError = ref(false)
    const isLoading = ref(false)

    const loadAvatar = async () => {
        const urlValue = unref(profileUrl)
        if (!urlValue) {
            avatarUrl.value = null
            return
        }

        isLoading.value = true
        hasError.value = false

        try {
            const url = new URL(urlValue)
            avatarUrl.value = await getAvatarFromUrl(url)
        } catch (error) {
            hasError.value = true
            avatarUrl.value = null
        } finally {
            isLoading.value = false
        }
    }

    watch(() => unref(profileUrl), loadAvatar, { immediate: true })

    const handleError = () => {
        hasError.value = true
    }

    return {
        avatarUrl: computed(() => avatarUrl.value),
        hasError: computed(() => hasError.value),
        isLoading: computed(() => isLoading.value),
        handleError
    }
}
