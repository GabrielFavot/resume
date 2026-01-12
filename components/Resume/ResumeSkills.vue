<template>
  <ResumeSection v-if="skills.length > 0">
    <div class="space-y-6">
      <h2 class="text-3xl font-bold bg-gradient-to-r dark:from-white dark:via-gray-100 dark:to-white from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
        Skills
      </h2>

      <div class="space-y-4">
        <div
          v-for="(skill, index) in skills"
          :key="index"
          class="space-y-2"
        >
          <h3 class="text-lg font-semibold dark:text-white text-gray-900">
            {{ skill.name }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(keyword, keywordIndex) in skill.keywords"
              :key="keywordIndex"
              class="px-3 py-1 rounded-lg dark:bg-white/10 bg-black/10 dark:border-white/20 border-gray-300/30 text-sm dark:text-gray-200 text-gray-700 font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              {{ keyword }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </ResumeSection>
</template>

<script setup lang="ts">
const { skills } = await useResume()
</script>
