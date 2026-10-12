<script setup lang="ts">
import cvData from '@/data/cv.json'
import { useLanguage } from '@/composables/useLanguage'
import CvSection from '@/components/CvSection.vue'

const { l } = useLanguage()
// Plain file names are PDFs in public/documents; full URLs are used as is
const href = (url: string) => (url.startsWith('http') ? url : `/documents/${url}`)
</script>

<template>
  <CvSection id="reference" :title="l.reference_txt">
    <ul class="list-unstyled mb-0">
      <li v-for="ref in cvData.references" :key="ref.name">
        <a :href="href(ref.url)" target="_blank" rel="noopener" class="cv-link">{{ ref.name }}</a>
      </li>
    </ul>
  </CvSection>
</template>
