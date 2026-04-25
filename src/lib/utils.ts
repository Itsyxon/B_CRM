import LocalStorage from './LocalStorage'
import { OwnSettings, OWN_SETTINGS_KEY } from '@/types/SettingsTypes'

export const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

export function hidePrice(price: string | number): string | number {
  const settings = LocalStorage.get<OwnSettings>(OWN_SETTINGS_KEY)
  if (settings?.hideAmounts) {
    return '****'
  }
  return price
}
