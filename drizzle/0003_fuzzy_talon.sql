CREATE TABLE IF NOT EXISTS "telegram_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"style" text NOT NULL,
	"emoji" boolean NOT NULL,
	"hashtag" boolean NOT NULL,
	"tg_chanel" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
