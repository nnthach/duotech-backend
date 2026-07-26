import { pgTable, serial, smallint, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// 1 - Active, 2 - Inactive, 3 - Banned
export const USER_STATUS = {
  ACTIVE: 1,
  INACTIVE: 2,
  BANNED: 3,
} as const;
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

// 1 - Admin, 2 - Staff, 3 - User
export const USER_LEVEL = {
  ADMIN: 1,
  STAFF: 2,
  USER: 3,
} as const;
export type UserLevel = (typeof USER_LEVEL)[keyof typeof USER_LEVEL];

export const usersTable = pgTable('users', {
  userId: serial('user_id').primaryKey(),
  userUuid: uuid('user_uuid').notNull().defaultRandom().unique(),
  userEmail: text('user_email').notNull().unique(),
  userName: text('user_name').notNull(),
  userPassword: text('user_password').notNull(),
  userStatus: smallint('user_status').notNull().default(USER_STATUS.ACTIVE),
  userLevel: smallint('user_level').notNull().default(USER_LEVEL.USER),
  userCreatedAt: timestamp('user_created_at', { withTimezone: true }).notNull().defaultNow(),
  userUpdatedAt: timestamp('user_updated_at', { withTimezone: true }),
  userDeletedAt: timestamp('user_deleted_at', { withTimezone: true }),
});

export type User = typeof usersTable.$inferSelect; // suy ra type Typescript từ schema
export type NewUser = typeof usersTable.$inferInsert;
