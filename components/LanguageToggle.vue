<template>
    <div ref="dropdownRef" class="relative">
        <button @click.stop="isOpen = !isOpen"
            class="p-2.5 sm:p-3 rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105"
            :aria-label="`Select language`">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-200 uppercase">
                {{ locale }}
            </span>
        </button>

        <div v-if="isOpen"
            class="absolute right-0 mt-2 w-40 rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-lg overflow-hidden z-50">
            <button v-for="loc in locales" :key="loc.code" @click="selectLocale(loc.code)"
                class="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-200"
                :class="{ 'bg-white/20 dark:bg-black/30': locale === loc.code }">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-200 uppercase">
                    {{ loc.code }}
                </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const selectLocale = async (code: string) => {
    await setLocale(code)
    isOpen.value = false
}

onMounted(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
            isOpen.value = false
        }
    }

    document.addEventListener('click', handleClickOutside)

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside)
    })
})
</script>
