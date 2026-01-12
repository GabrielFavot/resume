<template>
  <div class="space-y-3 pb-6 border-b dark:border-white/10 border-gray-300/30 last:border-0 last:pb-0">
    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
      <div class="flex-1">
        <h3 class="text-xl font-semibold dark:text-white text-gray-900">
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline flex items-center gap-2"
          >
            {{ project.name }}
            <Icon name="mdi:open-in-new" class="w-3 h-3 text-xs dark:text-gray-400 text-gray-500" />
          </a>
          <span v-else>{{ project.name }}</span>
        </h3>
        <p v-if="project.description" class="dark:text-gray-200/80 text-gray-700/80 leading-relaxed mt-2">
          {{ project.description }}
        </p>
      </div>
      <ResumeProjectMeta v-if="project.startDate || project.endDate" :project="project" />
    </div>

    <ResumeWorkHighlights v-if="project.highlights && project.highlights.length > 0" :highlights="project.highlights" />

    <div v-if="project.keywords && project.keywords.length > 0" class="flex flex-wrap gap-2">
      <span
        v-for="(keyword, keywordIndex) in project.keywords"
        :key="keywordIndex"
        class="px-3 py-1 rounded-lg dark:bg-white/10 bg-black/10 dark:border-white/20 border-gray-300/30 text-sm dark:text-gray-200 text-gray-700 font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105"
      >
        {{ keyword }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'

defineProps<{
  project: NonNullable<ResumeSchema['projects']>[number]
}>()
</script>
