'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/shared/lib/utils'
import { Home, Rocket, DollarSign } from 'lucide-react'

const sections = [
  { id: 'hero', label: 'Главная', icon: <Home size={20} /> },
  { id: 'features', label: 'Предложение', icon: <Rocket size={20} /> },
  { id: 'pricing', label: 'Тарифы', icon: <DollarSign size={20} /> },
]


export const LandingHeader = () => {
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      const current = sections.findLast((section) => {
        const el = document.getElementById(section.id)
        return el && el.offsetTop <= scrollPosition
      })

      if (current) setActiveSection(current.id)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className='fixed z-50 flex h-[70px] w-full justify-center bg-black px-[30px]'>
      <div className='flex w-full max-w-screen-xl items-center justify-between font-semibold text-white'>
        <div className='flex items-center gap-2'>
          <Image src='/assets/icons/logo.svg' width={39} height={39} alt='logo' />
          <span>Creon.ai</span>
        </div>
        <div className='space-x-[40px] flex'>
          {sections.map(({ id, label, icon }) => (
              <button
                  key={id}
                  onClick={() => handleClick(id)}
                  className={cn(
                      'transition-colors flex items-center justify-center gap-1',
                      activeSection === id
                          ? 'text-white underline underline-offset-4'
                          : 'text-white/70 hover:text-white'
                  )}
              >
                <span className="sm:hidden">{icon}</span>

                <span className="hidden sm:inline">{label}</span>
              </button>
          ))}
        </div>
      </div>
    </header>
  )
}
