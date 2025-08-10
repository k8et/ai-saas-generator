import {boolean, integer, pgTable, serial, text, timestamp, uuid} from 'drizzle-orm/pg-core'

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
    image_url: text('image_url'),
    userId: integer('user_id').notNull().references(() => users.id),
});


export const tikTok = pgTable('tik_tok', {
    id: serial('id').primaryKey(),
    description: text('description').notNull(),
    style: text('style').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    userId: integer('user_id').notNull().references(() => users.id),
})

export const image = pgTable('image', {
    id: serial('id').primaryKey(),
    description: text('description').notNull(),
    type: text('type').notNull(),
    model: text('model').notNull(),
    size: text('size').notNull(),
    prompt: text('prompt').notNull(),
    imageUrl: text('image_url').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    userId: integer('user_id').notNull().references(() => users.id),
})


export const telegramChannels = pgTable('telegram_channels', {
    id: serial('id').primaryKey(),
    channel: text('channel').notNull().unique(),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
    userId: integer('user_id').notNull().references(() => users.id),
});
