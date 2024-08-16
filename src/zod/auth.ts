import { z } from "zod";

export const signUpArgsSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(8).max(8).regex(/^\d+$/),
  password: z.string(),
});
export const logInArgsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
