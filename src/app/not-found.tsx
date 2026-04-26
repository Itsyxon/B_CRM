'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Home,
  LayoutDashboard,
  FolderOpen,
  Users,
  Search,
} from 'lucide-react'
import { useEffect, useState } from 'react'

const quickLinks = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Дашборд' },
  { href: '/projects', icon: FolderOpen, label: 'Проекты' },
  { href: '/staff', icon: Users, label: 'Сотрудники' },
  { href: '/search', icon: Search, label: 'Поиск' },
]

const NotFoundPage = () => {
  const router = useRouter()
  const [pos, setPos] = useState({ x: -999, y: -999 })

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--background)] relative overflow-hidden'>
      <div
        className='fixed w-[500px] h-[500px] rounded-full blur-[120px] bg-[var(--info)]/8 pointer-events-none transition-transform duration-700 ease-out'
        style={{ transform: `translate(${pos.x - 250}px, ${pos.y - 250}px)` }}
      />
      <div className='absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--info)]/6 blur-3xl pointer-events-none' />
      <div className='absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-500/6 blur-3xl pointer-events-none' />
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.6,
        }}
      />

      <div className='relative z-10 flex flex-col items-center text-center w-full max-w-lg'>
        <Link
          href='/'
          className='mb-10 text-[var(--info)] text-2xl font-black tracking-tight hover:opacity-75 transition-opacity'
        >
          B-CRM
        </Link>

        <div className='relative select-none mb-4'>
          <span className='text-[clamp(6.5rem,22vw,11rem)] font-black leading-none tracking-tighter bg-gradient-to-br from-[var(--info)] via-blue-400 to-indigo-500 bg-clip-text text-transparent'>
            404
          </span>
          <span
            aria-hidden
            className='absolute inset-0 text-[clamp(6.5rem,22vw,11rem)] font-black leading-none tracking-tighter text-[var(--foreground)]/[0.035] translate-y-3 select-none'
          >
            404
          </span>
        </div>

        <h1 className='text-2xl sm:text-3xl font-bold text-[var(--secondary)] mb-3'>
          Страница не найдена
        </h1>
        <p className='text-sm sm:text-base text-[var(--accent-gray)] leading-relaxed mb-10 max-w-sm'>
          Эта страница была удалена, перемещена или никогда не существовала.
          Воспользуйтесь кнопками ниже, чтобы вернуться в систему.
        </p>

        <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-10'>
          <button
            onClick={() => router.back()}
            className='flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--tertiary)] text-[var(--foreground)] text-sm font-medium hover:border-[var(--info)]/50 hover:bg-[var(--navbar)] transition-all cursor-pointer group'
          >
            <ArrowLeft
              size={15}
              className='group-hover:-translate-x-0.5 transition-transform'
            />
            Вернуться назад
          </button>
          <Link
            href='/'
            className='flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--info)] text-white text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all'
          >
            <Home size={15} />
            На главную
          </Link>
        </div>

        <div className='flex items-center gap-3 w-full mb-5'>
          <div className='flex-1 h-px bg-[var(--border)]' />
          <span className='text-xs text-[var(--accent-gray)]'>
            Быстрые ссылки
          </span>
          <div className='flex-1 h-px bg-[var(--border)]' />
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 w-full'>
          {quickLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className='flex flex-col items-center gap-2.5 py-4 px-3 rounded-xl bg-[var(--tertiary)] border border-[var(--border)] text-[var(--accent-gray)] hover:border-[var(--info)]/40 hover:text-[var(--info)] hover:bg-[var(--navbar)] transition-all group'
            >
              <Icon
                size={18}
                className='transition-transform group-hover:scale-110 duration-150'
              />
              <span className='text-xs font-medium'>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <p className='relative z-10 mt-12 text-xs text-[var(--accent-gray)]/40'>
        B-CRM · Ошибка 404
      </p>
    </div>
  )
}

export default NotFoundPage
