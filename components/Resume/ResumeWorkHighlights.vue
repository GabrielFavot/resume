<template>
    <ul class="space-y-2 ml-4">
        <li v-for="(highlight, index) in highlights" :key="index"
            class="flex items-start gap-2 dark:text-gray-200/80 text-gray-700/80">
            <Icon name="mdi:circle-small" class="w-5 h-5 dark:text-gray-400 text-gray-500 mt-0.5 flex-shrink-0" />
            <span>{{ highlight }}</span>
        </li>
    </ul>
</template>

<script setup lang="ts">
defineProps<{
    highlights: string[]
}>()
</script>
