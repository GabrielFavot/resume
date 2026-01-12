<template>
  <div v-if="location && (location.city || location.country)"
    class="flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-white/5 bg-black/5 dark:border-white/10 border-gray-300/30 backdrop-blur-sm">
    <Icon name="mdi:map-marker" class="w-4 h-4 dark:text-gray-300 text-gray-600" />
    <span class="dark:text-gray-300 text-gray-600">
      <span v-if="location.city">{{ location.city }}</span>
      <span v-if="location.city && location.country">, </span>
      <span v-if="location.country">{{ location.country }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  location?: {
    city?: string
    country?: string
  }
}>()
</script>
