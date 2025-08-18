'use client'

import { ThemeProvider as NextProvider } from 'next-themes'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export function ThemeProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname()

    const disableTheme = pathname === '/' || pathname === '/auth'

    if (disableTheme) return <>{children}</>

    return (
        <NextProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextProvider>
    )
}
