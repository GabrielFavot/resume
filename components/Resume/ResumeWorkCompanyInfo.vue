<template>
    <div class="flex items-center gap-2 sm:gap-3">
        <div v-if="domain && !hasError" class="flex-shrink-0">
            <img :src="logoUrl" :alt="`${companyName} logo`"
                class="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-contain dark:bg-white/5 bg-black/5 p-1.5 border dark:border-white/10 border-gray-300/30"
                @error="handleError" />
        </div>
        <div class="flex-1 min-w-0">
            <h3 class="text-lg sm:text-xl font-semibold dark:text-white text-gray-900">
                <a v-if="companyUrl" :href="companyUrl" target="_blank" rel="noopener noreferrer"
                    class="hover:underline flex items-center gap-2">
                    {{ companyName }}
                    <Icon name="mdi:open-in-new" class="w-3 h-3 text-xs dark:text-gray-400 text-gray-500" />
                </a>
                <span v-else>{{ companyName }}</span>
            </h3>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'
import { computed } from 'vue'

const props = defineProps<{
    job: NonNullable<ResumeSchema['work']>[number]
}>()

const companyName = computed(() => props.job.name)
const companyUrl = computed(() => props.job.url)

const { domain, logoUrl, hasError, handleError } = useLogoFromUrl(companyUrl)
</script>
