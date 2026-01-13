<template>
  <ResumeDateRange :start-date="project.startDate" :end-date="project.endDate" />
</template>

<script setup lang="ts">
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'

defineProps<{
  project: NonNullable<ResumeSchema['projects']>[number]
}>()
</script>
