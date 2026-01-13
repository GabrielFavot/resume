<template>
    <div class="flex flex-col items-start md:items-end gap-1 text-sm dark:text-gray-400 text-gray-600">
        <ResumeDateRange :start-date="job.startDate" :end-date="job.endDate" />
        <div v-if="job.location" class="flex items-center gap-1">
            <Icon name="mdi:map-marker" class="w-4 h-4" />
            <span>{{ job.location }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'

defineProps<{
    job: NonNullable<ResumeSchema['work']>[number]
}>()
</script>
