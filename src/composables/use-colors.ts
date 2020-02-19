import analyzeColors from 'rgbaster'
import Color from 'color'
import { readFileAsDataURL } from './utils'

export interface ColorResult {
  color: string
  count: number
}

export async function getImageColors(image?: File) {
  let results: ColorResult[] = []
  if (image) {
    const imageDataURL = await readFileAsDataURL(image)
    if (typeof imageDataURL === 'string') {
      results = await analyzeColors(imageDataURL)
      results = results.slice(0, 1000).map((color: ColorResult) => {
        return {
          count: color.count,
          color: Color(color.color)
            .hex()
            .toString()
        }
      })
    }
  }
  return Object.freeze(results)
}
