'use client'

import { ReactNode, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@shared/lib/utils'
import { appRoutes } from '@shared/constants/appRoutes'
import { ProgressLink } from '@shared/components/progress'
import { useUserInfo } from '@shared/hooks'
import {
  ImageIcon,
  TelegramIcon,
  TikTokIcon,
  ClockIcon
} from '@/shared/icons'
import { ThemeSwitch } from '@shared/components/ui'
import {  PanelRightClose, PanelRightOpen } from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: ReactNode
}

const navItems: NavItem[] = [
  {
    href: appRoutes.TELEGRAM_ROUTE,
    label: 'Telegram',
    icon: <TelegramIcon width={24} height={24} />,
  },
  {
    href: appRoutes.TIK_TOK_ROUTE,
    label: 'TikTok',
    icon: <TikTokIcon width={24} height={22} />,
  },
  {
    href: appRoutes.IMAGE_GENERATOR_ROUTE,
    label: 'Изображение',
    icon: <ImageIcon width={24} height={24} />,
  },
  {
    href: appRoutes.HISTORY_ROUTE,
    label: 'История',
    icon: <ClockIcon width={24} height={24} />,
  },
]

export const Sidebar = () => {
  const { data, isLoading } = useUserInfo()
  const pathname = usePathname()
  const [hovered, setHovered] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn('bg-sidebar border-r transition-all duration-300', collapsed ? 'w-16' : 'w-64')}
    >
      <div
        className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between '} p-4`}
      >
        <div className='flex items-center gap-2'>
          {!collapsed && <Image width={20} height={20} src='/assets/icons/logo.svg' alt='logo' />}
          {!collapsed && <span className='font-semibold'>Creon.ai</span>}
        </div>
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className='bg-muted w-8 h-8  hover:text-foreground text-muted-foreground flex items-center justify-center rounded  transition-colors'
        >
          {collapsed ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
        </button>
      </div>

      <div
        className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-2 border-y px-4 py-2`}
      >
        {!collapsed &&
          (isLoading ? (
            <div className='bg-input h-[20px] w-full animate-pulse rounded' />
          ) : (
            <span className='text-muted-foreground text-sm font-semibold'>
              {data?.email ?? 'user'}
            </span>
          ))}
        <ThemeSwitch />
      </div>

      <nav className="relative flex flex-col gap-1 p-2">
        {navItems.map(({ href, label, icon }) => {
          const isActive = pathname === href
          const isHovered = hovered === href
          const shouldHighlight = isActive || isHovered

          return (
            <div
              key={href}
              className="relative"
              onMouseEnter={() => setHovered(href)}
              onMouseLeave={() => setHovered(null)}
            >
              <AnimatePresence>
                {shouldHighlight && (
                  <motion.div
                    layoutId="sidebar-highlight"
                    data-slot="motion-highlight"
                    className="bg-muted pointer-events-none absolute inset-0 z-0 rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                  />
                )}
              </AnimatePresence>

              <ProgressLink
                href={href}
                className={cn(
                  'relative z-10 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
                )}
              >
                <span>{icon}</span>
                {!collapsed && <span>{label}</span>}
              </ProgressLink>
            </div>
          )
        })}
      </nav>

    </aside>
  )
}
