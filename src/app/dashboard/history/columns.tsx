import { ColumnDef } from '@tanstack/react-table'
import { getHistoryGeneration } from '@/app/dashboard/history/actions'
import { CustomPopover } from '@shared/components/ui'

type HistoryItem = Awaited<ReturnType<typeof getHistoryGeneration>>[number]

export const historyColumns: ColumnDef<HistoryItem>[] = [
  {
    accessorKey: 'type',
    header: 'Тип',
    cell: ({ row }) => {
      const type = row.getValue<'telegram' | 'image' | 'tiktok'>('type')
      const label =
        type === 'telegram' ? 'Telegram' :
          type === 'image' ? 'Изображение' :
            'TikTok'
      return <span className="uppercase text-xs text-muted-foreground">{label}</span>
    },
  },
  {
    accessorKey: 'description',
    header: 'Описание',
    cell: ({ row }) => {
      const value = row.getValue<string>('description')
      return (
        <CustomPopover content={value}>
          <div className="max-w-[300px] truncate text-foreground">
            {value}
          </div>
        </CustomPopover>
      )
    },
  },
  {
    accessorKey: 'content',
    header: 'Контент',
    cell: ({ row }) => {
      const value = row.getValue<string>('content')
      return (
        <CustomPopover content={value}>
          <div className="max-w-[300px] truncate text-muted-foreground ">
            {value}
          </div>
        </CustomPopover>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Создано',
    cell: ({ row }) => {
      const date = row.getValue<Date>('createdAt')
      const formatted = new Date(date).toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      return <span>{formatted}</span>
    },
  },
]
