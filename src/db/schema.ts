import {pgTable, serial, text, timestamp, uuid} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
})

export const emailVerification = pgTable('email_verification', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull(),
    code: text('code').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
})