import { ReactNode } from 'react'
import { Sidebar } from '@/app/dashboard/sidebar'
import { ThemeProvider } from '@shared/provider'

export default  function Layout({ children }: { children: ReactNode }) {

  return (
    <div className='flex min-h-screen'>
      <Sidebar/>
      <main className='flex-1 p-6'><ThemeProvider>{children}</ThemeProvider></main>
    </div>
  )
}
