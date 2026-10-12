<script setup lang="ts">
import cvData from '@/data/cv.json'
import { useLanguage } from '@/composables/useLanguage'

const { l } = useLanguage()
const openToWork = cvData.personalInfo.openToWork
</script>

<template>
  <footer>
    <div class="row gy-3 col-lg-10 mx-auto px-3 px-md-4 py-5">
      <div v-if="openToWork" class="col-sm-6 d-flex align-items-start">
        <span class="cv-pulse mt-2"></span>
        <span class="cv-available">{{ l.more_txt }}</span>
      </div>
      <div class="col-sm-6 text-sm-end ms-sm-auto">
        <div class="d-print-none">
          <p class="mb-1">{{ l.social_txt }}</p>
          <div class="cv-social d-flex justify-content-sm-end gap-3">
            <a href="https://www.linkedin.com/in/decombe-sylvain" target="_blank" rel="noopener" aria-label="LinkedIn">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://github.com/sylvaindce/" target="_blank" rel="noopener" aria-label="GitHub">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
          <a href="#top" class="cv-top">top</a>
        </div>
        <p class="cv-copy mb-0">Developed by <b>DECOMBE Sylvain &copy; 2018.</b></p>
      </div>
    </div>
  </footer>
</template>
