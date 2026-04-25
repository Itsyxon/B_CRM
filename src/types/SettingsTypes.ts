export type SettingsTab = 'own' | 'common'
export type Theme = 'light' | 'dark'
export type Language = 'ru' | 'en'

export interface OwnSettings {
    theme: Theme
    language: Language
    dealStatusesVisible: boolean
    tagsAndCategories: boolean
    hideAmounts: boolean
    twoFactorAuth: boolean
    autoLogout: boolean
    notifyProjects: boolean
    notifyPayments: boolean
    notifySubscriptions: boolean
}

export interface CommonSettings {
    companyName: string
    hideCompanyName: boolean
    hideEmployeeCount: boolean
    hideDealCount: boolean
    privateProfile: boolean
    autoHideExpiredProjects: boolean
}

export const OWN_SETTINGS_KEY = 'SETTINGS_OWN'
export const COMMON_SETTINGS_KEY = 'SETTINGS_COMMON'

export const defaultOwnSettings: OwnSettings = {
    theme: 'light',
    language: 'ru',
    dealStatusesVisible: true,
    tagsAndCategories: false,
    hideAmounts: false,
    twoFactorAuth: false,
    autoLogout: false,
    notifyProjects: true,
    notifyPayments: true,
    notifySubscriptions: false,
}

export const defaultCommonSettings: CommonSettings = {
    companyName: '',
    hideCompanyName: false,
    hideEmployeeCount: false,
    hideDealCount: false,
    privateProfile: false,
    autoHideExpiredProjects: false,
}
