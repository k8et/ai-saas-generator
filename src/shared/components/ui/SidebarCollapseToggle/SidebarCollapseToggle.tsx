'use client'

import { useEffect, useState } from 'react'
import { PanelIcon } from '@/shared/icons'



export const SidebarCollapseToggle = () => {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved === 'true') {
      setCollapsed(true)
    }
  }, [])

  const handleToggle = () => {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('sidebar-collapsed', String(next))
  }

  return (
    <button onClick={handleToggle}>
      <PanelIcon width={20} height={20} />
    </button>
  )
}
