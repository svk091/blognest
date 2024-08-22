import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";
import prismaMiddleware from "../middlewares/prismaMiddleware";
import { comparePassword, hashPassword } from "../utils/hashing";
import { signinInput, signupInput } from "blognest/dist"

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
    NODE_ENV: string
  },
  Variables: {
    prisma: PrismaClient
  }
}>();

userRouter.use(prismaMiddleware);

userRouter.post('signup', async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json() || "";
  const { success, data } = signupInput.safeParse(body);
  if (!success) {
    c.status(400)
    return c.json({
      error: "Invalid input format"
    })
  }
  const { name, email, password } = data;
  try {
    const isUserAlreadyExist = await prisma.user.findUnique({
      where: {
        email,
      }
    })
    if (isUserAlreadyExist) {
      c.status(409);
      return c.json({
        error: "User already exist"
      })
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      select: {
        id: true
      }
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    setCookie(c, token, token, {
      sameSite: "lax",
      httpOnly: true,
      secure: true
    });
    c.status(200);
    return c.json({
      msg: "Signup Successfull"
    })
  } catch (error) {
    console.log(error);
    c.status(500)
    return c.json({
      error: "Internal Server Error"
    })
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json() || "";
  const { success, data } = signinInput.safeParse(body);
  if (!success) {
    c.status(400)
    return c.json({
      error: "Invalid input format"
    })
  }
  const { email, password } = data;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })
    if (!user) {
      c.status(403)
      return c.json({
        error: "User not found"
      })
    }
    if (await comparePassword(password, user.password)) {
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      setCookie(c, "token", token, {
        sameSite: "Lax",
        httpOnly: true,
        secure: c.env.NODE_ENV === "production"
      })
      c.status(200);
      return c.json({
        msg: "Signin Successfull"
      })
    } else {
      c.status(401)
      return c.json({
        error: "Incorrect Password"
      })
    }
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Internal Server Error"
    })
  }
})

export default userRouter;