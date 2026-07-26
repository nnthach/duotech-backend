import { z } from 'zod';

export { CreateUserSchema as RegisterSchema } from '@/validations/user.validation.js';
export type { CreateUserInput as RegisterInput } from '@/validations/user.validation.js';

export const LoginSchema = z.object({
  userEmail: z.string().email(),
  userPassword: z.string().min(1),
});
export type LoginInput = z.infer<typeof LoginSchema>;

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});
export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;
