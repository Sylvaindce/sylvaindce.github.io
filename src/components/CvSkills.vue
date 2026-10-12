<script setup lang="ts">
import cvData from '@/data/cv.json'
import { useLanguage } from '@/composables/useLanguage'
import CvSection from '@/components/CvSection.vue'

const { l, t } = useLanguage()
// Items with a duration are listed with it; the others are plain tags
const hasDuration = (items: (typeof cvData.skills)[number]['items']) => items.some((i) => 'duration' in i)
// Durations are stored in months; whole years are shown as years
const formatDuration = (months: number) => {
  const years = months % 12 === 0
  const n = years ? months / 12 : months
  return `${n} ${years ? (n === 1 ? l.value.year_txt : l.value.years_txt) : n === 1 ? l.value.month_txt : l.value.months_txt}`
}
</script>

<template>
  <CvSection id="skills" :title="l.skills_txt">
    <div class="row mt-4">
      <div v-for="(group, i) in cvData.skills" :key="i" class="col-sm-6 mb-5">
        <div class="main-skills-container">
          <h4>{{ t(group.category) }}</h4>
          <div v-if="hasDuration(group.items)" class="skills-container">
            <div class="sub-skills-container">
              <ul class="list-unstyled">
                <li v-for="(item, j) in group.items" :key="j" class="d-flex justify-content-between">
                  {{ t(item.name) }}
                  <span v-if="'duration' in item">{{ formatDuration(item.duration) }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div v-else class="cv-tags">
            <span v-for="(item, j) in group.items" :key="j">{{ t(item.name) }}</span>
          </div>
        </div>
      </div>
    </div>
  </CvSection>
</template>
