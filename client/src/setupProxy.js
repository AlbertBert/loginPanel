// const proxy = require('http-proxy-middleware')
const { createProxyMiddleware } = require('http-proxy-middleware')


module.exports = function (app) {
  app.use('/user/*', createProxyMiddleware( {
    target: 'http://localhost:3002',
    changeOrigin: true,
    // pathRewrite: {
    //   "^/user/register": ""
    // }
  }))
}