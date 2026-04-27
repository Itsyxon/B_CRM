'use client'
import { settingsDictionary } from '@/lib/dictionaries'
import { useSettings } from '@/context/SettingsContext'
import { SettingsTab } from '@/types/SettingsTypes'

interface SettingsTabsProps {
    activeTab: SettingsTab
    onTabChange: (tab: SettingsTab) => void
}

const SettingsTabs = ({ activeTab, onTabChange }: SettingsTabsProps) => {
    const { own } = useSettings()
    const d = settingsDictionary[own.language]

    const tabs: { value: SettingsTab; label: string }[] = [
        { value: 'own',    label: d.tabs.own },
        { value: 'common', label: d.tabs.common },
    ]

    const getTabClassName = (tabValue: SettingsTab) => {
        const base     = 'cursor-pointer rounded-t-lg py-2 px-6 transition-colors duration-200'
        const active   = 'bg-[var(--tertiary)] font-medium text-[var(--foreground)]'
        const inactive = 'bg-[var(--accent-gray)]/15 text-[var(--accent-gray)] hover:bg-[var(--accent-gray)]/25 hover:text-[var(--foreground)]'
        return `${base} ${activeTab === tabValue ? active : inactive}`
    }

    return (
        <div className='flex'>
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    onClick={() => onTabChange(tab.value)}
                    className={getTabClassName(tab.value)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}

export default SettingsTabs
