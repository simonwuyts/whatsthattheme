import { Extension } from './types'
import fetch, { Response } from 'node-fetch'
import * as unzip from 'unzip-stream'
import stripComments from 'strip-json-comments'
import * as path from 'path'
import { emptyDir, readFile } from 'fs-extra'
import { ThemeDefinition } from './types'

const EXTENSION_PACKAGE_KEY = 'Microsoft.VisualStudio.Services.VSIXPackage'
const EXTENSION_README_KEY = 'Microsoft.VisualStudio.Services.Content.Details'
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
  const readmeUrl = findPropValue(EXTENSION_README_KEY, extension)
  const iconUrl = findPropValue(EXTENSION_ICON_KEY, extension)

  // Fetch theme package
  let packageFile: Response
  if (packageUrl) {
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
  } else {
    console.log('No package url')
  }

  // Read package.json
  const packageOptions = await readJSON(
    path.join(TEMP_PATH, 'extension/package.json')
  )

  const themeColors: string[] = []

  if (packageOptions.contributes && packageOptions.contributes.themes) {
    for (const theme of packageOptions?.contributes?.themes) {
      if (theme.path.match(/(.+)\.json/)) {
        const themeDefinition: ThemeDefinition = await readJSON(
          path.join(TEMP_PATH, 'extension', theme.path)
        )
        if (Array.isArray(themeDefinition.tokenColors)) {
          themeDefinition.tokenColors.forEach(token => {
            if (token.settings.foreground) {
              themeColors.push(token.settings.foreground)
            }
          })
        }
      }
    }
  }

  // Clean tmp folder
  await emptyDir(TEMP_PATH)

  // Return result
  return {
    themeColors,
    readmeUrl,
    iconUrl
  }
}
