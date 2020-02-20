import analyzeColors from 'rgbaster'
import Color from 'color'
import { readFileAsDataURL } from './utils'

export interface ColorResult {
  color: number[]
  count: number
}

export async function getImageColors(image?: File) {
  let results: ColorResult[] = []
  if (image) {
    const imageDataURL = await readFileAsDataURL(image)
    if (typeof imageDataURL === 'string') {
      results = await analyzeColors(imageDataURL)
      results = results.slice(0, 1500).map((color: ColorResult) => {
        return {
          count: color.count,
          color: Color(color.color)
            .rgb()
            .array()
        }
      })
      // results.forEach(color => {
      //   console.log(`%c${color.color}`, `background: rgb(${color.color[0]}, ${color.color[1]}, ${color.color[2]})`)
      // })
    }
  }
  return Object.freeze(results)
}
