import { Hono } from "hono";
import userRouter from "./user";
import blogRouter from "./blog";

const router = new Hono();

router.route("/user", userRouter);
router.route("/blog", blogRouter);

export default router;