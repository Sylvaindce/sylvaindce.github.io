<script setup lang="ts">
import cvData from '@/data/cv.json'
import { useLanguage } from '@/composables/useLanguage'
import CvSection from '@/components/CvSection.vue'

const { l, t } = useLanguage()
</script>

<template>
  <CvSection id="education" :title="l.education_txt">
    <div class="border-top">
      <div v-for="(edu, i) in cvData.education" :key="i" class="cv-edu-row row gy-2 align-items-center mx-0">
        <div class="col-sm-2 cv-year">{{ t(edu.period) }}</div>
        <div class="col-sm-6 cv-insti">{{ edu.institution }}, {{ t(edu.location) }}</div>
        <div class="col-sm-4 cv-degree">{{ t(edu.degree) }}</div>
      </div>
    </div>
  </CvSection>
</template>
