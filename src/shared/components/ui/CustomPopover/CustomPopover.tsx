'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, type Transition } from 'framer-motion'
import { cn } from '@shared/lib/utils'

type PopoverProps = {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
  transition?: Transition
}

export function CustomPopover({
                                children,
                                content,
                                className,
                                transition = { type: 'spring', stiffness: 300, damping: 20 },
                              }: PopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [coords, setCoords] = React.useState({ top: 0, left: 0 })

  const triggerRef = React.useRef<HTMLDivElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)

  const togglePopover = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setCoords({
        top: rect.bottom + 8,
        left: rect.left,
      })
    }
    setIsOpen(prev => !prev)
  }

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node
    if (
      triggerRef.current &&
      !triggerRef.current.contains(target) &&
      popoverRef.current &&
      !popoverRef.current.contains(target)
    ) {
      setIsOpen(false)
    }
  }

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      <div ref={triggerRef} className="inline-block cursor-pointer" onClick={togglePopover}>
        {children}
      </div>

      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={popoverRef}
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
                  pointerEvents: 'auto',
                }}
                className={cn(
                  'bg-popover text-popover-foreground text-xs px-3 py-2 rounded-md shadow-xl max-w-[300px] text-pretty break-words',
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
