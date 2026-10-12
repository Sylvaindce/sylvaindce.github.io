<script setup lang="ts">
import cvData from '@/data/cv.json'
import { useLanguage } from '@/composables/useLanguage'
import CvSection from '@/components/CvSection.vue'

const { l, t } = useLanguage()
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
</script>

<template>
  <CvSection id="interests" :title="l.interest_txt">
    <ul class="cv-interests list-unstyled mb-0">
      <li v-for="interest in cvData.interests" :key="interest.icon">
        <i class="fa-solid" :class="interest.icon" aria-hidden="true"></i>
        <span>{{ capitalize(t(interest.name)) }}</span>
      </li>
    </ul>
  </CvSection>
</template>
