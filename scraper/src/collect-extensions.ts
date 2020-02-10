import { fetchExtensionPage } from './fetch-extension-page'
import { getExtensionDetails } from './get-extension-details'
import { Extension, ThemeResult } from './types'
import { writeFile, createFile } from 'fs-extra'
import * as path from 'path'

const RESULTS_FILE_LOCATION = path.join(process.cwd(), 'results/themes.json')

export async function collectExtensions() {
  // Collect and combine all results
  let activePage = 1
  let resultsAvailable = true
  const extensions: ThemeResult[] = []

  while (activePage < 2) {
    const results = await fetchExtensionPage(activePage)
    console.log(`Page ${activePage} was fetched.`)
    const pageExtensions: Extension[] = results.results[0].extensions

    if (pageExtensions.length > 0) {
      // Fetch details
      for (const [i, extension] of Object.entries(pageExtensions)) {
        const extensionDetails = await getExtensionDetails(extension)
        extensions.push({
          name: extension.displayName,
          description: extension.shortDescription,
          readme: extensionDetails.readmeUrl,
          icon: extensionDetails.iconUrl,
          colors: extensionDetails.themeColors
        })
        console.log(`Extension ${parseInt(i) + 1} was processed.`)
      }
      activePage++
    } else {
      resultsAvailable = false
    }
  }

  // Save results
  await createFile(RESULTS_FILE_LOCATION)
  await writeFile(RESULTS_FILE_LOCATION, JSON.stringify(extensions))
}
