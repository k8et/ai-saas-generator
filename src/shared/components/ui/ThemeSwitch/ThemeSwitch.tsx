'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const ThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !resolvedTheme) return null

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Переключение темы"
      className="relative min-w-8 h-8 flex items-center justify-center bg-muted rounded-full"
    >
      <motion.div
        key="sun"
        animate={{
          opacity: isDark ? 1 : 0,
          scale: isDark ? 1 : 0.8,
          rotate: isDark ? 0 : -90,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute"
      >
        <Sun size={18} />
      </motion.div>

      <motion.div
        key="moon"
        animate={{
          opacity: isDark ? 0 : 1,
          scale: isDark ? 0.8 : 1,
          rotate: isDark ? 90 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute"
      >
        <Moon size={18} />
      </motion.div>
    </button>
  )
}
