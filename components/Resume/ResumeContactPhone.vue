<template>
  <a v-if="phone" :href="`tel:${phone}`"
    class="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl dark:bg-white/5 bg-black/5 dark:hover:bg-white/10 hover:bg-black/10 dark:border-white/10 border-gray-300/30 dark:hover:border-white/20 hover:border-gray-400/40 backdrop-blur-sm transition-all duration-300 hover:scale-105">
    <Icon name="mdi:phone"
      class="w-4 h-4 dark:text-gray-300 text-gray-600 dark:group-hover:text-white group-hover:text-gray-900 transition-colors" />
    <span
      class="dark:text-gray-300 text-gray-600 dark:group-hover:text-white group-hover:text-gray-900 transition-colors">{{
        phone }}</span>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  phone?: string
}>()
</script>
