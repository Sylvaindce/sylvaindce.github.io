<script setup lang="ts">
import cvData from '@/data/cv.json'
import { useLanguage } from '@/composables/useLanguage'
import CvSection from '@/components/CvSection.vue'

const { l } = useLanguage()
const email = cvData.personalInfo.email
</script>

<template>
  <CvSection id="contact" :title="l.contact_txt">
    <p class="cv-email mb-0">
      {{ l.contact_content_txt }}<a :href="'mailto:' + email">{{ email }}</a>.
    </p>
  </CvSection>
</template>
