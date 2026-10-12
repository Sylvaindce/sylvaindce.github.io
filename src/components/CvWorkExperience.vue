<script setup lang="ts">
import cvData from '@/data/cv.json'
import { useLanguage } from '@/composables/useLanguage'
import CvSection from '@/components/CvSection.vue'

const { l, t } = useLanguage()
</script>

<template>
  <CvSection id="experience" :title="l.work_experience_txt">
    <ul class="cv-timeline list-unstyled mt-4">
      <li v-for="(job, i) in cvData.workExperience" :key="i">
        <div class="row gy-2">
          <div class="col-md-3 cv-duration">
            {{ t(job.period) }}<br /><small>{{ t(job.contractType) }}</small>
          </div>
          <div class="col-md-9">
            <span class="cv-job d-block">{{ t(job.position) }}</span>
            <span class="cv-company d-block">{{ job.company }}, {{ t(job.location) }}</span>
            <p class="p-small" v-html="t(job.description)"></p>
          </div>
        </div>
      </li>
    </ul>
  </CvSection>
</template>
