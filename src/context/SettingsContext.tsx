'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import LocalStorage from '@/lib/LocalStorage'
import {
    CommonSettings, OwnSettings,
    COMMON_SETTINGS_KEY, OWN_SETTINGS_KEY,
    defaultCommonSettings, defaultOwnSettings,
} from '@/types/SettingsTypes'

interface SettingsContextType {
    own: OwnSettings
    common: CommonSettings
    updateOwn: (settings: OwnSettings) => void
    updateCommon: (settings: CommonSettings) => void
}

const SettingsContext = createContext<SettingsContextType | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [own, setOwn] = useState<OwnSettings>(defaultOwnSettings)
    const [common, setCommon] = useState<CommonSettings>(defaultCommonSettings)

    useEffect(() => {
        const savedOwn = LocalStorage.get<OwnSettings>(OWN_SETTINGS_KEY)
        const savedCommon = LocalStorage.get<CommonSettings>(COMMON_SETTINGS_KEY)
        if (savedOwn) {
            setOwn({ ...defaultOwnSettings, ...savedOwn })
        }
        if (savedCommon) {
            setCommon({ ...defaultCommonSettings, ...savedCommon })
        }
    }, [])

    useEffect(() => {
        if (own.theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [own.theme])

    const updateOwn = (settings: OwnSettings) => {
        setOwn(settings)
        LocalStorage.set(OWN_SETTINGS_KEY, settings)
    }

    const updateCommon = (settings: CommonSettings) => {
        setCommon(settings)
        LocalStorage.set(COMMON_SETTINGS_KEY, settings)
    }

    return (
        <SettingsContext.Provider value={{ own, common, updateOwn, updateCommon }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    const ctx = useContext(SettingsContext)
    if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
    return ctx
}
