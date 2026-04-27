'use client'
import Content from '@/components/atoms/Content'
import CommonForm from './CommonForm/CommonForm'
import { settingsDictionary } from '@/lib/dictionaries'
import { useSettings } from '@/context/SettingsContext'

const SettingsCommon = () => {
    const { own } = useSettings()
    const d = settingsDictionary[own.language]

    return (
        <Content className='w-full rounded-tl-none'>
            <h1 className='text-lg font-semibold text-[var(--foreground)]'>{d.commonTitle}</h1>
            <CommonForm />
        </Content>
    )
}

export default SettingsCommon
