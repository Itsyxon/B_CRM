'use client'
import React, { useCallback, useState } from 'react';
import SettingsTabs from '../SettingsTabs/SettingsTabs';
import SettingsCommon from '../SettingsContent/SettingsCommon';
import SettingsOwn from '../SettingsContent/SettingsOwn';
import { SettingsTab } from '@/types/SettingsTypes';

const SettingsField = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('own');

    const handleTabChange = useCallback((tab: SettingsTab) => {
        setActiveTab(tab);
    }, []);

    return (
        <div>
            <SettingsTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />
            <div className=''>
                {activeTab === 'common' && <SettingsCommon />}
                {activeTab === 'own' && <SettingsOwn />}
            </div>
        </div>
    );
};

export default SettingsField;