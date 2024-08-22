import { createMiddleware } from "hono/factory";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prismaMiddleware = createMiddleware(async (c, next) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    c.set("prisma", prisma)
    await next()
  }
  catch (error) {
    console.log(error);
    c.status(500);
    return c.json({
      error: "Internal Server Error"
    })
  }
})

export default prismaMiddleware;