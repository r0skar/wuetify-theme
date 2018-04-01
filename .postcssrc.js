const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import')({
      path: ['./node_modules/', './src/assets/css/'],
      resolve: id => {
        if (id.includes('~')) {
          return id.replace('~', path.join(__dirname, './'))
        }
        if (id.includes('@')) {
          return id.replace('@', path.join(__dirname, './src'))
        }
        return id
      }
    }),
    require('tailwindcss')('./.tailwindrc.js'),
    require('postcss-responsive-type')(),
    require('postcss-cssnext')(),
    require('postcss-nested')()
  ]
}
