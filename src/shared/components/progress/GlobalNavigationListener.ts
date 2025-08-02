'use client'

import {usePathname} from 'next/navigation'
import {useEffect, useRef} from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false})

export const GlobalNavigationListener = () => {
    const pathname = usePathname()
    const prevPath = useRef(pathname)
    const startTime = useRef<number | null>(null)

    useEffect(() => {
        const originalStart = NProgress.start
        NProgress.start = () => {
            startTime.current = performance.now()
            return originalStart()
        }

        return () => {
            NProgress.start = originalStart
        }
    }, [])

    useEffect(() => {
        if (prevPath.current !== pathname) {
            const duration = performance.now() - (startTime.current ?? performance.now())
            console.log(`[Router] Переход занял ${duration.toFixed(0)}мс`)
            NProgress.done()
            startTime.current = null
            prevPath.current = pathname
        }
    }, [pathname])

    return null
}
