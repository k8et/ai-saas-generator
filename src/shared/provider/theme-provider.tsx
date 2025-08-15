'use client'

import {ThemeProvider as NextProvider} from 'next-themes'
import { ReactNode} from 'react'
export function ThemeProvider({children}: { children: ReactNode }) {
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