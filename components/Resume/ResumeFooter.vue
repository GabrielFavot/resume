<template>
  <footer class="mt-12 pt-8 border-t dark:border-white/10 border-gray-300/30">
    <div class="text-center space-y-2">
      <p class="text-sm dark:text-gray-400 text-gray-600">
        {{ $t('footer.description') }}
      </p>
      <a
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-sm dark:text-gray-300 text-gray-700 hover:underline transition-colors"
      >
        <Icon name="mdi:github" class="w-4 h-4" />
        {{ $t('footer.viewOnGitHub') }}
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
const githubUrl = 'https://github.com/GabrielFavot/resume'
</script>
