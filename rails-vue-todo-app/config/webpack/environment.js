const { environment } = require('@rails/webpacker')
const vue =  require('./loaders/vue')

environment.loaders.append('vue', vue)

const cssLoaderOptions = {
  modules: true,
  localIdentName: '[name]__[local]__[hash:base64:5]'
}

const cssLoader = environment.loaders.get('sass').use.find(el => el.loader === 'css-loader')
cssLoader.options = Object.assign({}, cssLoader.options, cssLoaderOptions)

module.exports = environment
