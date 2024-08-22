import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

const authMiddleware = createMiddleware(async (c, next) => {
  try {
    const token = await getCookie(c, "token") || "";
    const decodedPayload = await verify(token, c.env.JWT_SECRET);
    const { id } = decodedPayload;
    c.set("userId", id);
    await next();
  } catch (error) {
    c.status(401);
    return c.json({
      error: "Unauthorized"
    })
  }
})

export default authMiddleware;