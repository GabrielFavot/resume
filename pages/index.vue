<template>
  <div
    class="min-h-screen bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-slate-50 via-blue-50/30 to-indigo-50/40 py-4 sm:py-6 md:py-8 px-4 sm:px-6 transition-colors duration-300">
    <div class="container mx-auto max-w-6xl">
      <div class="flex justify-end gap-2 mb-4 sm:mb-6">
        <LanguageToggle />
        <ColorModeToggle />
      </div>

      <div class="space-y-4 sm:space-y-6">
        <ResumeSection>
          <ResumeHeader />
        </ResumeSection>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div class="space-y-4 sm:space-y-6">
            <ResumeSection v-if="hasWork">
              <ResumeWork />
            </ResumeSection>
          </div>

          <div class="space-y-4 sm:space-y-6">
            <ResumeSection v-if="hasProjects">
              <ResumeProjects />
            </ResumeSection>
            <ResumeSection v-if="hasEducation">
              <ResumeEducation />
            </ResumeSection>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useResume } from '~/composables/useResume'

const { basics, work, education, projects, languages } = await useResume()

const firstProfileUrl = computed(() => {
  return basics.value?.profiles?.[0]?.url
})

const { avatarUrl } = useProfilePicture(firstProfileUrl)

useHead(() => ({
  title: basics.value?.name || 'Resume',
  link: avatarUrl.value ? [
    { rel: 'icon', href: avatarUrl.value, type: 'image/png' }
  ] : []
}))

const hasWork = computed(() => work.value.length > 0)
const hasEducation = computed(() => education.value.length > 0)
const hasProjects = computed(() => projects.value.length > 0)
const hasLanguages = computed(() => languages.value.length > 0)
</script>

<style></style>