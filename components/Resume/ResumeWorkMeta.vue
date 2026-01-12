<template>
    <div class="flex flex-col items-start md:items-end gap-1 text-sm dark:text-gray-400 text-gray-600">
        <div class="flex items-center gap-1">
            <Icon name="mdi:calendar" class="w-4 h-4" />
            <span>{{ formatDate(job.startDate) }} - {{ job.endDate ? formatDate(job.endDate) : 'Present' }}</span>
        </div>
        <div class="text-xs dark:text-gray-500 text-gray-500">
            {{ calculateDuration(job.startDate, job.endDate) }}
        </div>
        <div v-if="job.location" class="flex items-center gap-1">
            <Icon name="mdi:map-marker" class="w-4 h-4" />
            <span>{{ job.location }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ResumeSchema } from '@kurone-kito/jsonresume-types'

defineProps<{
    job: NonNullable<ResumeSchema['work']>[number]
}>()

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const calculateDuration = (startDate: string | undefined, endDate: string | undefined) => {
    if (!startDate) return ''
    
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    
    const years = end.getFullYear() - start.getFullYear()
    const months = end.getMonth() - start.getMonth()
    
    let totalMonths = years * 12 + months
    if (end.getDate() < start.getDate()) {
        totalMonths--
    }
    
    const calculatedYears = Math.floor(totalMonths / 12)
    const calculatedMonths = totalMonths % 12
    
    if (calculatedYears === 0) {
        return `${calculatedMonths} ${calculatedMonths === 1 ? 'month' : 'months'}`
    }
    
    if (calculatedMonths === 0) {
        return `${calculatedYears} ${calculatedYears === 1 ? 'year' : 'years'}`
    }
    
    return `${calculatedYears} ${calculatedYears === 1 ? 'year' : 'years'} ${calculatedMonths} ${calculatedMonths === 1 ? 'month' : 'months'}`
}
</script>
