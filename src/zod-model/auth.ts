import { z } from "zod";

export const signUpArgsSchema = z.object({
  email: z.string().email(),
  name: z.string(), //in the backend project there is other limitations
  password: z.string(),
});
