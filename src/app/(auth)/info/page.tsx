import BackButton from '@/components/molecules/BackButton'
import { Github, InfoIcon, KeyIcon } from 'lucide-react'

const InfoPage = () => {
  return (
    <div className='w-full max-w-lg'>
      <div className='bg-[var(--tertiary)] rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden'>
        <div className='bg-gradient-to-br from-[var(--info)] to-blue-700 px-8 py-7 text-center'>
          <h1 className='text-white text-3xl font-bold tracking-tight'>
            B-CRM
          </h1>
          <p className='text-white/60 text-sm mt-1'>Система управления</p>
        </div>

        <div className='p-7'>
          <div className='flex items-center gap-2 mb-4'>
            <InfoIcon size={18} className='text-[var(--info)]' />
            <h2 className='text-lg font-semibold text-[var(--foreground)]'>
              Информация
            </h2>
          </div>

          <p className='text-sm text-[var(--accent-gray)] leading-relaxed mb-6'>
            B-CRM — тестовый проект, напоминающий CRM-панель компании, но не
            являющийся полноценным продуктом. Используется только в формате
            разработки.
          </p>

          <div className='bg-[var(--info)]/8 border border-[var(--info)]/20 rounded-xl p-4 mb-6'>
            <p className='text-xs text-[var(--info)] font-medium mb-3 flex items-center gap-1.5'>
              <KeyIcon size={12} />
              Данные для тестового входа
            </p>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-3'>
                <span className='text-xs text-[var(--accent-gray)] w-14 shrink-0'>
                  Логин:
                </span>
                <code className='text-sm font-mono bg-[var(--background)] text-[var(--foreground)] px-2.5 py-0.5 rounded-md border border-[var(--border)]'>
                  admin
                </code>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-xs text-[var(--accent-gray)] w-14 shrink-0'>
                  Пароль:
                </span>
                <code className='text-sm font-mono bg-[var(--background)] text-[var(--foreground)] px-2.5 py-0.5 rounded-md border border-[var(--border)]'>
                  admin1
                </code>
              </div>
            </div>
          </div>

          <a
            href='https://github.com/itsyxon'
            target='_blank'
            rel='noopener noreferrer'
            className='group flex items-center justify-between w-full px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--navbar)] hover:border-[var(--info)]/50 hover:bg-[var(--info)]/5 transition-all'
          >
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-lg bg-[var(--foreground)] flex items-center justify-center shrink-0 group-hover:bg-[var(--info)] transition-colors'>
                <Github size={16} className='text-[var(--background)]' />
              </div>
              <div>
                <p className='text-sm font-semibold text-[var(--foreground)] leading-none mb-0.5'>
                  itsyxon
                </p>
                <p className='text-xs text-[var(--accent-gray)]'>Автор проекта</p>
              </div>
            </div>
            <span className='text-xs text-[var(--accent-gray)] group-hover:text-[var(--info)] transition-colors'>
              github.com →
            </span>
          </a>

          <BackButton className='w-full justify-center' />
        </div>
      </div>
    </div>
  )
}

export default InfoPage
