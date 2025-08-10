'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@shared/lib/utils'

type TabsProps = {
  tabs: { label: string; value: string }[]
  activeTab: string
  onChangeTabAction: (value: string) => void
  content: React.ReactNode
  className?: string
}

export function Tabs({
                       tabs,
                       activeTab,
                       onChangeTabAction,
                       content,
                       className
                     }: TabsProps) {
  return (
    <div className={cn('flex flex-col gap-3 h-full', className)}>
      <div className="relative flex w-full gap-2 rounded-lg bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChangeTabAction(tab.value)}
            className={cn(
              'relative z-10 flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              activeTab === tab.value ? 'dark:text-black text-white' : 'text-muted-foreground'
            )}
          >
            {tab.label}
            {activeTab === tab.value && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 z-[-1] rounded-md bg-primary"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
