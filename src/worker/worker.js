import registerPromiseWorker from 'promise-worker/register'

registerPromiseWorker(message => {
  if (message.type === 'message') {
    const themeScores = {}
    let themeScoresSorted = []
    const { targetColors, themes } = message.message

    targetColors.forEach(color => {
      const targetColor = color.color
      themes.forEach(theme => {
        theme.colors.forEach(themeColor => {
          if (themeColor === targetColor) {
            if (themeScores[theme.name]) {
              themeScores[theme.name] = themeScores[theme.name] + 1
            } else themeScores[theme.name] = 1
          }
        })
      })
    })

    themeScoresSorted = Object.entries(themeScores)
      .sort((a, b) => b[1] - a[1])
      .map(result => {
        return {
          id: result[0],
          score: result[1]
        }
      })

    return {
      themeScoresSorted
    }
  }
})
