'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const pathName = usePathname()

    const pageTitles: { [key: string]: string } = {
        '/dashboard': 'Дашборд',
        '/users': 'Пользователи',
        '/projects': 'Проекты',
        '/staff': 'Персонал',
        '/settings': 'Настройки',
    }

    return (
        <header className='flex items-center justify-between'>
            <h1 className='text-3xl font-semibold text-[var(--secondary)]'>
                {pageTitles[pathName]}
            </h1>
        </header>
    )
}

export default React.memo(Header)
