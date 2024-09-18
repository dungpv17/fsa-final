import { loginInputSchema, registerInputSchema } from "@/lib/auth";
import { z } from "zod";

export type RegisterInput = z.infer<typeof registerInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
