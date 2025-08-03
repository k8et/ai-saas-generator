'use client'

import { cn } from '@shared/lib/utils'
import * as React from 'react'

type TextareaBaseProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

interface TextareaProps extends TextareaBaseProps {
    name?: string
    label?: string
    error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ name, label, error, id, className, ...props }, ref) => {
        const textareaId = id || name

        return (
            <div className="flex w-full flex-col gap-1">
                {label && (
                    <label htmlFor={textareaId} className="text-muted-foreground text-sm font-medium">
                        {label}
                    </label>
                )}

                <textarea
                    id={textareaId}
                    name={name}
                    ref={ref}
                    aria-invalid={!!error || undefined}
                    data-slot="textarea"
                    className={cn(
                        'flex min-h-16 w-full resize-none rounded-lg border bg-transparent px-3 py-2 text-base  transition-[color,box-shadow] outline-none md:text-sm',
                        'placeholder:text-muted-foreground file:text-foreground',
                        'selection:bg-primary selection:text-primary-foreground',
                        'dark:bg-input/30',
                        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                        className
                    )}
                    {...props}
                />

                <p className="text-destructive min-h-[1.25rem] text-sm">{error}</p>
            </div>
        )
    }
)

Textarea.displayName = 'Textarea'

export { Textarea }
