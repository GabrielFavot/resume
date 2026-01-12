<template>
    <ResumeSection v-if="projects.length > 0">
        <div class="space-y-6">
            <h2
                class="text-3xl font-bold bg-gradient-to-r dark:from-white dark:via-gray-100 dark:to-white from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Projects
            </h2>

            <div class="space-y-6">
                <ResumeProjectItem v-for="(project, index) in projects" :key="index" :project="project" />
            </div>
        </div>
    </ResumeSection>
</template>

<script setup lang="ts">
const { projects } = await useResume()
</script>
