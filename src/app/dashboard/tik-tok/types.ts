import { InferSelectModel } from 'drizzle-orm'
import { tikTok } from '@/db/schema'

export type TikTokGeneratedPostSuccess = InferSelectModel<typeof tikTok>

export type TikTokGeneratedPostType =
  | TikTokGeneratedPostSuccess
  | { error: string; message?: string }
