import { Hono } from 'hono'

// Create Hono app for routes
const app = new Hono()

// Define your routes
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/hello/:id', (c) => {
  const id = c.req.param('id')
  return c.json({
    ok: true,
    message: `Hello Hono! Your ID is ${id}`,
  })
})


export type AppType = typeof app
