'use client'

import {MouseEvent, ReactNode, AnchorHTMLAttributes, ForwardedRef, forwardRef} from 'react'
import Link, {LinkProps} from 'next/link'
import {usePathname} from 'next/navigation'
import NProgress from 'nprogress'
import {buttonVariants} from "@shared/components/ui";
import {VariantProps} from "class-variance-authority";

NProgress.configure({showSpinner: false})

type ButtonVariantProps = VariantProps<typeof buttonVariants>

interface ProgressLinkProps extends
    LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Partial<ButtonVariantProps> {
    children: ReactNode
}

export const ProgressLink = forwardRef(function ProgressLink(
    {href, onClick, children,variant,size, ...rest}: ProgressLinkProps,
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
        <Link  className={buttonVariants({ variant, size })} href={href} ref={ref} onClick={handleClick} {...rest}>
            {children}
        </Link>
    )
})
