<template>
  <div class="space-y-6">
    <div class="flex items-start gap-4 sm:gap-6">
      <div v-if="firstProfileUrl && avatarUrl && !hasError" class="flex-shrink-0">
        <img :src="avatarUrl" :alt="`${basics?.name} profile picture`"
          class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover border-2 dark:border-white/20 border-gray-300/40 shadow-lg dark:shadow-white/10 shadow-gray-900/10"
          @error="handleError" />
      </div>
      <div class="space-y-2 flex-1">
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r dark:from-white dark:via-gray-100 dark:to-white from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
          {{ basics?.name }}
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl dark:text-gray-200/90 text-gray-700/90 font-light">
          {{ basics?.label }}
        </p>
      </div>
    </div>

    <p v-if="basics?.summary" class="dark:text-gray-200/80 text-gray-700/80 leading-relaxed text-lg">
      {{ basics.summary }}
    </p>

    <div class="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
      <ResumeContactEmail :email="basics?.email" />
      <ResumeContactPhone :phone="basics?.phone" />
      <ResumeContactLocation :location="basics?.location" />
      <ResumeContactUrl :url="basics?.url" />
    </div>

    <div v-if="basics?.profiles && basics.profiles.length > 0" class="flex flex-wrap gap-2 sm:gap-3">
      <ResumeContactProfile v-for="profile in basics.profiles" :key="profile.network" :profile="profile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { basics } = await useResume()

const firstProfileUrl = computed(() => {
  return basics.value?.profiles?.[0]?.url
})

const { avatarUrl, hasError, handleError } = useProfilePicture(firstProfileUrl)
</script>
