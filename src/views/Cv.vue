<script setup lang="ts">
import cvData from '@/data/cv.json'
import CvHeader from '@/components/CvHeader.vue'
import CvNav from '@/components/CvNav.vue'
import CvAbout from '@/components/CvAbout.vue'
import CvEducation from '@/components/CvEducation.vue'
import CvWorkExperience from '@/components/CvWorkExperience.vue'
import CvSkills from '@/components/CvSkills.vue'
import CvInterests from '@/components/CvInterests.vue'
import CvReferences from '@/components/CvReferences.vue'
import CvContact from '@/components/CvContact.vue'
import CvFooter from '@/components/CvFooter.vue'

const info = cvData.personalInfo

// The browser prints the page through the @media print rules in style.css ("Save as PDF");
// the document title becomes the default file name
const printCV = () => {
  const title = document.title
  document.title = `curriculum_vitae_${info.firstName}_${info.lastName}`.toLowerCase()
  window.addEventListener('afterprint', () => (document.title = title), { once: true })
  window.print()
}
</script>

<template>
  <div id="top">
    <div class="cv-bg"></div>
    <div class="cv-bg-overlay"></div>
    <CvNav />
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-xl-8 offset-xl-4 position-relative">
          <CvHeader @download="printCV" />
          <main id="cv-content" class="cv-card">
            <CvAbout />
            <CvEducation />
            <CvWorkExperience />
            <CvSkills />
            <CvInterests />
            <CvReferences />
            <CvContact />
            <CvFooter />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
