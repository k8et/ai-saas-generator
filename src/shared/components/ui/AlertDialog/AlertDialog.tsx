'use client'

import * as React from 'react'
import { Button } from '@shared/components/ui'
import { ModalWrapper } from '@shared/components/ui/ModalWrapper'

interface AlertDialogProps {
  open: boolean
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

export function AlertDialog({
  open,
  title = 'Вы уверены?',
  description = '',
  confirmText = 'Да',
  cancelText = 'Нет',
  onConfirm,
  onCancel,
}: AlertDialogProps) {
  return (
    <ModalWrapper
      isOpen={open}
      onOpenChangeAction={onCancel}
      from='top'
      header={title}
      body={description && <p className='text-muted-foreground mt-2 text-sm'>{description}</p>}
      footer={
        <div className='flex gap-2'>
          <Button type="button" variant='outline' onClick={onCancel}>
            {cancelText}
          </Button>
          <Button type="button" onClick={onConfirm}>{confirmText}</Button>
        </div>
      }
    />
  )
}
