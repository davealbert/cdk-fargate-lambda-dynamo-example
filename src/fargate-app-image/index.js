// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const crypto = require('crypto')
const id = crypto.randomBytes(20).toString('hex')
let count = 0

// Declare a route
fastify.get('/', async (request, reply) => {
  return { 
      app: 'fargate',
      type: 'fastify',
      date: new Date(),
      count: ++count,
      envvar: process.env.ENVVAR || 'missing',
      container: id
  }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
