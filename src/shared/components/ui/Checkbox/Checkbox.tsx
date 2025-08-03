'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@shared/lib/utils'

type CheckboxProps = Omit<
    React.ComponentProps<typeof CheckboxPrimitive.Root>,
    'asChild'
> & {
    motionProps?: HTMLMotionProps<'button'>
    onCheckedChange?: (checked: CheckboxPrimitive.CheckedState) => void
    label?: string
    error?: string
    name?: string
    id?: string
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
    ({ className, onCheckedChange, motionProps, label, error, name, id, checked, defaultChecked, ...props }, ref) => {
        const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false)

        const isControlled = checked !== undefined
        const isChecked = isControlled ? checked : internalChecked

        const handleCheckedChange = (checked: CheckboxPrimitive.CheckedState) => {
            if (!isControlled) {
                setInternalChecked(checked === true)
            }
            onCheckedChange?.(checked)
        }

        const checkboxId = id ?? name ?? `checkbox-${Math.random().toString(36).slice(2, 9)}`

        return (
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <CheckboxPrimitive.Root
                        data-slot="checkbox"
                        asChild
                        name={name}
                        id={checkboxId}
                        checked={isControlled ? checked : undefined}
                        defaultChecked={defaultChecked}
                        onCheckedChange={handleCheckedChange}
                        aria-invalid={!!error || undefined}
                        {...props}
                    >
                        <motion.button
                            ref={ref}
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                            {...motionProps}
                            className={cn(
                                'peer focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex shrink-0 items-center justify-center transition-colors duration-500 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
                                'bg-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground size-5 rounded-sm focus-visible:ring-offset-2',
                                className
                            )}
                        >
                            <CheckboxPrimitive.Indicator
                                data-slot="checkbox-indicator"
                                className="flex items-center justify-center text-current transition-none"
                            >
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    className="size-3.5"
                                    initial="unchecked"
                                    animate={isChecked ? 'checked' : 'unchecked'}
                                >
                                    <motion.path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                        variants={{
                                            checked: {
                                                pathLength: 1,
                                                opacity: 1,
                                                transition: {
                                                    duration: 0.2,
                                                    delay: 0.2,
                                                },
                                            },
                                            unchecked: {
                                                pathLength: 0,
                                                opacity: 0,
                                                transition: {
                                                    duration: 0.2,
                                                },
                                            },
                                        }}
                                    />
                                </motion.svg>
                            </CheckboxPrimitive.Indicator>
                        </motion.button>
                    </CheckboxPrimitive.Root>

                    {label && (
                        <label htmlFor={checkboxId} className="text-foreground text-sm font-medium">
                            {label}
                        </label>
                    )}
                </div>

                <p className="text-destructive min-h-[1.25rem] text-sm">{error}</p>
            </div>
        )
    }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox, type CheckboxProps }
