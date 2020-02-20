import fetch from 'node-fetch'

const EXTENSIONS_API_ENDPOINT =
  'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery'
const EXTENSIONS_PER_PAGE = 100

const errors = []

export async function fetchExtensionPage(pageNumber: number) {
  // Set search query
  const body = {
    filters: [
      {
        criteria: [
          { filterType: 8, value: 'Microsoft.VisualStudio.Code' },
          { filterType: 10, value: 'target:"Microsoft.VisualStudio.Code"' },
          { filterType: 12, value: '5122' },
          { filterType: 5, value: 'Themes' }
        ],
        direction: 2,
        pageSize: EXTENSIONS_PER_PAGE,
        pageNumber,
        sortBy: 4,
        sortOrder: 0
      }
    ],
    flags: 914
  }

  // Set request headers
  const headers = {
    Accept: 'application/json;api-version=3.0-preview.1',
    'Content-Type': 'application/json',
    'User-Agent': ''
  }

  let extensions

  try {
    // Fetch API endpoint
    const res = await fetch(EXTENSIONS_API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    })

    extensions = await res.json()
  } catch (e) {
    errors.push(e)
  }
  return extensions
}
