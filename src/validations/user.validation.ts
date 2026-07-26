import { z } from 'zod';

export const CreateUserSchema = z.object({
  userEmail: z.string().email(),
  userName: z.string().min(1),
  userPassword: z.string().min(6),
});
export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
  userName: z.string().min(1).optional(),
  userPassword: z.string().min(6).optional(),
});
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

export const UserIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});
export type UserIdParam = z.infer<typeof UserIdParamSchema>;
