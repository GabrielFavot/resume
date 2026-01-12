<template>
    <div
        class="backdrop-blur-xl bg-gradient-to-br dark:from-white/10 dark:via-white/5 dark:to-white/10 from-black/5 via-black/3 to-black/5 border dark:border-white/20 border-gray-300/30 rounded-2xl sm:rounded-3xl shadow-2xl dark:shadow-black/50 shadow-gray-900/20 p-4 sm:p-6 md:p-8 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br dark:before:from-white/5 before:from-black/5 before:via-transparent before:to-transparent before:pointer-events-none transition-all duration-300 hover:shadow-3xl dark:hover:shadow-black/60">
        <div class="relative z-10">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
</script>
