import themes from '../../public/data/themes.json'

console.log(`${themes.length} extensions processed.`)

const counts: number[] = themes
  .map(theme => theme.colors.length)
  .sort((a, b) => b - a)

console.log(counts)
