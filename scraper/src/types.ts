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
  tokenColors: {
    settings: {
      foreground: string
    }
  }[]
}

export interface ThemeContribution {
  label: string
  uiTheme: string
  path: string
}

export interface ThemeResult {
  id: string
  extension: string
  extensionName: string
  publisher: string
  publisherName: string
  icon?: string
  colors?: string[]
}
