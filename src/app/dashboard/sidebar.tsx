'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserPayload } from '@/app/dashboard/layout'

interface NavItem {
    href: string
    label: string
    icon: string
}

const navItems: NavItem[] = [
    { href: '/dashboard/telegram', label: 'Telegram', icon: '📬' },
    { href: '/dashboard/settings', label: 'Настройки', icon: '⚙️' },
    { href: '/dashboard/profile', label: 'Профиль', icon: '👤' },
]

export const Sidebar = ({ user }: { user: UserPayload | null }) => {
    const pathname = usePathname()

    return (
        <aside className='w-64 flex-shrink-0 border-r bg-sidebar'>
            <div className='flex items-center gap-2 p-4'>
                <Image width={20} height={20} src='/assets/icons/logo.svg' alt='logo' />
                <span className='font-semibold'>Creon.ai</span>
            </div>

            <div className='flex items-center gap-2 border-y px-4 py-2'>
                <span className='text-muted-foreground text-sm font-semibold'>{user?.email ?? 'Гость'}</span>
            </div>

            <nav className='flex flex-col gap-2 p-4'>
                {navItems.map(({ href, label, icon }) => {
                    const isActive = pathname.startsWith(href)

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-2 rounded-md px-3 py-2  font-semibold  transition ${
                                isActive
                                    ? 'bg-white dark:bg-background/50 text-primary ring-1 ring-border'
                                    : 'text-muted-foreground hover:bg-background hover:dark:bg-background/50 hover:ring-1 ring-border'
                            }`}
                        >
                            <span>{icon}</span>
                            <span>{label}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
