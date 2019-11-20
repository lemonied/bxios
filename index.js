require('@babel/register')()
const glob = require('glob')
const path = require('path')

glob(path.resolve(__dirname, 'test', '*.test.js'), (err, files) => {
  files.forEach(require)
})
