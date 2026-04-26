import Content from '@/components/atoms/Content'
import CommonForm from './CommonForm/CommonForm'

const SettingsCommon = () => {
  return (
    <Content className='w-full rounded-tl-none'>
      <h1 className='text-lg font-semibold text-[var(--foreground)]'>
        Общие настройки
      </h1>
      <CommonForm />
    </Content>
  )
}

export default SettingsCommon
