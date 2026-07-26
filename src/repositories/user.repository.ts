import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/config/db.js';
import { usersTable, type NewUser, type User } from '@/database/schema/index.js';

export const userRepository = {
  async findAll(): Promise<User[]> {
    return db.select().from(usersTable).where(isNull(usersTable.userDeletedAt));
  },

  async findById(id: number): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(and(eq(usersTable.userId, id), isNull(usersTable.userDeletedAt)));
    return user;
  },

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.userEmail, email));
    return user;
  },

  async create(input: NewUser): Promise<User> {
    const [user] = await db.insert(usersTable).values(input).returning();
    return user!;
  },

  async update(id: number, input: Partial<NewUser>): Promise<User | undefined> {
    const [user] = await db
      .update(usersTable)
      .set({ ...input, userUpdatedAt: new Date() })
      .where(eq(usersTable.userId, id))
      .returning();
    return user;
  },

  async softDelete(id: number): Promise<User | undefined> {
    const [user] = await db
      .update(usersTable)
      .set({ userDeletedAt: new Date() })
      .where(eq(usersTable.userId, id))
      .returning();
    return user;
  },
};
