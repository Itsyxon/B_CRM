'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import LocalStorage from '@/lib/LocalStorage'

const LS_KEY = 'nav_collapsed'

type Ctx = { isCollapsed: boolean; toggle: () => void }

const NavCollapseContext = createContext<Ctx>({
  isCollapsed: false,
  toggle: () => {},
})

export function NavCollapseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    if (LocalStorage.get<boolean>(LS_KEY) === true) setIsCollapsed(true)
  }, [])

  const toggle = () => {
    setIsCollapsed((prev) => {
      const next = !prev
      LocalStorage.set(LS_KEY, next)
      return next
    })
  }

  return (
    <NavCollapseContext.Provider value={{ isCollapsed, toggle }}>
      {children}
    </NavCollapseContext.Provider>
  )
}

export const useNavCollapse = () => useContext(NavCollapseContext)
