import LocalStorage from './LocalStorage'

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
  if (LocalStorage.get('SETTINGS_PRICE')) {
    return '****'
  }
  return price
}
