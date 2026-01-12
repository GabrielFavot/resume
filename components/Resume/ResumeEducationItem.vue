<template>
  <div class="space-y-3 pb-6 border-b dark:border-white/10 border-gray-300/30 last:border-0 last:pb-0">
    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
      <div class="flex-1">
        <ResumeEducationInstitutionInfo :education="education" />
        <p class="text-lg dark:text-gray-300 text-gray-700 font-medium mt-1">
          {{ education.area }}
        </p>
        <p class="text-sm dark:text-gray-400 text-gray-600 mt-1">
          {{ education.studyType }}
        </p>
      </div>
      <ResumeEducationMeta :education="education" />
    </div>

    <div v-if="education.courses && education.courses.length > 0" class="flex flex-wrap gap-2">
      <span
        v-for="(course, courseIndex) in education.courses"
        :key="courseIndex"
        class="px-3 py-1 rounded-lg dark:bg-white/5 bg-black/5 dark:border-white/10 border-gray-300/30 text-sm dark:text-gray-300 text-gray-700"
      >
        {{ course }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'

defineProps<{
  education: NonNullable<ResumeSchema['education']>[number]
}>()
</script>
