import type { User } from '@/database/schema/index.js';
import { userRepository } from '@/repositories/user.repository.js';

export const userService = {
  list(): Promise<User[]> {
    return userRepository.findAll();
  },
};
