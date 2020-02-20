export interface Extension {
  extensionId: string
  displayName: string
  extensionName: string
  publisher: {
    publisherName: string
    displayName: string
  }
  versions: {
    files: {
      assetType: string
      source: string
    }[]
  }[]
}

export interface ThemeDefinition {
  name: string
  tokenColors: {
    settings: {
      [key: string]: string
    }
  }[]
  colors: {}
}

export interface ThemeContribution {
  label: string
  uiTheme: string
  path: string
}

export interface ThemeDetails {
  name: string
  colors: number[][]
}
