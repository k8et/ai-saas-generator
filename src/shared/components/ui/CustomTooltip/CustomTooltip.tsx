'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, type Transition } from 'framer-motion'
import { cn } from '@shared/lib/utils'

type TooltipProps = {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
  transition?: Transition
  delay?: number
}

export function CustomTooltip({
                                children,
                                content,
                                className,
                                transition = { type: 'spring', stiffness: 300, damping: 20 },
                                delay = 0,
                              }: TooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [coords, setCoords] = React.useState({ top: 0, left: 0 })
  const ref = React.useRef<HTMLDivElement>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const show = () => {
    timeoutRef.current = setTimeout(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setCoords({
          top: rect.bottom + 8,
          left: rect.left ,
        })
        setIsOpen(true)
      }
    }, delay)
  }

  const hide = () => {
    clearTimeout(timeoutRef.current!)
    setIsOpen(false)
  }

  return (
    <>
      <div
        ref={ref}
        className="inline-block"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </div>

      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={transition}
                style={{
                  position: 'fixed',
                  top: coords.top,
                  left: coords.left,
                  transform: 'translateX(-50%)',
                  zIndex: 1000,
                  pointerEvents: 'none',
                }}
                className={cn(
                  'bg-popover text-popover-foreground text-xs px-3 py-1.5 rounded-md shadow-xl max-w-[300px] text-pretty break-words',
                  className
                )}
              >
                {content}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
