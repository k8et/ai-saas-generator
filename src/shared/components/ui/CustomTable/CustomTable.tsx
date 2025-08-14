'use client'

import * as React from 'react'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
  PaginationState,
} from '@tanstack/react-table'
import { cn } from '@shared/lib/utils'
import { Loader2Icon} from 'lucide-react'
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@shared/components/ui'
import { DOTS, getPaginationRange } from '@shared/components/ui/CustomTable/utils'

type CustomTableProps<T extends object> = {
  columns: ColumnDef<T>[]
  data: T[]
  isLoading?: boolean
  rowsPerPage?: number
}


export const CustomTable = <T extends object>({
                                                columns,
                                                data,
                                                isLoading = false,
                                                rowsPerPage = 10,
                                              }: CustomTableProps<T>) => {
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: rowsPerPage,
  })

  const table = useReactTable({
    data,
    columns,
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const totalPages = table.getPageCount()
  const paginationRange = getPaginationRange(pageIndex + 1, totalPages, 1)

  return (
    <div className='space-y-4'>
      <div className='relative w-full overflow-x-auto'>
        <table className='w-full caption-bottom text-sm'>
          <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index, arr) => {
                const isFirst = index === 0
                const isLast = index === arr.length - 1

                return (
                  <th
                    key={header.id}
                    className={cn(
                      'text-foreground bg-muted/80 h-[36px] px-2 text-left align-middle font-medium whitespace-nowrap',
                      isFirst && 'rounded-l-md',
                      isLast && 'rounded-r-md'
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                )
              })}
            </tr>
          ))}
          </thead>

          <tbody className='[&_tr:last-child]:border-0'>
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length}
                className='text-muted-foreground px-4 py-6 text-center'
              >
                <div className='flex h-[100px] items-center justify-center'>
                  <Loader2Icon className='animate-spin' size={32} />
                </div>
              </td>
            </tr>
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='border-b h-[48px]'>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className='p-2 align-middle whitespace-nowrap'
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className='text-muted-foreground h-[100px] py-6 text-center'>
                Нет данных для отображения
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>

      {!isLoading &&
        <Pagination className='pt-2'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (table.getCanPreviousPage()) {
                    table.previousPage()
                  }
                }}
                className={cn(
                  'cursor-pointer',
                  !table.getCanPreviousPage() && 'pointer-events-none opacity-50'
                )}
              />

            </PaginationItem>

            {paginationRange.map((page, idx) => (
              <PaginationItem key={idx}>
                {page === DOTS ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => table.setPageIndex(Number(page) - 1)}
                    isActive={pageIndex + 1 === page}
                    className='cursor-pointer'
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (table.getCanNextPage()) {
                    table.nextPage()
                  }
                }}
                className={cn(
                  'cursor-pointer',
                  !table.getCanNextPage() && 'pointer-events-none opacity-50'
                )}
              />

            </PaginationItem>
          </PaginationContent>
        </Pagination>
      }


    </div>
  )
}
