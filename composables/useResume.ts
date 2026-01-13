import { computed, ref, watch } from 'vue'
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'

const SUPPORTED_LOCALES = ['en', 'fr']

export type Resume = ResumeSchema

export const useResume = async () => {
    const { locale } = useI18n()
    const config = useRuntimeConfig()

    const data = ref<Resume | null>(null)

    const loadResume = async () => {
        const currentLocale = locale.value || config.public.resumeDefaultLang
        const resumeLocale = SUPPORTED_LOCALES.includes(currentLocale) ? currentLocale : config.public.resumeDefaultLang || 'en'
        const resumePath = `/resume/resume_${resumeLocale}.json`

        const loadedData = await $fetch<Resume>(resumePath)

        if (!loadedData) {
            throw new Error(`Failed to load resume data from ${resumePath}`)
        }

        data.value = loadedData
    }

    await loadResume()

    watch(locale, () => {
        loadResume()
    })

    return {
        resume: computed(() => data.value!),
        basics: computed(() => data.value?.basics),
        work: computed(() => data.value?.work || []),
        education: computed(() => data.value?.education || []),
        skills: computed(() => data.value?.skills || []),
        projects: computed(() => data.value?.projects || []),
        languages: computed(() => data.value?.languages || [])
    }
}
