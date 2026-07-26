import { eq } from 'drizzle-orm';

import { db } from '@/config/db.js';
import { usersTable, type NewUser, type User } from '@/database/schema/index.js';

export const userRepository = {
  async findAll(): Promise<User[]> {
    return db.select().from(usersTable);
  },

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.userEmail, email));
    return user;
  },

  async create(input: NewUser): Promise<User> {
    const [user] = await db.insert(usersTable).values(input).returning();
    return user!;
  },
};
