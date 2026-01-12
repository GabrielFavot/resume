<template>
    <div class="space-y-6">
        <h2
            class="text-2xl sm:text-3xl font-bold bg-gradient-to-r dark:from-white dark:via-gray-100 dark:to-white from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Languages
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div v-for="(lang, index) in languages" :key="index"
                class="flex items-center justify-between p-4 rounded-xl dark:bg-white/5 bg-black/5 dark:border-white/10 border-gray-300/30 backdrop-blur-sm">
                <span class="text-lg font-medium dark:text-white text-gray-900">
                    {{ lang.language }}
                </span>
                <span class="text-sm dark:text-gray-400 text-gray-600">
                    {{ lang.fluency }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { languages } = await useResume()
</script>
