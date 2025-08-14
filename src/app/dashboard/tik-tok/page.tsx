'use client'
import { TikTokForm } from '@/app/dashboard/tik-tok/form'
import { CardWrapper } from '@shared/components/ui'

export default function Page() {
  return <div className={"space-y-6"}>
    <h1 className={"font-medium text-[clamp(20px,3.2vw,28px)]"}>Генератор TikTok сценариев</h1>
    <CardWrapper className={"max-w-[500px]"}>
      <TikTokForm />
    </CardWrapper>
  </div>
}
