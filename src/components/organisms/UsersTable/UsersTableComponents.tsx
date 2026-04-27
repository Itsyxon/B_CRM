'use client'
import { useRef, useState } from 'react'
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
import { useSettings } from '@/context/SettingsContext'
import { usersDictionary, localeMap } from '@/lib/dictionaries'

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
  const { own } = useSettings()
  const d = usersDictionary[own.language].actions

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

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOpen(false)
    }
  }

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
      onMouseDown={(e) => e.preventDefault()}
    >
      <button className={item} onClick={() => setOpen(false)}>
        <UserPlus size={14} className='text-[var(--info)] shrink-0' />
        {d.invite}
      </button>
      <button className={item} onClick={() => setOpen(false)}>
        <User size={14} className='text-[var(--accent-gray)] shrink-0' />
        {d.openProfile}
      </button>
      <a
        href={`mailto:${user.email}`}
        className={item}
        onClick={() => setOpen(false)}
      >
        <Mail size={14} className='text-[var(--accent-gray)] shrink-0' />
        {d.sendEmail}
      </a>
      <button className={item} onClick={() => setOpen(false)}>
        <FolderPlus size={14} className='text-[var(--accent-gray)] shrink-0' />
        {d.addToProject}
      </button>
      <button className={item} onClick={handleCopyEmail}>
        <Copy size={14} className='text-[var(--accent-gray)] shrink-0' />
        {copied ? d.copied : d.copyEmail}
      </button>
      <div className='my-1 border-t border-[var(--border)]' />
      <button className={danger} onClick={() => setOpen(false)}>
        <ShieldOff size={14} className='shrink-0' />
        {d.block}
      </button>
    </div>
  ) : null

  return (
    <>
      <div tabIndex={-1} className='outline-none' onBlur={handleBlur}>
        <button
          ref={btnRef}
          onClick={handleToggle}
          className='w-8 h-8 flex items-center justify-center rounded-lg text-[var(--accent-gray)] hover:text-[var(--secondary)] hover:bg-[var(--navbar)] transition-colors cursor-pointer'
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
      {open && createPortal(dropdown, document.body)}
    </>
  )
}

type UsersDictionary = typeof usersDictionary['ru']

export const makeUserColumns = (d: UsersDictionary, locale: string): ColumnDef<UserType>[] => [
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
    header: d.columns.user,
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
    header: d.columns.registered,
    cell: (info) => (
      <span className='text-[var(--accent-gray)] text-sm'>
        {new Date(info.getValue() as string).toLocaleDateString(locale, {
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

