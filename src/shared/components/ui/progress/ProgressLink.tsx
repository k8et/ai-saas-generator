'use client'

import {MouseEvent, ReactNode, AnchorHTMLAttributes, ForwardedRef, forwardRef} from 'react'
import Link, {LinkProps} from 'next/link'
import {usePathname} from 'next/navigation'
import NProgress from 'nprogress'

NProgress.configure({showSpinner: false})

interface ProgressLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    children: ReactNode
}

export const ProgressLink = forwardRef(function ProgressLink(
    {href, onClick, children, ...rest}: ProgressLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>
) {
    const pathname = usePathname()

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return

        if (pathname === href || pathname === (typeof href === 'object' ? href.pathname : '')) {
            return
        }

        NProgress.start()
        onClick?.(e)
    }

    return (
        <Link href={href} ref={ref} onClick={handleClick} {...rest}>
            {children}
        </Link>
    )
})
