<template>
    <ResumeSection v-if="work.length > 0">
        <div class="space-y-6">
            <h2
                class="text-3xl font-bold bg-gradient-to-r dark:from-white dark:via-gray-100 dark:to-white from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Experience
            </h2>

            <div class="space-y-6">
                <ResumeWorkItem v-for="(job, index) in work" :key="index" :job="job" />
            </div>
        </div>
    </ResumeSection>
</template>

<script setup lang="ts">
const { work } = await useResume()
</script>
