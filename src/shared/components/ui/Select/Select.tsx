'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@shared/lib/utils'

export interface Option {
  label: string
  value: string
  disabled?: boolean
}

interface SelectProps {
  name?: string
  label?: string
  placeholder?: string
  options: Option[]
  value?: string
  onChange?: (value: string) => void
  error?: string
  disabled?: boolean
  className?: string
}

export const Select = ({
  name,
  label,
  placeholder = 'Выберите...',
  options,
  value,
  onChange,
  error,
  disabled,
  className,
}: SelectProps) => {
  const [open, setOpen] = useState(false)
  const selected = options.find((opt) => opt.value === value)

  const toggle = () => !disabled && setOpen((prev) => !prev)
  const handleSelect = (val: string) => {
    onChange?.(val)
    setOpen(false)
  }

  return (
    <div className={cn('relative w-full space-y-1', className)}>
      {label && (
        <label htmlFor={name} className='text-muted-foreground text-sm font-medium'>
          {label}
        </label>
      )}

      <button
        id={name}
        type='button'
        disabled={disabled}
        onClick={toggle}
        className={cn(
          'dark:bg-input/30 flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm transition-colors outline-none',
          'hover:bg-accent/20 focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-1',
          !!error && 'border-destructive ring-destructive/20 dark:ring-destructive/40',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <span className={cn(!selected && 'text-muted-foreground')}>
          {selected?.label || placeholder}
        </span>
        <ChevronDown className='text-muted-foreground h-4 w-4' />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className='bg-popover absolute z-50 w-full overflow-hidden rounded-md border text-sm'
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => !opt.disabled && handleSelect(opt.value)}
                className={cn(
                  'hover:bg-accent/40 cursor-pointer px-3 py-2 transition-colors',
                  opt.disabled && 'pointer-events-none opacity-40',
                  value === opt.value && 'bg-muted font-medium'
                )}
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <p className='text-destructive min-h-[1.25rem] text-sm'>{error}</p>
    </div>
  )
}
