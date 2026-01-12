<template>
  <div class="flex flex-col items-start md:items-end gap-1 text-sm dark:text-gray-400 text-gray-600">
    <div v-if="education.startDate || education.endDate" class="flex items-center gap-1">
      <Icon name="mdi:calendar" class="w-4 h-4" />
      <span>
        {{ formatDate(education.startDate) }}
        <span v-if="education.startDate && education.endDate"> - </span>
        {{ formatDate(education.endDate) }}
      </span>
    </div>
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

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
</script>
