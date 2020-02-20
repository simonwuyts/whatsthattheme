import { Extension, ThemeResult } from './types'
import { fetchExtensionPage } from './fetch-extension-page'
import { getExtensionDetails } from './get-extension-details'
import { writeFile, createFile } from 'fs-extra'
import * as path from 'path'

const RESULTS_FILE_LOCATION = path.join(
  process.cwd(),
  '../public/data/themes.json'
)

export async function collectExtensions() {
  // Collect and combine all results
  let activePage = 1
  let resultsAvailable = true
  const themes: ThemeResult[] = []

  while (activePage < 2) {
    // while (resultsAvailable) {
    try {
      const results = await fetchExtensionPage(activePage)
      console.log(`Page ${activePage} was fetched.`)
      const pageExtensions: Extension[] = results.results[0].extensions

      if (pageExtensions.length > 0) {
        // Fetch details
        for (const [i, extension] of Object.entries(pageExtensions)) {
          try {
            const extensionDetails = await getExtensionDetails(extension)
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

            console.log(
              `Extension ${parseInt(i) + 1} (${
                extension.displayName
              }) was processed.`
            )
          } catch (e) {
            console.log(
              `Something went wrong with extension ${parseInt(i) + 1}`
            )
          }
        }
        activePage++
      } else {
        resultsAvailable = false
      }
    } catch (e) {
      console.log(`Something went wrong with page ${activePage}`)
    }
  }

  const filteredExtensions = themes.filter(theme => theme.colors.length > 0)

  // Save results
  try {
    await createFile(RESULTS_FILE_LOCATION)
    await writeFile(RESULTS_FILE_LOCATION, JSON.stringify(filteredExtensions))
  } catch (e) {
    console.log(`Something went wrong while saving the results.`)
  }
}
