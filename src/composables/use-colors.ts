import analyzeColors from 'rgbaster'
import Color from 'color'
import { ref, Ref } from '@vue/composition-api'
import { readFileAsDataURL } from './utils'
import './use-composition-api'

export interface ColorResult {
  color: string
  count: number
}

const imageColors: Ref<ColorResult[]> = ref([])

export function useColors() {
  async function getImageColors(image: File) {
    let results = []
    const imageDataURL = await readFileAsDataURL(image)
    if (typeof imageDataURL === 'string') {
      results = await analyzeColors(imageDataURL)
      results = results
        .slice(0, 5000)
        .filter((color: ColorResult) => {
          const colorObject: Color = Color(color.color)
          return (
            colorObject.luminosity() > 0.2 && colorObject.luminosity() < 0.7
          )
        })
        .map((color: ColorResult) => {
          return {
            count: color.count,
            color: Color(color.color)
              .hex()
              .toString()
          }
        })
    }
    imageColors.value = results
  }

  return {
    imageColors,
    getImageColors
  }
}
