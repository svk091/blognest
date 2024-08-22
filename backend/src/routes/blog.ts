import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import authMiddleware from "../middlewares/authMiddleware";
import prismaMiddleware from "../middlewares/prismaMiddleware";
import { createPostInput, deletePostInput, getPostInput, updatePostInput } from "blognest/dist";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
  },
  Variables: {
    userId: string,
    prisma: PrismaClient
  }
}>();

blogRouter.use(authMiddleware);
blogRouter.use(prismaMiddleware)

blogRouter.post('/', async (c) => {
  const prisma = c.get("prisma");
  const id = c.get("userId");
  const body = await c.req.json() || "";
  const { success, data } = createPostInput.safeParse(body);
  if (!success) {
    c.status(400)
    return c.json({
      error: "Invalid input format"
    })
  }
  const { title, content } = data;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: id
      }
    })
    c.status(201);
    return c.json({
      msg: "Post created",
      post
    })
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({
      error: "Internal Server Error"
    })
  }
})

blogRouter.put('/', async (c) => {
  const prisma = c.get("prisma");
  const userId = c.get("userId");
  const body = await c.req.json() || "";
  const { success, data } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(400)
    return c.json({
      error: "Invalid input format"
    })
  }
  const { postId, title, content } = data;
  try {
    const post = await prisma.post.update({
      where: {
        id: postId,
        authorId: userId
      },
      data: {
        title,
        content
      }
    })
    c.status(204);
    return c.json({
      msg: 'Post updated',
      post
    })
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({
      error: "Internal Server Error"
    })
  }
})


blogRouter.delete('/', async (c) => {
  const prisma = c.get("prisma");
  const userId = c.get("userId");
  const body = await c.req.json() || "";
  const { success, data } = deletePostInput.safeParse(body);
  if (!success) {
    c.status(400)
    return c.json({
      error: "Invalid input format"
    })
  }
  const { postId } = data;
  try {
    await prisma.post.delete({
      where: {
        id: postId,
        authorId: userId
      }
    })
    c.status(204);
    return c.json({
      msg: 'Post deleted',
    })
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({
      error: "Internal Server Error"
    })
  }
})

blogRouter.get('/bulk', async (c) => {
  const prisma = c.get("prisma");
  try {
    const posts = await prisma.post.findMany();
    c.status(200)
    return c.json({
      posts
    })
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({
      error: "Internal Server Error"
    })
  }
})

blogRouter.get('/:id', async (c) => {
  const prisma = c.get("prisma");
  const { id } = c.req.param() || "";
  const { success } = getPostInput.safeParse(id);
  if (!success) {
    c.status(400)
    return c.json({
      error: "Invalid param id"
    })
  }
  try {
    const post = await prisma.post.findUnique({
      where: {
        id
      }
    })
    return c.json({
      post
    })
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({
      error: "Internal Server Error"
    })
  }
})

export default blogRouter;