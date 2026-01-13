import { computed } from 'vue'
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'

const SUPPORTED_LOCALES = ['en', 'fr']

export type Resume = ResumeSchema

export const useResume = async () => {
    const { locale } = useI18n()
    const config = useRuntimeConfig()

    const currentLocale = locale.value || config.public.resumeDefaultLang
    const resumeLocale = SUPPORTED_LOCALES.includes(currentLocale) ? currentLocale : config.public.resumeDefaultLang || 'en'

    const resumePath = `/resume/resume_${resumeLocale}.json`

    const data = await $fetch<Resume>(resumePath)

    if (!data) {
        throw new Error(`Failed to load resume data from ${resumePath}`)
    }

    return {
        resume: computed(() => data),
        basics: computed(() => data.basics),
        work: computed(() => data.work || []),
        education: computed(() => data.education || []),
        skills: computed(() => data.skills || []),
        projects: computed(() => data.projects || []),
        languages: computed(() => data.languages || [])
    }
}
