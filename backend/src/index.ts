import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { csrf } from 'hono/csrf';

import router from './routes'

const app = new Hono();

app.use(cors({
  credentials: true,
  origin: "https://blognest-blogs.vercel.app",
  allowHeaders: ["Authorization", 'X-Custom-Header', 'Upgrade-Insecure-Requests', "Content-Type"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
}));

app.use(csrf({
  origin: "https://blognest-blogs.vercel.app"
}))


app.route("/api/v1", router);

app.get("/", (c) => {
  return c.text("Blognest")
})

export default app
