<template>
  <div class="flex flex-col items-start md:items-end gap-1 text-sm dark:text-gray-400 text-gray-600">
    <ResumeDateRange :start-date="education.startDate" :end-date="education.endDate" />
    <div v-if="education.location" class="flex items-center gap-1">
      <Icon name="mdi:map-marker" class="w-4 h-4" />
      <span>{{ education.location }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'

defineProps<{
  education: NonNullable<ResumeSchema['education']>[number]
}>()
</script>
