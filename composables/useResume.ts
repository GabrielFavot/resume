import { computed } from 'vue'
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'

export type Resume = ResumeSchema

export const useResume = async () => {
    const data = await import('~/public/resume.json') as Resume

    if (!data) {
        throw new Error('Failed to load resume data')
    }

    const resumeData = data

    return {
        resume: computed(() => resumeData),
        basics: computed(() => resumeData.basics),
        work: computed(() => resumeData.work || []),
        education: computed(() => resumeData.education || []),
        skills: computed(() => resumeData.skills || []),
        projects: computed(() => resumeData.projects || []),
        languages: computed(() => resumeData.languages || [])
    }
}
