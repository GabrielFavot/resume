<template>
    <button @click="toggle"
        class="p-2.5 sm:p-3 rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105"
        :aria-label="`Switch to ${colorMode.preference === 'dark' ? 'light' : 'dark'} mode`">
        <Icon :name="colorMode.preference === 'dark' ? 'mdi:weather-sunny' : 'mdi:weather-night'"
            class="w-5 h-5 text-gray-700 dark:text-gray-200" />
    </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const toggle = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>
