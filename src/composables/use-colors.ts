import analyzeColors from 'rgbaster/dist'

export interface ColorResult {
  color: string
  count: number
}

export const useColors = (image: File) => {
  let result: ColorResult[] = []

  const reader = new FileReader()
  reader.readAsDataURL(image)
  reader.onload = async () => {
    if (typeof reader.result === 'string') {
      result = await analyzeColors(reader.result)
    }
  }

  return result
}
