'use client'

import React, { useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion} from 'framer-motion'
import { cn } from '@shared/lib/utils'
import {appRoutes} from "@shared/constants/appRoutes";
import {UserPayload} from "@shared/lib/getUserFromCookie";

interface NavItem {
    href: string
    label: string
    icon: string
}

const navItems: NavItem[] = [
    { href: appRoutes.TELEGRAM_ROUTE, label: 'Telegram', icon: '📬' },
    { href: appRoutes.TIK_TOK_ROUTE, label: 'TikTok', icon: '🎬' },
    { href: '/dashboard/profile', label: 'Профиль', icon: '👤' },
]
export const Sidebar = ({ user }: { user: UserPayload | null }) => {
    const pathname = usePathname()
    const [hovered, setHovered] = useState<string | null>(null)

    return (
        <aside className="w-64 flex-shrink-0 border-r bg-sidebar">
            <div className="flex items-center gap-2 p-4">
                <Image width={20} height={20} src="/assets/icons/logo.svg" alt="logo" />
                <span className="font-semibold">Creon.ai</span>
            </div>

            <div className="flex items-center gap-2 border-y px-4 py-2">
                <span className="text-muted-foreground text-sm font-semibold">{user?.email ?? 'Гость'}</span>
            </div>

            <nav className="flex flex-col gap-1 p-2">
                {navItems.map(({ href, label, icon }) => {
                    const isActive = pathname === href
                    const isHovered = hovered === href

                    return (
                        <div
                            key={href}
                            className="relative"
                            onMouseEnter={() => setHovered(href)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-bg"
                                    className="absolute inset-0 rounded-md bg-input/80 dark:bg-muted"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}

                            {isHovered && !isActive && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 rounded-md bg-input/80 dark:bg-muted"
                                    transition={{ duration: 0.15 }}
                                />
                            )}

                            <Link
                                href={href}
                                className={cn(
                                    'relative z-10 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <span>{icon}</span>
                                <span>{label}</span>
                            </Link>
                        </div>
                    )
                })}
            </nav>
        </aside>
    )
}