import { Extension, ThemeDefinition, ThemeDetails } from './types'
import fetch, { Response } from 'node-fetch'
import * as unzip from 'unzip-stream'
import stripComments from 'strip-json-comments'
import * as path from 'path'
import Color from 'color'
import { emptyDir, readFile } from 'fs-extra'

const EXTENSION_PACKAGE_KEY = 'Microsoft.VisualStudio.Services.VSIXPackage'
const EXTENSION_ICON_KEY = 'Microsoft.VisualStudio.Services.Icons.Small'
const TEMP_PATH = path.join(process.cwd(), '.tmp')

function stripTrailingCommas(str: string) {
  return str.replace(/,(?=\s*?[}\]])/g, '')
}

async function readJSON(filePath: string) {
  try {
    const buffer = await readFile(filePath)
    const text = stripTrailingCommas(stripComments(buffer.toString()))
    return JSON.parse(text)
  } catch (err) {
    throw new Error(`Invalid json at ${filePath}: ${err.message}`)
  }
}

function findPropValue(key: string, extension: Extension) {
  const prop = extension.versions[0].files.find(file => file.assetType === key)
  return prop ? prop.source : null
}

export async function getExtensionDetails(extension: Extension) {
  const packageUrl = findPropValue(EXTENSION_PACKAGE_KEY, extension)
  const iconUrl = findPropValue(EXTENSION_ICON_KEY, extension)

  // Fetch theme package
  let packageFile: Response
  if (packageUrl) {
    try {
      packageFile = await fetch(packageUrl)

      // Unzip theme package
      await new Promise((resolve, reject) => {
        packageFile.body
          .pipe(unzip.Extract({ path: TEMP_PATH }))
          .on('close', resolve)
          .on('error', () => {
            reject()
          })
      })
    } catch (e) {
      console.log(
        `Something went wrong while fetching and unzipping the theme package`
      )
    }
  } else {
    console.log('No package url')
  }

  const extensionThemes: ThemeDetails[] = []

  try {
    // Read package.json
    const packageOptions = await readJSON(
      path.join(TEMP_PATH, 'extension/package.json')
    )

    if (packageOptions?.contributes?.themes) {
      for (const theme of packageOptions.contributes.themes) {
        const themeColors: unknown[] = []
        if (theme.path.match(/(.+)\.json/)) {
          const themeDefinition: ThemeDefinition = await readJSON(
            path.join(TEMP_PATH, 'extension', theme.path)
          )
          if (Array.isArray(themeDefinition.tokenColors)) {
            themeDefinition.tokenColors.forEach(token => {
              if (token.settings?.foreground) {
                // Convert to rgb(a) array
                const colorArray = Color(token.settings.foreground)
                  .rgb()
                  .array()
                // Add to results
                themeColors.push(colorArray)
              }
            })
          }
          extensionThemes.push({
            name: theme.label,
            colors: themeColors
          })
        }
      }
    }
  } catch (e) {
    console.log(`Something went wrong while extracting the theme colors.`)
  }

  // Clean tmp folder
  try {
    await emptyDir(TEMP_PATH)
  } catch (e) {
    console.log(`Something went wrong while cleaning the temporary folder.`)
  }

  // Return result
  return {
    extensionThemes,
    iconUrl
  }
}
