<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { Offcanvas } from 'bootstrap'
import { useLanguage } from '@/composables/useLanguage'

const { l } = useLanguage()
const items = computed(() => [
  { id: 'about', label: l.value.about_txt },
  { id: 'education', label: l.value.education_txt },
  { id: 'experience', label: l.value.work_experience_txt },
  { id: 'skills', label: l.value.skills_txt },
  { id: 'interests', label: l.value.interest_txt },
  { id: 'reference', label: l.value.reference_txt },
  { id: 'contact', label: l.value.contact_txt }
])

const nav = ref<HTMLElement>()

// Highlight the section crossing the middle of the viewport
const active = ref('about')
let observer: IntersectionObserver | undefined
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (active.value = e.target.id)),
    { rootMargin: '-45% 0px -55% 0px' }
  )
  items.value.forEach((i) => {
    const el = document.getElementById(i.id)
    if (el) observer!.observe(el)
  })
})
onBeforeUnmount(() => observer?.disconnect())

// data-bs-dismiss would preventDefault the anchor, so close the menu ourselves and scroll once it is hidden
const go = (id: string) => {
  const target = document.getElementById(id)
  const el = nav.value
  const offcanvas = el && el.classList.contains('show') ? Offcanvas.getInstance(el) : null
  if (offcanvas) {
    el!.addEventListener('hidden.bs.offcanvas', () => target?.scrollIntoView(), { once: true })
    offcanvas.hide()
  } else {
    target?.scrollIntoView()
  }
}
</script>

<template>
  <nav id="cvNav" ref="nav" class="cv-nav offcanvas-xl offcanvas-start" tabindex="-1">
    <div class="offcanvas-header d-xl-none">
      <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="offcanvas"
        data-bs-target="#cvNav" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <ul class="nav flex-column">
        <li v-for="item in items" :key="item.id" class="nav-item">
          <a :href="'#' + item.id" class="nav-link" :class="{ active: active === item.id }"
            :aria-current="active === item.id ? 'true' : undefined" @click.prevent="go(item.id)">{{ item.label }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
