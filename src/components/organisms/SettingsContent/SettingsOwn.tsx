'use client'
import Content from '@/components/atoms/Content'
import OwnForm from './OwnForm/OwnForm'
import { settingsDictionary } from '@/lib/dictionaries'
import { useSettings } from '@/context/SettingsContext'

const SettingsOwn = () => {
    const { own } = useSettings()
    const d = settingsDictionary[own.language]

    return (
        <Content className='w-full rounded-tl-none'>
            <h1 className='text-lg font-semibold text-[var(--foreground)]'>{d.ownTitle}</h1>
            <OwnForm />
        </Content>
    )
}

export default SettingsOwn
