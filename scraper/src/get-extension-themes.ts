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

const errors = []

function stripTrailingCommas(str: string) {
  return str.replace(/,(?=\s*?[}\]])/g, '')
}

async function readJSON(filePath: string) {
  try {
    const buffer = await readFile(filePath)
    const text = stripTrailingCommas(stripComments(buffer.toString()))
    return JSON.parse(text)
  } catch (e) {
    errors.push(e)
  }
}

function findPropValue(key: string, extension: Extension) {
  const prop = extension.versions[0].files.find(file => file.assetType === key)
  return prop ? prop.source : null
}

export async function getExtensionThemes(extension: Extension) {
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
      errors.push(e)
    }
  }

  const extensionThemes: ThemeDetails[] = []

  try {
    // Read package.json
    const packageOptions = await readJSON(
      path.join(TEMP_PATH, 'extension/package.json')
    )

    // Loop over themes array
    if (packageOptions?.contributes?.themes) {
      for (const theme of packageOptions.contributes.themes) {
        if (theme.path.match(/(.+)\.json/)) {
          // Collect theme colors from theme definition file
          const themeColors: number[][] = []
          const themeDefinition: ThemeDefinition = await readJSON(
            path.join(TEMP_PATH, 'extension', theme.path)
          )
          if (Array.isArray(themeDefinition.tokenColors)) {
            const includeTokens = ['foreground', 'background']
            themeDefinition.tokenColors.forEach(token => {
              includeTokens.forEach(tokenName => {
                if (token.settings[tokenName]) {
                  // Convert to rgb(a) array
                  const colorArray = Color(token.settings[tokenName])
                    .rgb()
                    .array()
                  // Add to results
                  themeColors.push(colorArray)
                }
              })
            })
          }
          if (themeDefinition.colors) {
            Object.values(themeDefinition.colors).forEach(color => {
              // Convert to rgb(a) array
              const colorArray = Color(color)
                .rgb()
                .array()
              // Add to results
              themeColors.push(colorArray)
            })
          }
          extensionThemes.push({
            name: themeDefinition.name,
            colors: themeColors
          })
        }
      }
    }
  } catch (e) {
    errors.push(e)
  }

  // Clean tmp folder
  try {
    await emptyDir(TEMP_PATH)
  } catch (e) {
    errors.push(e)
  }

  // Return result
  return {
    extensionThemes,
    iconUrl
  }
}
