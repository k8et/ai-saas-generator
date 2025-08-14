'use client'

import useSWR from 'swr'
import { getHistoryGeneration } from '@/app/dashboard/history/actions'

export const HISTORY_GENERATION_KEY = 'history-generation'

const fetcher = () => getHistoryGeneration()

export const useGetHistoryGeneration = () => {
  return useSWR(HISTORY_GENERATION_KEY, fetcher)
}
