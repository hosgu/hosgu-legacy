const path = require('path')

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false
    }

    // Aliases
    config.resolve.alias['~'] = path.resolve(__dirname, './src')
    config.resolve.alias['~app'] = path.resolve(__dirname, './src/app')
    config.resolve.alias['~appComponents'] = path.resolve(__dirname, './src/app/components')
    config.resolve.alias['~components'] = path.resolve(__dirname, './src/components')
    config.resolve.alias['~contexts'] = path.resolve(__dirname, './src/app/contexts')
    config.resolve.alias['~i18n'] = path.resolve(__dirname, './src/app/i18n')
    config.resolve.alias['~services'] = path.resolve(__dirname, './src/app/services')
    config.resolve.alias['~types'] = path.resolve(__dirname, './src/types')

    return config
  }
}
