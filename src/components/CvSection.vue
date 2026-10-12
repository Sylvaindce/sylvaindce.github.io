<script setup lang="ts">
defineProps<{ id: string; title?: string }>()
</script>

<template>
  <section :id="id" class="cv-section">
    <div class="col-lg-10 mx-auto px-3 px-md-4 py-5">
      <h2 v-if="title" class="cv-title">{{ title }}</h2>
      <slot />
    </div>
  </section>
</template>
