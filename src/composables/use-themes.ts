import { ref, Ref } from '@vue/composition-api'
import { ColorResult } from '@/composables/use-colors'
import axios from 'axios/dist/axios'
import compareWorker from '@/worker/index'
import './use-composition-api'

export interface ThemeResult {
  id: string
  name: string
  description: string
  icon?: string
  colors: string[]
  readme?: string
}

export interface ThemeScore {
  id: string
  score: number
}

const themes: Ref<ThemeResult[]> = ref([])
const themeScoresSorted: Ref<ThemeScore[]> = ref([])
const isComparing: Ref<boolean> = ref(false)

export function useThemes() {
  async function getThemes() {
    const result = await axios.get('/data/themes.json')
    themes.value = result.data
  }

  async function compareColors(colors: ColorResult[]) {
    if (colors.length > 0 && themes.value.length > 0) {
      isComparing.value = true
      const result = await compareWorker.send({
        targetColors: colors,
        themes: themes.value
      })
      themeScoresSorted.value = result.themeScoresSorted
      isComparing.value = false
    }
  }

  return {
    themes,
    themeScoresSorted,
    getThemes,
    compareColors,
    isComparing
  }
}
