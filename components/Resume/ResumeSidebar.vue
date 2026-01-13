<template>
  <aside class="w-full lg:w-80 bg-slate-800 dark:bg-slate-900 text-white flex flex-col shrink-0 lg:h-screen lg:overflow-y-auto">
    <div class="fixed top-4 right-4 z-50 lg:hidden">
      <ColorModeToggle />
    </div>

    <div class="p-6 flex flex-col items-center border-b border-slate-700 dark:border-slate-700">
      <div v-if="firstProfileUrl && avatarUrl && !hasError" class="flex-shrink-0 mb-4">
        <img :src="avatarUrl" :alt="`${basics?.name} profile picture`"
          class="w-32 h-32 rounded-full object-cover border-4 border-slate-600 dark:border-slate-700 shadow-lg"
          @error="handleError" />
      </div>
      <h1 class="text-2xl mb-1 font-bold">{{ basics?.name }}</h1>
      <p class="text-slate-300 text-sm">{{ basics?.label }}</p>
    </div>

    <div v-if="basics?.summary" class="p-6 border-b border-slate-700 dark:border-slate-700">
      <h2 class="text-lg mb-4 text-slate-200">About</h2>
      <p class="text-sm text-slate-300 leading-relaxed">{{ basics.summary }}</p>
    </div>

    <div class="p-6 border-b border-slate-700 dark:border-slate-700">
      <h2 class="text-lg mb-4 text-slate-200">Contact</h2>
      <div class="space-y-3 text-sm">
        <div v-if="basics?.email" class="flex items-center gap-3">
          <Icon name="mdi:email" class="w-4 h-4 text-slate-400 shrink-0" />
          <a :href="`mailto:${basics.email}`" class="break-all hover:text-white transition-colors">{{ basics.email }}</a>
        </div>
        <div v-if="basics?.phone" class="flex items-center gap-3">
          <Icon name="mdi:phone" class="w-4 h-4 text-slate-400 shrink-0" />
          <a :href="`tel:${basics.phone.replace(/\s+/g, '')}`" class="hover:text-white transition-colors">{{ formattedPhone }}</a>
        </div>
        <div v-if="basics?.location" class="flex items-center gap-3">
          <Icon name="mdi:map-marker" class="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            <span v-if="basics.location.city">{{ basics.location.city }}</span>
            <span v-if="basics.location.city && basics.location.country">, </span>
            <span v-if="basics.location.country">{{ basics.location.country }}</span>
          </span>
        </div>
        <div v-if="basics?.url" class="flex items-center gap-3">
          <Icon name="mdi:web" class="w-4 h-4 text-slate-400 shrink-0" />
          <a :href="basics.url" target="_blank" rel="noopener noreferrer" class="break-all hover:text-white transition-colors">{{ basics.url }}</a>
        </div>
        <template v-if="basics?.profiles && basics.profiles.length > 0">
          <div v-for="profile in basics.profiles" :key="profile.network" class="flex items-center gap-3">
            <Icon :name="getProfileIcon(profile.network)" class="w-4 h-4 text-slate-400 shrink-0" />
            <a :href="profile.url" target="_blank" rel="noopener noreferrer" class="break-all hover:text-white transition-colors">
              {{ profile.username ? `@${profile.username}` : profile.network }}
            </a>
          </div>
        </template>
        <template v-if="languages && languages.length > 0">
          <div v-for="(lang, index) in languages" :key="index" class="flex items-center gap-3">
            <Icon name="mdi:translate" class="w-4 h-4 text-slate-400 shrink-0" />
            <span>{{ lang.language }} - {{ lang.fluency }}</span>
          </div>
        </template>
      </div>
    </div>

    <div v-if="hasSkills" class="p-6 border-b border-slate-700 dark:border-slate-700 flex-1">
      <h2 class="text-lg mb-4 text-slate-200">Skills</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="skill in allSkills" :key="skill"
          class="px-3 py-1 bg-slate-700 dark:bg-slate-800 rounded-full text-xs text-slate-200 hover:bg-slate-600 dark:hover:bg-slate-700 transition-colors">
          {{ skill }}
        </span>
      </div>
    </div>

    <div v-if="hasEducation" class="p-6">
      <h2 class="text-lg mb-4 text-slate-200">Education</h2>
      <div class="space-y-4 text-sm">
        <div v-for="(edu, index) in education" :key="index">
          <h3 class="font-medium text-white">{{ edu.area || edu.studyType }}</h3>
          <p class="text-slate-300 text-xs mt-1">{{ edu.institution }}</p>
          <p class="text-slate-400 text-xs">
            <span v-if="edu.startDate">{{ formatDate(edu.startDate) }}</span>
            <span v-if="edu.startDate && edu.endDate"> - </span>
            <span v-if="edu.endDate">{{ formatDate(edu.endDate) }}</span>
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'

const { basics, skills, education, languages } = await useResume()

const { formatPhoneNumber } = usePhoneFormat()
const formattedPhone = computed(() => formatPhoneNumber(basics.value?.phone))

const firstProfileUrl = computed(() => {
  return basics.value?.profiles?.[0]?.url
})

const { avatarUrl, hasError, handleError } = useProfilePicture(firstProfileUrl)

const hasSkills = computed(() => skills.value.length > 0)
const hasEducation = computed(() => education.value.length > 0)

const allSkills = computed(() => {
  return skills.value.flatMap(skill => skill.keywords || [])
})

const getProfileIcon = (network: string) => {
  const icons: Record<string, string> = {
    GitHub: 'mdi:github',
    LinkedIn: 'mdi:linkedin',
    Twitter: 'mdi:twitter',
    'X (formerly Twitter)': 'mdi:twitter',
  }
  return icons[network] || 'mdi:link'
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric' })
}
</script>
