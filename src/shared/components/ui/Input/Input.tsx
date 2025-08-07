import * as React from 'react'
import { cn } from '@shared/lib/utils'

type InputBaseProps = React.InputHTMLAttributes<HTMLInputElement>

interface InputProps extends InputBaseProps {
  name?: string
  label?: string
  error?: string
  isLoading?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, isLoading, name, id, ...props }, ref) => {
    const inputId = id || name

    return (
      <div className='flex w-full flex-col gap-1'>
        {label && (
          <label htmlFor={inputId} className='text-muted-foreground text-sm font-medium'>
            {label}
          </label>
        )}

        {isLoading ? (
          <div className={'bg-input h-9 animate-pulse rounded-lg'} />
        ) : (
          <input
            id={inputId}
            name={name}
            type={type}
            ref={ref}
            aria-invalid={!!error || undefined}
            data-slot='input'
            className={cn(
              'flex h-9 w-full min-w-0 rounded-lg border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
              'placeholder:text-muted-foreground file:text-foreground',
              'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'selection:bg-primary selection:text-primary-foreground',
              'dark:bg-input/30',
              'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
              'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
              className
            )}
            {...props}
          />
        )}

        <p className='text-destructive min-h-[1.25rem] text-sm'>{error}</p>
      </div>
    )
  }
)

Input.displayName = 'Input'
