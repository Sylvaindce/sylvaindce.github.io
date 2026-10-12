<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import cvData from '@/data/cv.json'
import { useLanguage } from '@/composables/useLanguage'

defineEmits<{ download: [] }>()

const { currentLanguage, l, setLanguage } = useLanguage()
const info = cvData.personalInfo
const otherLanguage = computed(() => (currentLanguage.value === 'en' ? 'fr' : 'en'))

// Header turns dark and sticks once the page has scrolled past the hero (same threshold as the old site)
const fixed = ref(false)
const onScroll = () => (fixed.value = window.scrollY >= 150)
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="cv-header" :class="{ fixed }">
    <div class="d-flex align-items-center justify-content-between h-100 px-3 px-md-4 col-xl-10 mx-auto">
      <a href="#top" class="cv-name">{{ info.firstName }} {{ info.lastName }}</a>
      <div class="d-flex align-items-center gap-2">
        <button type="button" class="btn btn-cv" :aria-label="l.download_resume_button" @click="$emit('download')">
          <span class="d-none d-xl-inline">{{ l.download_resume_button }}</span>
          <i class="fa-solid fa-file-arrow-down d-xl-none"></i>
        </button>
        <button type="button" class="cv-lang" :lang="otherLanguage"
          :aria-label="otherLanguage === 'fr' ? 'Français' : 'English'" @click="setLanguage(otherLanguage)">
          {{ otherLanguage.toUpperCase() }}
        </button>
        <button type="button" class="btn btn-cv d-xl-none" data-bs-toggle="offcanvas" data-bs-target="#cvNav"
          aria-controls="cvNav" aria-label="Menu">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  </header>
</template>
