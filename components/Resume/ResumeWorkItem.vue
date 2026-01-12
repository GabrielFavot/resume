<template>
    <div class="space-y-3 pb-6 border-b dark:border-white/10 border-gray-300/30 last:border-0 last:pb-0">
        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
            <div class="flex-1">
                <ResumeWorkCompanyInfo :job="job" />
                <p class="text-lg dark:text-gray-300 text-gray-700 font-medium mt-1">
                    {{ job.position }}
                </p>
            </div>
            <ResumeWorkMeta :job="job" />
        </div>

        <p v-if="job.summary" class="dark:text-gray-200/80 text-gray-700/80 leading-relaxed">
            {{ job.summary }}
        </p>

        <ResumeWorkHighlights v-if="job.highlights && job.highlights.length > 0" :highlights="job.highlights" />
    </div>
</template>

<script setup lang="ts">
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'

defineProps<{
    job: NonNullable<ResumeSchema['work']>[number]
}>()
</script>
