import { boolean, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core'

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

export const telegramPosts = pgTable('telegram_posts', {
    id: serial('id').primaryKey(),
    description: text('description').notNull(),
    style: text('style').notNull(),
    emoji: boolean('emoji').notNull(),
    hashtag: boolean('hashtag').notNull(),
    tg_chanel: text('tg_chanel').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});