const fs = require('fs')
const path = require('path')
const glob = require('glob-all')
const DotEnvWebPackPlugin = require('dotenv-webpack')
const resolvePath = dir => path.join(__dirname, '.', dir)
const isProduction = process.env.NODE_ENV === 'production'
const CleanWebpackPlugin = require('clean-webpack-plugin')
const PurgeCssWhitelister = require('purgecss-whitelister')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurgeCssWebpackPlugin = require('purgecss-webpack-plugin')
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/**
 * Helper to enable Tailwind for PurgeCssWebpackPlugin.
 * https://github.com/FullHuman/purgecss#extractor
 */
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:/]+/g) || []
  }
}

/**
 * Entry files.
 */
const entry = {
  client: resolvePath('src/client.js'),
  server: resolvePath('src/server.js')
}

/**
 * Output files.
 */
const output = {
  filename: '[name].js',
  publicPath: '/dist/',
  path: resolvePath('dist')
}

/**
 * Resolve paths.
 */
const resolve = {
  alias: {
    '~': resolvePath('/'),
    '@': resolvePath('src'),
    vue$: 'vue/dist/vue.esm.js'
  },
  extensions: ['*', '.js', '.vue']
}

/**
 * Generate loader rules.
 */
const generateRules = mode => [
  {
    enforce: 'pre',
    test: /\.(js|vue)$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      extractCSS: isProduction && mode === 'client'
    }
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  }
]

/**
 * Generate plugins.
 */
const generatePlugins = mode => {
  let plugins = [new FriendlyErrorsWebpackPlugin(), new DotEnvWebPackPlugin(), new StyleLintWebpackPlugin()]

  if (isProduction) {
    plugins.push(
      new HardSourceWebpackPlugin(),
      new CleanWebpackPlugin([resolvePath('dist')], { verbose: false }),
      new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerPort: mode === 'server' ? '8888' : '9999' })
    )

    if (mode === 'client') {
      plugins.push(
        // TODO: Replace me with mini-css-extract when vue-loader supports it
        // https://github.com/vuejs/vue-loader/issues/1196
        new ExtractTextPlugin('client.css'),
        new PurgeCssWebpackPlugin({
          whitelist: PurgeCssWhitelister([
            './node_modules/tailwindcss/dist/preflight.css',
            './node_modules/nprogress/nprogress.css',
            './src/assets/css/**/*.css'
          ]),
          paths: glob.sync([resolvePath('src/**/*.vue'), resolvePath('index.html'), resolvePath('src/server.js')]),
          extractors: [
            {
              extractor: TailwindExtractor,
              extensions: ['html', 'js', 'vue']
            }
          ]
        })
      )
    }
  }

  return plugins
}

/**
 * Basic build for server and client.
 */
const basicBuild = mode => {
  return {
    output,
    resolve,
    stats: 'errors-only',
    module: { rules: generateRules(mode) },
    plugins: generatePlugins(mode)
  }
}

/**
 * Server build.
 */
const serverBuild = Object.assign({}, basicBuild('server'), {
  target: 'node',
  entry: { server: resolvePath('src/server.js') }
})

/**
 * Client build.
 */

const clientBuild = Object.assign({}, basicBuild('client'), {
  target: 'web',
  entry: { client: resolvePath('src/client.js') },
  devServer: isProduction
    ? {}
    : {
        historyApiFallback: true,
        overlay: true,
        stats: 'errors-only',
        https: true
      }
})

/**
 * Build server only for production mode.
 */
module.exports = process.env.NODE_ENV === 'production' ? [serverBuild, clientBuild] : clientBuild
