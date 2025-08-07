import { useCallback, useState } from 'react'

interface UseDiscloseProps {
    defaultIsOpen?: boolean
    onOpen?(): void
    onClose?(): void
}

export const useDisclose = ({ defaultIsOpen = false, onOpen, onClose }: UseDiscloseProps = {}) => {
    const [isOpen, setIsOpen] = useState(defaultIsOpen)

    const open = useCallback(() => {
        onOpen?.()
        setIsOpen(true)
    }, [onOpen])

    const close = useCallback(() => {
        onClose?.()
        setIsOpen(false)
    }, [onClose])

    const toggle = useCallback(() => {
        if (isOpen) {
            close()
        } else {
            open()
        }
    }, [isOpen, open, close])


    return {
        isOpen,
        open,
        close,
        toggle,
    }
}
