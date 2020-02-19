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
      const currentTheme = theme
      let themeScore = themeScores[currentTheme.id]?.score || 0

      // Loop each theme color
      if (theme.colors.length < 6000) {
        theme.colors.forEach(themeColor => {
          if (themeColor.toLowerCase() === targetColor.toLowerCase()) {
            themeScore++
          }
        })
      }

      // Save theme score
      themeScores[currentTheme.id] = {
        ...currentTheme,
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
