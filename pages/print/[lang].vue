<template>
  <div class="pdf">

    <!-- ── Header ─────────────────────────────────────────────── -->
    <header class="header">
      <div class="header-top">
        <img
          v-if="avatarUrl && !avatarError"
          :src="avatarUrl"
          :alt="basics?.name"
          class="avatar"
          @error="avatarError = true"
        />
        <div class="header-identity">
          <h1>{{ basics?.name }}</h1>
          <p class="label">{{ basics?.label }}</p>
          <p v-if="basics?.summary" class="summary">{{ basics.summary }}</p>
        </div>
      </div>

      <div class="contact">
        <span v-if="basics?.email" class="contact-item">
          <Icon name="mdi:email-outline" class="contact-icon" />{{ basics.email }}
        </span>
        <span v-if="basics?.phone" class="contact-item">
          <Icon name="mdi:phone-outline" class="contact-icon" />{{ basics.phone }}
        </span>
        <span v-if="basics?.location?.city" class="contact-item">
          <Icon name="mdi:map-marker-outline" class="contact-icon" />
          {{ [basics.location.city, basics.location.region].filter(Boolean).join(', ') }}
        </span>
        <span v-if="basics?.url" class="contact-item">
          <Icon name="mdi:web" class="contact-icon" />{{ basics.url }}
        </span>
        <span v-for="profile in basics?.profiles" :key="profile.network" class="contact-item">
          <Icon :name="profileIcon(profile.network)" class="contact-icon" />
          {{ profile.username ? `@${profile.username}` : profile.network }}
        </span>
        <span v-for="lang in languages" :key="lang.language" class="contact-item lang-item">
          {{ lang.language }} <span class="lang-fluency">{{ lang.fluency }}</span>
        </span>
      </div>
    </header>

    <!-- ── Body: 2 columns ────────────────────────────────────── -->
    <div class="body">

      <!-- Left — Work -->
      <section v-if="work.length">
        <h2>{{ $t('experience') }}</h2>
        <div v-for="job in work" :key="`${job.name}-${job.startDate}`" class="item">
          <div class="item-header">
            <div class="item-title">
              <div class="company-row">
                <img
                  v-if="getLogoUrl(job.url) && !logoErrors.has(job.url ?? '')"
                  :src="getLogoUrl(job.url)!"
                  :alt="job.name"
                  class="logo"
                  @error="logoErrors.add(job.url ?? '')"
                />
                <div>
                  <h3>{{ job.name }}</h3>
                  <span class="secondary">{{ job.position }}</span>
                </div>
              </div>
            </div>
            <div class="meta">
              <span>{{ formatDateRange(job.startDate, job.endDate) }}</span>
              <span v-if="job.location" class="meta-location">
                <Icon name="mdi:map-marker-outline" class="meta-icon" />{{ job.location }}
              </span>
            </div>
          </div>
          <p v-if="job.summary" class="text">{{ job.summary }}</p>
          <ul v-if="job.highlights?.length">
            <li v-for="(h, i) in job.highlights" :key="i">
              <Icon name="mdi:circle-small" class="li-icon" />{{ h }}
            </li>
          </ul>
          <div v-if="job.keywords?.length" class="tags">
            <span v-for="kw in job.keywords" :key="kw" class="tag">{{ kw }}</span>
          </div>
        </div>
      </section>

      <!-- Right — Projects + Education -->
      <div>
        <section v-if="projects.length">
          <h2>{{ $t('projects') }}</h2>
          <div v-for="proj in projects" :key="proj.name" class="item">
            <div class="item-header">
              <div class="item-title">
                <h3>{{ proj.name }}</h3>
                <a v-if="proj.url" :href="proj.url" class="secondary link">{{ proj.url }}</a>
              </div>
              <div v-if="proj.startDate || proj.endDate" class="meta">
                {{ formatDateRange(proj.startDate, proj.endDate) }}
              </div>
            </div>
            <p v-if="proj.description" class="text">{{ proj.description }}</p>
            <ul v-if="proj.highlights?.length">
              <li v-for="(h, i) in proj.highlights" :key="i">
                <Icon name="mdi:circle-small" class="li-icon" />{{ h }}
              </li>
            </ul>
            <div v-if="proj.keywords?.length" class="tags">
              <span v-for="kw in proj.keywords" :key="kw" class="tag">{{ kw }}</span>
            </div>
          </div>
        </section>

        <section v-if="education.length">
          <h2>{{ $t('education') }}</h2>
          <div v-for="edu in education" :key="`${edu.institution}-${edu.startDate}`" class="item">
            <div class="item-header">
              <div class="item-title">
                <div class="company-row">
                  <img
                    v-if="getLogoUrl(edu.url) && !logoErrors.has(edu.url ?? '')"
                    :src="getLogoUrl(edu.url)!"
                    :alt="edu.institution"
                    class="logo"
                    @error="logoErrors.add(edu.url ?? '')"
                  />
                  <div>
                    <h3>{{ edu.institution }}</h3>
                    <span v-if="edu.area" class="secondary">{{ edu.area }}</span>
                    <span v-if="edu.studyType" class="secondary">{{ edu.studyType }}</span>
                  </div>
                </div>
              </div>
              <div class="meta">{{ formatDateRange(edu.startDate, edu.endDate) }}</div>
            </div>
            <ul v-if="edu.courses?.length">
              <li v-for="course in edu.courses" :key="course">
                <Icon name="mdi:circle-small" class="li-icon" />{{ course }}
              </li>
            </ul>
          </div>
        </section>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { buildLogoUrl } from '~/composables/useLogoFromUrl'

const route = useRoute()
const lang = route.params.lang as string

const { setLocale, locale, t } = useI18n()
await setLocale(['en', 'fr'].includes(lang) ? (lang as 'en' | 'fr') : 'en')

const { basics, work, education, projects, languages } = await useResume()

// ── Avatar ────────────────────────────────────────────────────────
const firstProfileUrl = computed(() => basics.value?.profiles?.[0]?.url)
const { avatarUrl } = useProfilePicture(firstProfileUrl)
const avatarError = ref(false)

// ── Company logos ─────────────────────────────────────────────────
const config = useRuntimeConfig()
const logoDevKey = computed(() => config.public.logoDevApiKey)
const logoErrors = reactive(new Set<string>())

function getLogoUrl(url?: string): string | null {
  return buildLogoUrl(url, logoDevKey.value)
}

// ── Profile icons ─────────────────────────────────────────────────
const PROFILE_ICONS: Record<string, string> = {
  GitHub: 'mdi:github',
  LinkedIn: 'mdi:linkedin',
  Twitter: 'mdi:twitter',
  'X (formerly Twitter)': 'mdi:twitter',
}
function profileIcon(network: string): string {
  return PROFILE_ICONS[network] ?? 'mdi:link-variant'
}

// ── Date formatting ───────────────────────────────────────────────
function formatDateRange(startDate?: string, endDate?: string): string {
  if (!startDate && !endDate) return ''
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(locale.value, { month: 'short', year: 'numeric' })
  const start = startDate ? fmt(startDate) : ''
  const end = endDate ? fmt(endDate) : t('present')
  return start ? `${start} – ${end}` : end
}
</script>

<style scoped>
/* ── Base ── */
.pdf {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  font-size: 11px;
  color: #111827;
  line-height: 1.4;
  background: #fff;
}

/* ── Header ── */
.header {
  padding-bottom: 12px;
  margin-bottom: 14px;
}

.header-top {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 9px;
}

.avatar {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 1.5px solid #e5e7eb;
}

.header-identity h1 {
  font-size: 30px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 2px;
  line-height: 1.15;
}

.label {
  font-size: 15px;
  color: #4b5563;
  margin: 0 0 5px;
  font-weight: 400;
}

.summary {
  font-size: 11.5px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
  max-width: 520px;
}

/* ── Contact ── */
.contact {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 10px;
  color: #4b5563;
}

.contact-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 2px 7px;
}

.contact-icon {
  width: 11px;
  height: 11px;
  color: #6b7280;
  flex-shrink: 0;
}

.lang-item {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1e40af;
}

.lang-fluency {
  color: #93c5fd;
  margin-left: 2px;
}

/* ── Body ── */
.body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
}

/* ── Section ── */
section {
  margin-bottom: 14px;
}

h2 {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 4px;
  margin: 0 0 9px;
}

/* ── Items ── */
.item {
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f3f4f6;
}

.item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 6px;
  margin-bottom: 4px;
}

.item-title {
  flex: 1;
  min-width: 0;
}

.company-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: contain;
  flex-shrink: 0;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 4px;
}

h3 {
  font-size: 13px;
  font-weight: 500;
  color: #111827;
  margin: 0;
  line-height: 1.3;
}

.secondary {
  font-size: 11px;
  font-weight: 400;
  color: #6b7280;
  display: block;
  margin-top: 1px;
}

.link {
  color: #2563eb;
  text-decoration: none;
}

.meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 10.5px;
  color: #9ca3af;
  white-space: nowrap;
  flex-shrink: 0;
  gap: 2px;
}

.meta-location {
  display: flex;
  align-items: center;
  gap: 2px;
}

.meta-icon {
  width: 9px;
  height: 9px;
}

/* ── Content ── */
.text {
  font-size: 11.5px;
  color: #4b5563;
  margin: 4px 0;
  line-height: 1.45;
}

ul {
  margin: 4px 0;
  padding: 0;
  list-style: none;
}

li {
  display: flex;
  align-items: flex-start;
  gap: 2px;
  font-size: 11.5px;
  color: #4b5563;
  margin-bottom: 2px;
  line-height: 1.4;
}

.li-icon {
  width: 16px;
  height: 16px;
  color: #9ca3af;
  flex-shrink: 0;
  margin-top: 0px;
}

/* ── Tags ── */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  margin-top: 6px;
}

.tag {
  font-size: 10px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 3px;
  padding: 1px 6px;
  color: #6b7280;
}
</style>
