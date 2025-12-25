'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const pathName = usePathname()

    const pageTitles: Record<string, { title: string, subTitle?: string }> = {
        '/dashboard': {
            title: 'Дашборд',
        },
        '/users': {
            title: 'Пользователи',
            subTitle: 'Список всех открытых пользователей платформы'
        },
        '/projects': {
            title: 'Проекты',
            subTitle: 'Проекты вашей компании'
        },
        '/staff': {
            title: 'Персонал',
            subTitle: 'Персонал вашей компании'
        },
        '/settings': {
            title: 'Настройки',
        },
        '/help': {
            title: 'Связаться с нами'
        },
        '/profile': {
            title: 'Профиль'
        },
        '/search': {
            title: 'Поиск'
        }
    }

    const pageName = pageTitles[pathName]

    return (
        <header className='flex flex-col mb-4'>
            <h1 className='text-3xl font-semibold text-[var(--secondary)]'>
                {pageName.title}
            </h1>
            <h2 className='text-md text-gray-500'>{pageName?.subTitle}</h2>
        </header>
    )
}

export default React.memo(Header)
