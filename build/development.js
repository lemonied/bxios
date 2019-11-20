const webpack = require('webpack')
const express = require('express')
const {resolve} = require('path')
const conf = require('./webpack.base.conf')
const merge = require('webpack-merge')
const devConf = require('./webpack.dev.conf')
const proxy = require('express-http-proxy')

const app = express()

app.use('/', express.static(resolve(__dirname, '../examples')))
app.use('/dist', express.static(resolve(__dirname, '../dist')))
app.use('/service', proxy('https://zghnrc.gov.cn', {
  proxyReqOptDecorator(proxyReq) {
    proxyReq.headers.referer = 'https://zghnrc.gov.cn'
    proxyReq.headers.origin = 'https://zghnrc.gov.cn'
    return proxyReq
  },
  proxyReqPathResolver(req) {
    return Promise.resolve('/service' + req.url)
  }
}))

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
