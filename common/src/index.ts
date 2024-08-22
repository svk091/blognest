import { z } from 'zod'

const signupInput = z.object({
  name: z.string()
    .min(3, "Must be 3 or more characters long")
    .max(50, "Must be 50 or fewer characters long"),
  email: z.string()
    .email("Invalid email address"),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character')
})

type SignupInput = z.infer<typeof signupInput>;

const signinInput = z.object({
  email: z.string()
    .email("Invalid email address"),
  password: z.string()
})

type SigninInput = z.infer<typeof signinInput>;

const createPostInput = z.object({
  title: z.string()
    .min(10, "Must be 10 or more characters long")
    .max(60, "Must be 60 or fewer characters long"),
  content: z.string()
    .min(100, "Must be 100 or more characters long")
})

type CreatePostInput = z.infer<typeof createPostInput>;

const updatePostInput = z.object({
  postId: z.string().uuid("Invalid uuid"),
  title: z.string()
    .min(10, "Must be 10 or more characters long")
    .max(60, "Must be 60 or fewer characters long"),
  content: z.string()
    .min(100, "Must be 100 or more characters long")
})

type UpdatePostInput = z.infer<typeof updatePostInput>;

const deletePostInput = z.object({
  postId: z.string().uuid("Invalid uuid")
})

type DeletePostInput = z.infer<typeof deletePostInput>;

const getPostInput = z.object({
  id: z.string().uuid("Invalid uuid")
})

type GetPostInput = z.infer<typeof getPostInput>;

export {
  signupInput,
  SignupInput,
  signinInput,
  SigninInput,
  createPostInput,
  CreatePostInput,
  updatePostInput,
  UpdatePostInput,
  deletePostInput,
  DeletePostInput,
  getPostInput,
  GetPostInput
}