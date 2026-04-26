'use client'
import { useNavCollapse } from '@/context/NavCollapseContext'

export default function NavContentArea({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useNavCollapse()
    return (
        <div className={`transition-[margin-left] duration-300 ease-in-out ${isCollapsed ? 'md:ml-[64px]' : 'md:ml-[250px]'}`}>
            {children}
        </div>
    )
}
