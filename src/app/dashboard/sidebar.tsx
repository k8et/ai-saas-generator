'use client'

import { useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@shared/lib/utils'
import { appRoutes } from '@shared/constants/appRoutes'
import { ProgressLink } from '@shared/components/progress'
import { useUserInfo } from '@shared/hooks'

interface NavItem {
  href: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { href: appRoutes.TELEGRAM_ROUTE, label: 'Telegram', icon: '📬' },
  { href: appRoutes.TIK_TOK_ROUTE, label: 'TikTok', icon: '🎬' },
  { href: appRoutes.IMAGE_GENERATOR_ROUTE, label: 'Изображение', icon: '👤' },
]
export const Sidebar = () => {
  const { data, isLoading } = useUserInfo()
  const pathname = usePathname()
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <aside className='bg-sidebar w-64 flex-shrink-0 border-r'>
      <div className='flex items-center gap-2 p-4'>
        <Image width={20} height={20} src='/assets/icons/logo.svg' alt='logo' />
        <span className='font-semibold'>Creon.ai</span>
      </div>

      <div className='flex items-center gap-2 border-y px-4 py-2'>
        {isLoading ? (
          <div className={'bg-input h-[20px] w-full animate-pulse rounded'} />
        ) : (
          <span className={'text-muted-foreground text-sm font-semibold'}>
            {data?.email ?? 'user'}
          </span>
        )}
      </div>

      <nav className='flex flex-col gap-1 p-2'>
        {navItems.map(({ href, label, icon }) => {
          const isActive = pathname === href
          const isHovered = hovered === href

          return (
            <div
              key={href}
              className='relative'
              onMouseEnter={() => setHovered(href)}
              onMouseLeave={() => setHovered(null)}
            >
              {isActive && (
                <motion.div
                  layoutId='active-bg'
                  className='bg-input/80 dark:bg-muted absolute inset-0 rounded-md'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {isHovered && !isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='bg-input/80 dark:bg-muted absolute inset-0 rounded-md'
                  transition={{ duration: 0.15 }}
                />
              )}

              <ProgressLink
                href={href}
                className={cn(
                  'relative z-10 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </ProgressLink>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
