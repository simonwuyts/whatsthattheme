import { ColorResult } from '@/composables/use-colors'
import { ThemeResult, ThemeScore } from '@/composables/use-themes'

interface ThemeScores {
  [key: string]: ThemeScore
}

export function compareThemes(
  targetColors: ColorResult[],
  themes: ThemeResult[]
) {
  const themeScores: ThemeScores = {}
  let themeScoresSorted: ThemeScore[] = []

  // Loop each image color
  targetColors.forEach(color => {
    const targetColor = color.color

    // Loop each theme
    themes.forEach(theme => {
      const identifier = `${theme.publisher}${theme.extension}${theme.themeName}`
      let themeScore = themeScores[identifier]?.score || 0

      // Loop each theme color
      theme.colors.forEach(themeColor => {
        if (
          themeColor[0] === targetColor[0] &&
          themeColor[1] === targetColor[1] &&
          themeColor[2] === targetColor[2]
        ) {
          themeScore++
        }
      })

      // Save theme score
      themeScores[identifier] = {
        ...theme,
        score: themeScore
      }
    })
  })

  themeScoresSorted = Object.values(themeScores)
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)

  return themeScoresSorted
}
