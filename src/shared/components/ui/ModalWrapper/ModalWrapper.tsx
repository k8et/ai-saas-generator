'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

type ModalWrapperProps = {
  body?: React.ReactNode
  className?: string
  footer?: React.ReactNode
  from?: 'top' | 'bottom' | 'left' | 'right'
  header?: React.ReactNode
  isOpen: boolean
  onOpenChangeAction: () => void
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onOpenChangeAction,
  header,
  body,
  footer,
  className = '',
  from = 'top',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChangeAction()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = ''
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflowY = ''
    }
  }, [isOpen, onOpenChangeAction])

  const transition = { type: 'spring' as const, stiffness: 150, damping: 25 }
  const initialRotation = from === 'top' || from === 'left' ? '20deg' : '-20deg'
  const isVertical = from === 'top' || from === 'bottom'
  const rotateAxis = isVertical ? 'rotateX' : 'rotateY'

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-[99] overflow-y-auto'>
          <motion.div
            key='dialog-backdrop'
            className='fixed inset-0 z-40 bg-black/80'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChangeAction()}
          />

          <div className='relative z-50 flex min-h-full items-center justify-center px-4 py-12 max-md:items-end max-md:px-0 max-md:py-0'>
            <motion.div
              key='dialog-panel'
              className={`bg-background relative w-full max-w-lg rounded-xl border p-6 shadow-lg ${className}`}
              initial={{
                opacity: 0,
                filter: 'blur(4px)',
                transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
              }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`,
              }}
              exit={{
                opacity: 0,
                filter: 'blur(4px)',
                transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
              }}
              transition={transition}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => onOpenChangeAction()}
                className='ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none'
                aria-label='Закрыть'
              >
                <X className='h-4 w-4' />
              </button>

              {header && <h1 className='mb-5 text-2xl font-semibold'>{header}</h1>}

              {body && <div className='max-md:max-h-[400px] max-md:overflow-y-auto'>{body}</div>}
              {footer && <div className='mt-5'>{footer}</div>}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
