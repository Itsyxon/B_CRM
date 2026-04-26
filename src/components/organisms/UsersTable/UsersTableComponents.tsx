'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { UserType } from '@/types/UserTypes'
import { ColumnDef } from '@tanstack/react-table'
import {
  MoreHorizontal,
  UserPlus,
  User,
  Mail,
  FolderPlus,
  Copy,
  ShieldOff,
} from 'lucide-react'

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-violet-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-indigo-500',
  'bg-teal-500',
]

const getInitials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

const getAvatarColor = (id: number) => AVATAR_COLORS[id % AVATAR_COLORS.length]

const UsersActionsCell = ({ user }: { user: UserType }) => {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [dropPos, setDropPos] = useState({ top: 0, right: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect()
      setDropPos({ top: r.bottom + 4, right: window.innerWidth - r.right })
    }
    setOpen((p) => !p)
  }

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    document.addEventListener('mousedown', close)
    window.addEventListener('scroll', close, true)
    return () => {
      document.removeEventListener('mousedown', close)
      window.removeEventListener('scroll', close, true)
    }
  }, [open])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
    setOpen(false)
  }

  const item =
    'flex items-center whitespace-nowrap gap-2.5 w-full px-3 py-2 text-sm text-[var(--secondary)] hover:bg-[var(--navbar)] transition-colors cursor-pointer rounded-md'
  const danger =
    'flex items-center gap-2.5 w-full px-3 py-2 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer rounded-md'

  const dropdown = open ? (
    <div
      className='fixed z-[200] w-56 bg-[var(--tertiary)] border border-[var(--border)] rounded-xl shadow-xl py-1.5 px-1'
      style={{ top: dropPos.top, right: dropPos.right }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button className={item} onClick={() => setOpen(false)}>
        <UserPlus size={14} className='text-[var(--info)] shrink-0' />
        Пригласить в компанию
      </button>
      <button className={item} onClick={() => setOpen(false)}>
        <User size={14} className='text-[var(--accent-gray)] shrink-0' />
        Открыть профиль
      </button>
      <a
        href={`mailto:${user.email}`}
        className={item}
        onClick={() => setOpen(false)}
      >
        <Mail size={14} className='text-[var(--accent-gray)] shrink-0' />
        Написать письмо
      </a>
      <button className={item} onClick={() => setOpen(false)}>
        <FolderPlus size={14} className='text-[var(--accent-gray)] shrink-0' />
        Добавить в проект
      </button>
      <button className={item} onClick={handleCopyEmail}>
        <Copy size={14} className='text-[var(--accent-gray)] shrink-0' />
        {copied ? 'Скопировано!' : 'Скопировать email'}
      </button>
      <div className='my-1 border-t border-[var(--border)]' />
      <button className={danger} onClick={() => setOpen(false)}>
        <ShieldOff size={14} className='shrink-0' />
        Заблокировать
      </button>
    </div>
  ) : null

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className='w-8 h-8 flex items-center justify-center rounded-lg text-[var(--accent-gray)] hover:text-[var(--secondary)] hover:bg-[var(--navbar)] transition-colors cursor-pointer'
      >
        <MoreHorizontal size={16} />
      </button>
      {createPortal(dropdown, document.body)}
    </>
  )
}

export const userColumns: ColumnDef<UserType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 60,
    cell: (info) => (
      <span className='text-xs font-mono text-[var(--accent-gray)]'>
        #{info.getValue() as number}
      </span>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Пользователь',
    cell: (info) => {
      const name = info.getValue() as string
      const id = info.row.original.id
      return (
        <div className='flex items-center gap-3'>
          <div
            className={`w-8 h-8 rounded-full ${getAvatarColor(id)} flex items-center justify-center shrink-0`}
          >
            <span className='text-white text-xs font-semibold'>
              {getInitials(name)}
            </span>
          </div>
          <span className='font-medium text-[var(--secondary)]'>{name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => (
      <span className='text-[var(--accent-gray)] text-sm'>
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Регистрация',
    cell: (info) => (
      <span className='text-[var(--accent-gray)] text-sm'>
        {new Date(info.getValue() as string).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </span>
    ),
  },
  {
    id: 'actions',
    header: '',
    size: 48,
    cell: (info) => <UsersActionsCell user={info.row.original} />,
  },
]
