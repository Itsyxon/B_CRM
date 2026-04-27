'use client'
import { headerDictionary } from '@/lib/dictionaries'
import { useSettings } from '@/context/SettingsContext'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const pathName = usePathname()
    const { own } = useSettings()
    const pageTitles = headerDictionary[own.language]
    const pageName = pageTitles[pathName]

    return (
        <header className='flex flex-col mb-4'>
            <h1 className='text-3xl font-semibold text-secondary'>
                {pageName.title}
            </h1>
            <h2 className='text-md text-[var(--accent-gray)] font-semibold'>{pageName?.subTitle}</h2>
        </header>
    )
}

export default React.memo(Header)
