const express = require('express')
const server = express()
const serverBundle=require('./dist/vue-ssr-server-bundle.json')
const clientManifest=require('./dist/vue-ssr-client-manifest.json')
const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle,{
   runInNewContext: false, 
   template: require('fs').readFileSync('./src/index.template.html', 'utf-8'),
   clientManifest 
})

//const createApp = require('./dist/main.server.js').default
server.use('/dist', express.static("./dist"))

//核心逻辑
server.get('*', (req, res) => {
  const context = {
    title: 'hello',
    meta: `
    <meta charset="utf-8">
  ` ,
    url:req.url
  };
  //createApp(context).then(app => {
    //renderer.renderToString(vm[, context], callback)
    renderer.renderToString(context,(err, html) => {
      if (err) {
        res.status(500).end('Internal Server Error')
        return
      }
      res.end(html)
    })
  //})

})
server.listen(8080)
