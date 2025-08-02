'use client'

import {ThemeProvider as NextProvider} from 'next-themes'
import {useEffect, useState, ReactNode} from 'react'
import {usePathname} from 'next/navigation'
import {appRoutes} from "@shared/constants/appRoutes";

export function ThemeProvider({children}: { children: ReactNode }) {
    const [isMounted, setIsMounted] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const disableThemeOnPaths = [appRoutes.MAIN_ROUTE, '/404']
    const disableTheme = disableThemeOnPaths.includes(pathname)

    if (!isMounted) {
        return null
    }

    if (disableTheme) {
        return <>{children}</>
    }

    return (
        <NextProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextProvider>
    )
}
