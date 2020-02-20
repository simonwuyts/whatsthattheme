import { Extension } from './types'
import { ThemeResult } from '../../src/composables/use-themes'
import { fetchExtensionPage } from './fetch-extension-page'
import { getExtensionThemes } from './get-extension-themes'
import { writeFile, createFile } from 'fs-extra'
import ProgressBar from '@open-tech-world/cli-progress-bar'
import * as path from 'path'

const RESULTS_FILE_LOCATION = path.join(
  process.cwd(),
  '../public/data/themes.json'
)

const errors = []

export async function collectExtensions() {
  // Collect and combine all results
  let activePage = 1
  let resultsAvailable = true
  const themes: ThemeResult[] = []

  //while (activePage < 2) {
  while (resultsAvailable) {
    try {
      const results = await fetchExtensionPage(activePage)
      console.log(`Processing page ${activePage} extensions...`)
      const pageExtensions: Extension[] = results.results[0].extensions

      if (pageExtensions.length > 0) {
        // Set progress bar
        const progressBar = new ProgressBar()
        progressBar.run('', 0, pageExtensions.length)
        // Fetch details
        for (const [i, extension] of Object.entries(pageExtensions)) {
          try {
            const extensionDetails = await getExtensionThemes(extension)
            extensionDetails.extensionThemes.forEach(theme => {
              themes.push({
                extension: extension.extensionName,
                extensionName: extension.displayName,
                publisher: extension.publisher.publisherName,
                publisherName: extension.publisher.displayName,
                icon: extensionDetails.iconUrl,
                themeName: theme.name,
                colors: theme.colors
              })
            })

            progressBar.run('', parseInt(i) + 1, pageExtensions.length)
          } catch (e) {
            errors.push(e)
          }
        }
        progressBar.stop(true)
        activePage++
      } else {
        resultsAvailable = false
      }
    } catch (e) {
      errors.push(e)
    }
  }

  const filteredThemes = themes.filter(theme => theme.colors.length > 0)

  // Save results
  try {
    await createFile(RESULTS_FILE_LOCATION)
    await writeFile(RESULTS_FILE_LOCATION, JSON.stringify(filteredThemes))
    console.log(`${filteredThemes.length} were processed.`)
  } catch (e) {
    errors.push(e)
  }
}
