const webpack = require('webpack')
const express = require('express')
const {resolve} = require('path')
const conf = require('./webpack.base.conf')
const merge = require('webpack-merge')
const devConf = require('./webpack.dev.conf')

const app = express()

app.use('/', express.static(resolve(__dirname, '../examples')))
app.use('/dist', express.static(resolve(__dirname, '../dist')))

const PORT = 7777
app.listen(PORT, () => {
  console.log(`server is running at http://127.0.0.1:${PORT}/`)
})

const compiler = webpack(merge(conf, devConf))
compiler.watch({
  aggregateTimeout: 300
}, (err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')
})
