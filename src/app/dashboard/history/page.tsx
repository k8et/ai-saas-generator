'use client'

import { HistoryGenerationTable } from '@/app/dashboard/history/table'

export default function Page() {
  return (
    <div className={'space-y-6'}>
      <h1 className={'text-[clamp(20px,3.2vw,28px)] font-medium'}>История запросов</h1>
      <HistoryGenerationTable/>
    </div>
  )
}
