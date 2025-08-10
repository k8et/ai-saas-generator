import { InferSelectModel } from 'drizzle-orm'
import { image } from '@/db/schema'

export type ImageGeneratorSuccess = InferSelectModel<typeof image>

export type TikTokGeneratedType =
  | ImageGeneratorSuccess
  | { error: string; message?: string }
