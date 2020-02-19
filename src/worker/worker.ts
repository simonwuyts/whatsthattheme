import registerPromiseWorker from 'promise-worker/register'
import { ColorResult } from '@/composables/use-colors'
import { ThemeResult } from '@/composables/use-themes'
import { compareThemes } from './compare-themes'

interface Message {
  type: string
  message: {
    targetColors: ColorResult[]
    themes: ThemeResult[]
  }
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
