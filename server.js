// Require the framework and instantiate it
const app = require('fastify')()
const port = process.env.port || 3000
const fs = require('fs')
const path = require('path')
const serveStatic = require('serve-static')
const serialize = require('serialize-javascript')
const {
  createBundleRenderer
} = require('vue-server-renderer')
const isProd = typeof process.env.NODE_ENV !== 'undefined' && (process.env.NODE_ENV === 'production')

let renderer

const indexHTML = (() => {
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
})()

if (isProd) {
  app.use('/', serveStatic(path.join(__dirname, '/dist')))
} else {
  app.use('/dist', serveStatic(path.join(__dirname, '/dist')))
}

if (isProd) {
  const bundlePath = path.resolve(__dirname, './dist/server/main.js')
  renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'))
} else {
  require('./build/dev-server')(app, bundle => {
    renderer = createBundleRenderer(bundle)
  })
}

// Declare a route
app.get('*', (request, reply) => {
  const context = { url: request.req.url }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      reply.code(500).send('Server Error: ' + err)
    }
    html = indexHTML.replace('{{ APP }}', html)
    html = html.replace('{{ STATE }}',
      `<script>window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}</script>`)
    reply.type('text/html')
    reply.send(html)
  })
})

// Run the server!
app.listen(port, err => {
  if (err) throw err
  console.log(`server listening on ${app.server.address().port}`)
})
