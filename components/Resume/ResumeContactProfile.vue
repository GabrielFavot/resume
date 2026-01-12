<template>
  <a v-if="profile" :href="profile.url" target="_blank" rel="noopener noreferrer"
    class="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl dark:bg-white/5 bg-black/5 dark:hover:bg-white/10 hover:bg-black/10 dark:border-white/10 border-gray-300/30 dark:hover:border-white/30 hover:border-gray-400/40 backdrop-blur-sm transition-all duration-300 hover:scale-105 dark:hover:shadow-lg dark:hover:shadow-white/10 hover:shadow-lg hover:shadow-gray-900/10">
    <Icon :name="icon"
      class="w-5 h-5 dark:text-gray-300 text-gray-600 dark:group-hover:text-white group-hover:text-gray-900 transition-all duration-300 group-hover:scale-110" />
    <span
      class="dark:text-gray-300 text-gray-600 dark:group-hover:text-white group-hover:text-gray-900 transition-colors font-medium">{{
        displayName }}</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  profile: {
    network: string
    username?: string
    url: string
  }
}>()

const getProfileIcon = (network: string) => {
  const icons: Record<string, string> = {
    GitHub: 'mdi:github',
    LinkedIn: 'mdi:linkedin',
    Twitter: 'mdi:twitter',
    'X (formerly Twitter)': 'mdi:twitter',
  }
  return icons[network] || 'mdi:link'
}

const icon = computed(() => getProfileIcon(props.profile.network))

const displayName = computed(() => {
  if (props.profile.username) {
    return `@${props.profile.username}`
  }
  return props.profile.network
})
</script>
