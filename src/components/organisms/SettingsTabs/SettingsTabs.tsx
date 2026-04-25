import { SettingsTab } from '@/types/SettingsTypes';
import React from 'react';

interface SettingsTabsProps {
    activeTab: SettingsTab;
    onTabChange: (tab: SettingsTab) => void;
}

const SettingsTabs = ({ activeTab, onTabChange }: SettingsTabsProps) => {
    const tabs: { value: SettingsTab; label: string }[] = [
        { value: 'own', label: 'Личные' },
        { value: 'common', label: 'Общие' },
    ];

    const getTabClassName = (tabValue: SettingsTab) => {
        const baseClasses = 'cursor-pointer rounded-t-lg py-2 px-6 transition-colors duration-200';
        const activeClasses = 'bg-[var(--tertiary)] font-medium text-[var(--foreground)]';
        const inactiveClasses = 'bg-[var(--accent-gray)]/15 text-[var(--accent-gray)] hover:bg-[var(--accent-gray)]/25 hover:text-[var(--foreground)]';

        return `${baseClasses} ${activeTab === tabValue ? activeClasses : inactiveClasses}`;
    };

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
    );
};

export default SettingsTabs;