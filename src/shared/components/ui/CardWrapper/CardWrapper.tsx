import { ReactNode } from 'react'
import { cn } from '@shared/lib/utils'

interface CardWrapperProps {
  children?: ReactNode
  className?: string
}

export const CardWrapper = ({ children, className }: CardWrapperProps) => {
  return <div className={cn('bg-card rounded-[20px] border p-[35px]', className)}>{children}</div>
}
