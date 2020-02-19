import registerPromiseWorker from 'promise-worker/register'
import { ColorResult } from '@/composables/use-colors'
import { ThemeResult, ThemeScore } from '@/composables/use-themes'

interface Message {
  type: string
  message: {
    targetColors: ColorResult[]
    themes: ThemeResult[]
  }
}

interface ThemeScores {
  [key: string]: ThemeScore
}

function compareThemes(targetColors: ColorResult[], themes: ThemeResult[]) {
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
      theme.colors.forEach(themeColor => {
        if (themeColor.toLowerCase() === targetColor.toLowerCase()) {
          themeScore++
        }
      })

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
    .slice(0, 10)

  return themeScoresSorted
}

registerPromiseWorker((message: Message) => {
  if (message.type === 'message') {
    const themeScoresSorted = compareThemes(
      message.message.targetColors,
      message.message.themes
    )
    return {
      themeScoresSorted
    }
  }
})
