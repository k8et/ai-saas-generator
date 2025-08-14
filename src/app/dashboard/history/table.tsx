'use client'

import { historyColumns } from '@/app/dashboard/history/columns'
import { CustomTable } from '@shared/components/ui'
import { useGetHistoryGeneration } from '@/app/dashboard/history/hooks'
export const generateFakeHistory = (count = 1000) => {
  const models = ['gpt-4', 'gpt-3.5', 'dall-e', 'stable-diffusion']
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    model: models[i % models.length],
    input: `Пример входных данных ${i + 1}`,
    created_at: new Date(Date.now() - i * 1000000).toISOString(),
  }))
}

export const HistoryGenerationTable = () => {
  const { data, isLoading } = useGetHistoryGeneration()

  return <CustomTable isLoading={isLoading} data={data ?? []} columns={historyColumns} />
}
