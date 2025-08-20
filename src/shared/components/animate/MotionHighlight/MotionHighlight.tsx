'use client'

import { motion } from 'framer-motion'
import {RefObject, useLayoutEffect, useState} from 'react'

type MotionHighlightProps<T extends string | number | symbol> = {
  activeKey: T | null
  itemRefs: Record<T, HTMLDivElement | null>
  containerRef: RefObject<HTMLDivElement>
}

export const MotionHighlight = <T extends string>({
  activeKey,
  itemRefs,
  containerRef,
}: MotionHighlightProps<T>) => {
  const [styles, setStyles] = useState({ top: 0, height: 0, opacity: 0 })

  useLayoutEffect(() => {
    if (!activeKey || !containerRef.current) {
      setStyles((prev) => ({ ...prev, opacity: 0 }))
      return
    }

    const el = itemRefs[activeKey]
    const containerTop = containerRef.current.getBoundingClientRect().top

    if (el) {
      const { top, height } = el.getBoundingClientRect()
      setStyles({ top: top - containerTop, height, opacity: 1 })
    }
  }, [activeKey, itemRefs, containerRef])

  return (
    <motion.div
      layout
      layoutId='sidebar-highlight'
      className='bg-muted pointer-events-none absolute z-0 rounded-md'
      animate={styles}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
    />
  )
}
