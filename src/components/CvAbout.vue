<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Typed from 'typed.js'
import cvData from '@/data/cv.json'
import { useLanguage } from '@/composables/useLanguage'
import CvSection from '@/components/CvSection.vue'

const { currentLanguage, l, t } = useLanguage()

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const info = cvData.personalInfo
const age = new Date().getFullYear() - info.birthYear

// Typing animation of the hero line; restarted when the language changes
const typedEl = ref<HTMLElement>()
let typed: Typed | undefined
const startTyping = () => {
  typed?.destroy()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedEl.value!.innerHTML = t(info.shortDescription)
    return
  }
  typed = new Typed(typedEl.value!, {
    strings: ['^2100&nbsp;', t(info.shortDescription)],
    typeSpeed: 75,
    backDelay: 750,
    contentType: 'html',
    loop: false
  })
}
// Print the full sentence, not whatever the typing animation has reached
const showFullText = () => {
  typed?.destroy()
  typedEl.value!.innerHTML = t(info.shortDescription)
}
onMounted(() => {
  startTyping()
  window.addEventListener('beforeprint', showFullText)
  window.addEventListener('afterprint', startTyping)
})
watch(currentLanguage, startTyping)
onBeforeUnmount(() => {
  typed?.destroy()
  window.removeEventListener('beforeprint', showFullText)
  window.removeEventListener('afterprint', startTyping)
})
</script>

<template>
  <CvSection id="about">
    <img :src="'/' + info.picture" alt="" class="cv-avatar rounded-circle d-block" />
    <h1>{{ l.hello_txt }} <span ref="typedEl"></span></h1>
    <h6>{{ l.about_txt }}</h6>
    <p v-html="t(info.description)" class="pb-4"></p>

    <div class="row gy-4 mt-3">
      <div class="col-sm-6">
        <h6>{{ l.lang_txt }}</h6>
        <ul class="cv-list list-unstyled">
          <li v-for="(lang, i) in cvData.languages" :key="i" class="d-flex justify-content-between">
            {{ capitalize(t(lang.name)) }} <span>{{ t(lang.level) }}</span>
          </li>
        </ul>
      </div>
      <div class="col-sm-6 text-sm-end">
        <h6>{{ l.more_about_txt }}</h6>
        <ul class="cv-list list-unstyled ms-sm-auto text-start">
          <li class="d-flex justify-content-between align-items-baseline">
            {{ age }} {{ currentLanguage === 'en' ? 'years old' : 'ans' }} <i class="fa-solid fa-id-badge"></i>
          </li>
          <li class="d-flex justify-content-between align-items-baseline">
            {{ info.address }} <i class="fa-solid fa-location-dot"></i>
          </li>
          <li class="d-flex justify-content-between align-items-baseline">
            {{ t(info.driverLicence) }} <i class="fa-solid fa-car"></i>
          </li>
        </ul>
      </div>
    </div>
  </CvSection>
</template>
