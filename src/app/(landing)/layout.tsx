import { ReactNode } from 'react'
import { LandingLayout } from '@/shared/layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creon.ai — Генератор контента с AI: посты, сценарии и визуал',
  description:
    'Создавай Telegram-посты, TikTok-сценарии и обложки с помощью искусственного интеллекта. Быстро, без копирайтеров и дизайнеров. Creon.ai — твой универсальный инструмент генерации и публикации контента.',
  keywords: [
    'AI контент',
    'генерация постов',
    'нейросеть для Telegram',
    'TikTok сценарии',
    'визуальный контент AI',
    'создание обложек',
    'генератор контента',
    'Creon.ai',
    'искусственный интеллект',
  ],
  openGraph: {
    title: 'Creon.ai — Генератор контента с AI',
    description:
      'Публикуй посты, создавай сценарии и визуалы за секунды. Идеально для блогеров, SMM и бизнеса.',
    url: 'https://creon.ai',
    siteName: 'Creon.ai',
    images: [
      {
        url: 'https://creon.ai/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'Creon.ai — Генерация контента с AI',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creon.ai — AI-контент за секунды',
    description:
      'Создавай Telegram-посты, TikTok-сценарии и визуалы без усилий. Сила нейросети — в твоих руках.',
    images: ['https://creon.ai/og-cover.png'],
  },
  metadataBase: new URL('https://creon.ai'),
}

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <LandingLayout>{children}</LandingLayout>
}
