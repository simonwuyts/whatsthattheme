import PromiseWorker from 'promise-worker'
import CompareWorker from 'worker-loader!./compare-worker'
import ColorWorker from 'worker-loader!./color-worker'

const compareWorker = new PromiseWorker(new CompareWorker())
const colorWorker = new PromiseWorker(new ColorWorker())

const compareThemes = (message: unknown) =>
  compareWorker.postMessage({
    type: 'message',
    message
  })

const extractColors = (message: unknown) => {
  colorWorker.postMessage({
    type: 'message',
    message
  })
}

export default {
  compareThemes,
  extractColors
}
