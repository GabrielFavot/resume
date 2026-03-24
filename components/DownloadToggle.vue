<template>
    <div ref="dropdownRef" class="relative">
        <button @click.stop="isOpen = !isOpen"
            class="p-2.5 sm:p-3 rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-105"
            aria-label="Download PDF">
            <Icon name="mdi:download" class="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>

        <div v-if="isOpen"
            class="absolute right-0 mt-2 w-48 rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-lg overflow-hidden z-50">
            <a v-for="option in options" :key="option.locale" :href="option.href" download
                @click="isOpen = false"
                class="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-200">
                <Icon name="mdi:file-pdf-box" class="w-4 h-4 text-gray-700 dark:text-gray-200" />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
                    PDF ({{ option.label }})
                </span>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
const options = [
    { locale: 'en', label: 'EN', href: '/resume/resume_en.pdf' },
    { locale: 'fr', label: 'FR', href: '/resume/resume_fr.pdf' },
]

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

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
