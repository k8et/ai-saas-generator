import {InferSelectModel} from "drizzle-orm";
import {telegramPosts} from "@/db/schema";

export type TelegramGeneratedPostSuccess = InferSelectModel<typeof telegramPosts>

export type TelegramGeneratedPostType =
    | TelegramGeneratedPostSuccess
    | { error: string; message?: string }
