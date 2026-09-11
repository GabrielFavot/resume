<template>
    <div class="flex flex-col items-start md:items-end gap-1 text-sm text-gray-600 dark:text-gray-400">
        <div v-if="formattedDateRange" class="flex items-center gap-1">
            <Icon name="mdi:calendar" class="w-4 h-4" />
            <span>{{ formattedDateRange }}</span>
        </div>
        <div v-if="duration" class="text-xs text-gray-500 dark:text-gray-500">
            {{ duration }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    startDate?: string
    endDate?: string
}>()

// @ts-expect-error - useI18n auto-importé par Nuxt
const { locale, t } = useI18n()

const formattedDateRange = computed(() => {
    const start = props.startDate ? new Date(props.startDate) : null
    const end = props.endDate ? new Date(props.endDate) : new Date()

    if (!start && !end) return ''

    const formatDate = (date: Date) =>
        date.toLocaleDateString(locale.value, { month: 'short', year: 'numeric' })

    const startStr = start ? formatDate(start) : ''
    const endStr = end ? formatDate(end) : t('present')

    return start && end ? `${startStr} – ${endStr}` : endStr
})

const duration = computed(() => {
    const start = props.startDate ? new Date(props.startDate) : null
    const end = props.endDate ? new Date(props.endDate) : new Date()

    if (!start || !end) return ''

    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    if (end.getDate() < start.getDate()) months -= 1
    if (months <= 0) return ''

    const years = Math.floor(months / 12)
    const remMonths = months % 12

    const parts: string[] = []
    if (years > 0) parts.push(t('duration.year', years))
    if (remMonths > 0) parts.push(t('duration.month', remMonths))

    return parts.join(', ')
})
</script>