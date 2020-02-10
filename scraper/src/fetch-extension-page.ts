import axios from 'axios'

const EXTENSIONS_API_ENDPOINT =
  'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery'

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
        pageSize: 100,
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

  // Fetch API endpoint
  const { data: extensions } = await axios.post(EXTENSIONS_API_ENDPOINT, body, {
    headers
  })

  console.log(JSON.stringify(extensions, null, 2))
  return extensions
}
