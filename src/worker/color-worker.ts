import registerPromiseWorker from 'promise-worker/register'
import { extractColors } from './extract-colors'

interface Message {
  type: string
  message: {
    imageDataURL: string
  }
}

registerPromiseWorker((message: Message) => {
  if (message.type === 'message') {
    return extractColors(message.message.imageDataURL)
  }
})
