import { type ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative min-h-screen flex items-center justify-center bg-[var(--background)] p-4 overflow-hidden'>
      {/* Dot grid */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.6,
        }}
      />

      {/* Glow orbs */}
      <div className='absolute -top-48 -right-48 w-[480px] h-[480px] rounded-full bg-[var(--info)]/10 blur-3xl pointer-events-none' />
      <div className='absolute -bottom-48 -left-48 w-[480px] h-[480px] rounded-full bg-indigo-500/8 blur-3xl pointer-events-none' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[var(--info)]/5 blur-[100px] pointer-events-none' />

      <div className='relative z-10 w-full flex items-center justify-center'>
        {children}
      </div>
    </div>
  )
}
