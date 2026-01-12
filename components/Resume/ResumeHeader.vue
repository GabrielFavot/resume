<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h1
        class="text-4xl md:text-5xl font-bold bg-gradient-to-r dark:from-white dark:via-gray-100 dark:to-white from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
        {{ basics?.name }}
      </h1>
      <p class="text-xl md:text-2xl dark:text-gray-200/90 text-gray-700/90 font-light">
        {{ basics?.label }}
      </p>
    </div>

    <p v-if="basics?.summary" class="dark:text-gray-200/80 text-gray-700/80 leading-relaxed text-lg">
      {{ basics.summary }}
    </p>

    <div class="flex flex-wrap gap-3 text-sm">
      <a v-if="basics?.email" :href="`mailto:${basics.email}`"
        class="group flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-white/5 bg-black/5 dark:hover:bg-white/10 hover:bg-black/10 dark:border-white/10 border-gray-300/30 dark:hover:border-white/20 hover:border-gray-400/40 backdrop-blur-sm transition-all duration-300 hover:scale-105">
        <Icon name="mdi:email"
          class="w-4 h-4 dark:text-gray-300 text-gray-600 dark:group-hover:text-white group-hover:text-gray-900 transition-colors" />
        <span
          class="dark:text-gray-300 text-gray-600 dark:group-hover:text-white group-hover:text-gray-900 transition-colors">{{
            basics.email }}</span>
      </a>

      <a v-if="basics?.phone" :href="`tel:${basics.phone}`"
        class="group flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-white/5 bg-black/5 dark:hover:bg-white/10 hover:bg-black/10 dark:border-white/10 border-gray-300/30 dark:hover:border-white/20 hover:border-gray-400/40 backdrop-blur-sm transition-all duration-300 hover:scale-105">
        <Icon name="mdi:phone"
          class="w-4 h-4 dark:text-gray-300 text-gray-600 dark:group-hover:text-white group-hover:text-gray-900 transition-colors" />
        <span
          class="dark:text-gray-300 text-gray-600 dark:group-hover:text-white group-hover:text-gray-900 transition-colors">{{
            basics.phone }}</span>
      </a>

      <div v-if="basics?.location"
        class="flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-white/5 bg-black/5 dark:border-white/10 border-gray-300/30 backdrop-blur-sm">
        <Icon name="mdi:map-marker" class="w-4 h-4 dark:text-gray-300 text-gray-600" />
        <span class="dark:text-gray-300 text-gray-600">
          <span v-if="basics.location.city">{{ basics.location.city }}</span>
          <span v-if="basics.location.city && basics.location.country">, </span>
          <span v-if="basics.location.country">{{ basics.location.country }}</span>
        </span>
      </div>

      <a v-if="basics?.url" :href="basics.url" target="_blank" rel="noopener noreferrer"
        class="group flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-white/5 bg-black/5 dark:hover:bg-white/10 hover:bg-black/10 dark:border-white/10 border-gray-300/30 dark:hover:border-white/20 hover:border-gray-400/40 backdrop-blur-sm transition-all duration-300 hover:scale-105">
        <Icon name="mdi:web"
          class="w-4 h-4 dark:text-gray-300 text-gray-600 dark:group-hover:text-white group-hover:text-gray-900 transition-colors" />
        <span
          class="dark:text-gray-300 text-gray-600 dark:group-hover:text-white group-hover:text-gray-900 transition-colors">{{
            basics.url }}</span>
      </a>
    </div>

    <div v-if="basics?.profiles && basics.profiles.length > 0" class="flex flex-wrap gap-3">
      <a v-for="profile in basics.profiles" :key="profile.network" :href="profile.url" target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-white/5 bg-black/5 dark:hover:bg-white/10 hover:bg-black/10 dark:border-white/10 border-gray-300/30 dark:hover:border-white/30 hover:border-gray-400/40 backdrop-blur-sm transition-all duration-300 hover:scale-105 dark:hover:shadow-lg dark:hover:shadow-white/10 hover:shadow-lg hover:shadow-gray-900/10">
        <Icon :name="getProfileIcon(profile.network)"
          class="w-5 h-5 dark:text-gray-300 text-gray-600 dark:group-hover:text-white group-hover:text-gray-900 transition-all duration-300 group-hover:scale-110" />
        <span
          class="dark:text-gray-300 text-gray-600 dark:group-hover:text-white group-hover:text-gray-900 transition-colors font-medium">{{
            profile.network }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const { basics } = await useResume()

const getProfileIcon = (network: string) => {
  const icons: Record<string, string> = {
    GitHub: 'mdi:github',
    LinkedIn: 'mdi:linkedin',
    Twitter: 'mdi:twitter',
    'X (formerly Twitter)': 'mdi:twitter',
  }
  return icons[network] || 'mdi:link'
}
</script>
