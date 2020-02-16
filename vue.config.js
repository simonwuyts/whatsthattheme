module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.output.globalObject('this')
  }
}
