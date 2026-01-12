import { computed } from 'vue'
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'

export type Resume = ResumeSchema

export const useResume = async () => {
    const data = await $fetch<Resume>('/resume.json')

    if (!data) {
        throw new Error('Failed to load resume data')
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
