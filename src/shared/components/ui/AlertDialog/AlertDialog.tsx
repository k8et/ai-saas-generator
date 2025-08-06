'use client';

import * as React from 'react';
import {Button, Dialog, DialogBackdrop, DialogFooter, DialogPanel, DialogTitle} from "@shared/components/ui";

interface AlertDialogProps {
    open: boolean;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
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
    <Dialog open={open} onClose={onCancel}>
      <DialogBackdrop />
      <DialogPanel from='top'>
        <DialogTitle>{title}</DialogTitle>
        {description && <p className='text-muted-foreground mt-2 text-sm'>{description}</p>}
        <DialogFooter className='mt-4'>
          <Button variant='outline' onClick={onCancel}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </DialogFooter>
      </DialogPanel>
    </Dialog>
  )
}
