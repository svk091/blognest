import { Hono } from 'hono'
import { cors } from 'hono/cors'

import router from './routes'

const app = new Hono();

app.use(cors({
  origin: "https://blognest-blogs.vercel.app",
  credentials: true,
  allowHeaders: ["Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposeHeaders: [],
}));


app.route("/api/v1", router);

app.get("/", (c) => {
  return c.text("Blog Nest")
})

export default app
