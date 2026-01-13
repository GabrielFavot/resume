<template>
    <div class="space-y-6">
        <h2
            class="text-2xl sm:text-3xl font-bold bg-gradient-to-r dark:from-white dark:via-gray-100 dark:to-white from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            {{ $t('experience') }}
        </h2>

        <div class="space-y-4 sm:space-y-6">
            <ResumeWorkItem v-for="(job, index) in work" :key="index" :job="job" />
        </div>
    </div>
</template>

<script setup lang="ts">
const { work } = await useResume()
</script>
