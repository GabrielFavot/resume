<template>
  <div class="flex items-center gap-1 text-sm dark:text-gray-400 text-gray-600">
    <Icon name="mdi:calendar" class="w-4 h-4" />
    <span>
      {{ formatDate(project.startDate) }}
      <span v-if="project.startDate && project.endDate"> - </span>
      {{ formatDate(project.endDate) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'

defineProps<{
  project: NonNullable<ResumeSchema['projects']>[number]
}>()

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
</script>
