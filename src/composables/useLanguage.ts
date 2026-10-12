import { computed, ref } from 'vue'
import labels from '@/data/lang.json'

export type Language = 'en' | 'fr'

// Same contract as the static site: ?lang=en|fr picks the language
const initial = new URLSearchParams(window.location.search).get('lang')?.toLowerCase()
const currentLanguage = ref<Language>(initial === 'fr' ? 'fr' : 'en')

export function useLanguage() {
  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang
    document.documentElement.lang = lang
    const url = new URL(window.location.href)
    url.searchParams.set('lang', lang)
    window.history.replaceState(null, '', url)
  }

  const t = (text: string | { en: string; fr: string }): string => {
    if (typeof text === 'string') return text
    return text[currentLanguage.value]
  }

  // UI labels (data/lang.json) for the current language
  const l = computed(() => labels[currentLanguage.value])

  return {
    currentLanguage,
    l,
    setLanguage,
    t
  }
}
