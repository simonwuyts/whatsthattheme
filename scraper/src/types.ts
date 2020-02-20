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
  extension: string
  extensionName: string
  publisher: string
  publisherName: string
  themeName: string
  icon?: string
  colors?: unknown[]
}

export interface ThemeDetails {
  name: string
  colors: unknown[]
}
