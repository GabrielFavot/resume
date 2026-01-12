<template>
  <div
    class="min-h-screen bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 from-gray-100 via-white to-gray-100 py-4 sm:py-6 md:py-8 px-4 sm:px-6 transition-colors duration-300">
    <div class="container mx-auto max-w-4xl">
      <div class="flex justify-end mb-4 sm:mb-6">
        <ColorModeToggle />
      </div>
      <div class="space-y-4 sm:space-y-6">
        <ResumeSection>
          <ResumeHeader />
        </ResumeSection>

        <ResumeWork />

        <ResumeEducation />

        <ResumeSkills />

        <ResumeProjects />

        <ResumeLanguages />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>