'use client'

import Logo from '@/components/atoms/Logo'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HomeIcon, ArrowLeftIcon, SearchIcon, ZapIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

const NotFoundPage = () => {
  const router = useRouter()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-[var(--background)] via-[var(--tertiary)] to-[var(--background)] relative overflow-hidden'>
      {/* Анимированный градиентный шар, следующий за курсором */}
      <div
        className='absolute w-64 h-64 bg-[var(--info)]/10 rounded-full blur-3xl pointer-events-none transition-transform duration-300 ease-out'
        style={{
          transform: `translate(${mousePosition.x - 128}px, ${mousePosition.y - 128}px)`,
        }}
      />

      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-[var(--info)]/5 rounded-full blur-3xl' />
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl' />
      </div>

      <div className='relative w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500'>
        <div className='bg-[var(--tertiary)] rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden'>
          <div className='bg-gradient-to-br from-[var(--info)] to-blue-700 px-8 py-12 text-center relative overflow-hidden'>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg" />

            <div className='relative z-10'>
              <Logo className='mx-auto brightness-0 invert' />
              <div className='mt-6 flex flex-col items-center gap-2'>
                <div className='text-8xl font-black text-white tracking-tighter animate-bounce'>
                  404
                </div>
                <div className='flex items-center gap-2'>
                  <ZapIcon
                    size={14}
                    className='text-yellow-300 fill-yellow-300'
                  />
                  <span className='text-white/80 text-sm font-medium'>
                    Страница потерялась
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='p-7'>
            <div className='text-center mb-8'>
              <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--info)]/10 flex items-center justify-center animate-pulse'>
                <SearchIcon size={28} className='text-[var(--info)]' />
              </div>
              <p className='text-sm text-[var(--accent-gray)] leading-relaxed'>
                Кажется, мы не можем найти то, что вы ищете.
                <br />
                Возможно, страница была удалена или перемещена
              </p>
            </div>

            <div className='flex flex-col gap-3'>
              <button
                onClick={() => router.back()}
                className='flex items-center justify-center gap-2 w-full py-2.5 bg-[var(--tertiary)] border border-[var(--border)] text-[var(--foreground)] rounded-lg text-sm font-medium hover:bg-[var(--background)] hover:border-[var(--info)]/30 transition-all cursor-pointer group'
              >
                <ArrowLeftIcon
                  size={16}
                  className='group-hover:-translate-x-0.5 transition-transform'
                />
                Вернуться назад
              </button>

              <Link
                href='/'
                className='flex items-center justify-center gap-2 w-full py-2.5 bg-[var(--info)] text-white rounded-lg text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all'
              >
                <HomeIcon size={16} />
                На главную
              </Link>
            </div>

            <div className='mt-6 flex items-center justify-center gap-2 text-xs text-[var(--accent-gray)]'>
              <span>✨</span>
              <span>Попробуйте начать с главной страницы</span>
            </div>
          </div>
        </div>

        <p className='text-center text-xs text-[var(--accent-gray)]/60 mt-6'>
          Ошибка 404 · Страница не найдена
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
