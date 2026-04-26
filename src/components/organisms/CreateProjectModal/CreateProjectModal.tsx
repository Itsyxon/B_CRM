'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Briefcase, CheckCircle2, Search } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useStaff } from '@/app/api/staff/useStaff'
import { Project, ProjectPriority, ProjectStatus } from '@/types/ProjectTypes'
import { UserType } from '@/types/UserTypes'

interface Props {
  onClose: () => void
}

const PRIORITIES: {
  value: ProjectPriority
  label: string
  active: string
  idle: string
}[] = [
  {
    value: 'low',
    label: 'Низкий',
    active: 'bg-[var(--info)] text-white',
    idle: 'text-slate-500 hover:bg-[var(--navbar)]',
  },
  {
    value: 'medium',
    label: 'Средний',
    active: 'bg-[var(--info)] text-white',
    idle: 'text-amber-500 hover:bg-[var(--navbar)]',
  },
  {
    value: 'high',
    label: 'Высокий',
    active: 'bg-[var(--info)] text-white',
    idle: 'text-rose-500 hover:bg-[var(--navbar)]',
  },
]

const STATUSES: { value: ProjectStatus; label: string }[] = [
  { value: 'active', label: 'Активный' },
  { value: 'paused', label: 'На паузе' },
]

const field =
  'w-full px-3 py-2.5 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--info)] focus:ring-2 focus:ring-[var(--info)]/15 transition-all text-[var(--foreground)] placeholder:text-[var(--accent-gray)]'
const label =
  'block text-xs font-semibold text-[var(--accent-gray)] uppercase tracking-wide mb-1.5'

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// ── Assignee combobox ─────────────────────────────────────────────────────────
interface ComboboxProps {
  staff: UserType[]
  value: UserType | null
  onChange: (v: UserType | null) => void
}

const AssigneeCombobox = ({ staff, value, onChange }: ComboboxProps) => {
  const [search, setSearch] = useState(value?.name ?? '')
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = search.trim()
    ? staff.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    : staff

  const openDrop = () => {
    if (wrapRef.current) setRect(wrapRef.current.getBoundingClientRect())
    setOpen(true)
    setActiveIdx(-1)
  }

  const pick = (s: UserType) => {
    onChange(s)
    setSearch(s.name)
    setOpen(false)
  }

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
    setSearch('')
    setOpen(false)
    setTimeout(() => {
      openDrop()
      inputRef.current?.focus()
    }, 0)
  }

  // close on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  // close on scroll (dropdown is fixed-positioned)
  useEffect(() => {
    if (!open) return
    const fn = () => setOpen(false)
    document.addEventListener('scroll', fn, true)
    return () => document.removeEventListener('scroll', fn, true)
  }, [open])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        openDrop()
        setActiveIdx(0)
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIdx >= 0 && filtered[activeIdx]) pick(filtered[activeIdx])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const isSelected = !!value && search === value.name

  return (
    <div ref={wrapRef}>
      <div
        className={`${field} flex items-center gap-2 cursor-text ${open ? 'border-[var(--info)] ring-2 ring-[var(--info)]/15' : ''}`}
        onClick={() => {
          if (!open) {
            openDrop()
            inputRef.current?.focus()
          }
        }}
      >
        {isSelected && (
          <div className='w-5 h-5 rounded-full bg-[var(--info)]/20 flex items-center justify-center text-[9px] font-bold text-[var(--info)] shrink-0'>
            {initials(value!.name)}
          </div>
        )}
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => {
            const v = e.target.value
            setSearch(v)
            if (value && v !== value.name) onChange(null)
            if (!open) openDrop()
            setActiveIdx(-1)
          }}
          onFocus={openDrop}
          onKeyDown={onKeyDown}
          placeholder='Поиск по имени...'
          className='flex-1 min-w-0 bg-transparent outline-none text-sm text-[var(--foreground)] placeholder:text-[var(--accent-gray)]'
        />
        {isSelected ? (
          <button
            type='button'
            onClick={clear}
            className='shrink-0 text-[var(--accent-gray)] hover:text-[var(--foreground)] transition-colors cursor-pointer'
          >
            <X size={13} />
          </button>
        ) : (
          <Search
            size={13}
            className='shrink-0 text-[var(--accent-gray)] pointer-events-none'
          />
        )}
      </div>

      {open &&
        rect &&
        createPortal(
          <div
            className='fixed z-[200] bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden'
            style={{ top: rect.bottom + 4, left: rect.left, width: rect.width }}
          >
            {filtered.length === 0 ? (
              <p className='px-3 py-3 text-sm text-[var(--accent-gray)] text-center'>
                Не найдено
              </p>
            ) : (
              <ul className='max-h-[200px] overflow-y-auto'>
                {filtered.map((s, i) => (
                  <li key={s.id}>
                    <button
                      type='button'
                      onMouseDown={() => pick(s)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors cursor-pointer ${
                        i === activeIdx
                          ? 'bg-[var(--info)]/10'
                          : 'hover:bg-[var(--border)]'
                      }`}
                    >
                      <div className='w-7 h-7 rounded-full bg-[var(--info)]/15 flex items-center justify-center shrink-0 text-[10px] font-bold text-[var(--info)]'>
                        {initials(s.name)}
                      </div>
                      <div className='min-w-0'>
                        <p className='text-sm font-medium text-[var(--foreground)] truncate'>
                          {s.name}
                        </p>
                        {s.role && (
                          <p className='text-xs text-[var(--accent-gray)] truncate'>
                            {s.role}
                          </p>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>,
          document.body,
        )}
    </div>
  )
}

// ── Modal ─────────────────────────────────────────────────────────────────────
const CreateProjectModal = ({ onClose }: Props) => {
  const { data: staff = [] } = useStaff()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignee, setAssignee] = useState<UserType | null>(null)
  const [priority, setPriority] = useState<ProjectPriority>('medium')
  const [status, setStatus] = useState<ProjectStatus>('active')
  const [deadline, setDeadline] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [success, setSuccess] = useState(false)

  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    titleRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const qc = useQueryClient()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setTitleError(true)
      titleRef.current?.focus()
      return
    }
    const newProject: Project = {
      id: Date.now(),
      name: title.trim(),
      description: description.trim(),
      author: assignee?.name ?? '—',
      authorId: assignee?.id ?? 0,
      status,
      priority,
      progress: 0,
      deadline:
        deadline ||
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      tags: [],
      budget: '—',
      teamSize: 1,
    }
    qc.setQueryData<Project[]>(['projects'], (old = []) => [newProject, ...old])
    setSuccess(true)
    setTimeout(onClose, 1800)
  }

  const todayMin = new Date().toISOString().split('T')[0]

  const modal = (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center p-4'
      aria-modal='true'
      role='dialog'
    >
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
        onClick={onClose}
      />

      <div className='relative z-10 w-full max-w-lg bg-[var(--tertiary)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden'>
        {success ? (
          <div className='flex flex-col items-center justify-center gap-3 py-16 px-6 text-center'>
            <div className='w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center'>
              <CheckCircle2 size={30} className='text-emerald-500' />
            </div>
            <p className='text-base font-semibold text-[var(--secondary)]'>
              Проект создан!
            </p>
            <p className='text-sm text-[var(--accent-gray)]'>
              «{title}» добавлен в список проектов
            </p>
          </div>
        ) : (
          <>
            <div className='flex items-center justify-between px-6 py-4 border-b border-[var(--border)]'>
              <div className='flex items-center gap-2.5'>
                <div className='w-8 h-8 rounded-lg bg-[var(--info)]/10 flex items-center justify-center shrink-0'>
                  <Briefcase size={16} className='text-[var(--info)]' />
                </div>
                <div>
                  <h2 className='text-base font-semibold text-[var(--secondary)]'>
                    Новый проект
                  </h2>
                  <p className='text-xs text-[var(--accent-gray)]'>
                    Заполните основные данные
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className='w-8 h-8 flex items-center justify-center rounded-lg text-[var(--accent-gray)] hover:text-[var(--secondary)] hover:bg-[var(--navbar)] transition-colors cursor-pointer'
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className='px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto'>
                <div>
                  <p className={label}>
                    Название{' '}
                    <span className='text-rose-500 normal-case font-normal'>
                      *
                    </span>
                  </p>
                  <input
                    ref={titleRef}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value)
                      setTitleError(false)
                    }}
                    placeholder='Например: Редизайн главной страницы'
                    className={`${field} ${titleError ? 'border-rose-400 focus:ring-rose-400/15' : ''}`}
                  />
                  {titleError && (
                    <p className='text-xs text-rose-500 mt-1'>
                      Введите название проекта
                    </p>
                  )}
                </div>

                <div>
                  <p className={label}>Описание</p>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Краткое описание целей, задач и ожидаемого результата...'
                    rows={3}
                    className={`${field} resize-none`}
                  />
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <p className={label}>Ответственный</p>
                    <AssigneeCombobox
                      staff={staff}
                      value={assignee}
                      onChange={setAssignee}
                    />
                  </div>

                  <div>
                    <p className={label}>Приоритет</p>
                    <div className='flex rounded-lg border border-[var(--border)] overflow-hidden bg-[var(--background)]'>
                      {PRIORITIES.map((p) => (
                        <button
                          key={p.value}
                          type='button'
                          onClick={() => setPriority(p.value)}
                          className={`flex-1 py-2.5 text-xs font-medium transition-all cursor-pointer ${
                            priority === p.value ? p.active : p.idle
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <p className={label}>Статус</p>
                    <select
                      value={status}
                      onChange={(e) =>
                        setStatus(e.target.value as ProjectStatus)
                      }
                      className={`${field} cursor-pointer`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p className={label}>Дедлайн</p>
                    <input
                      type='date'
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      min={todayMin}
                      className={`${field} cursor-pointer`}
                    />
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-end gap-2 px-6 py-4 border-t border-[var(--border)] bg-[var(--navbar)]'>
                <button
                  type='button'
                  onClick={onClose}
                  className='px-4 py-2 text-sm font-medium text-[var(--accent-gray)] hover:text-[var(--secondary)] bg-[var(--tertiary)] border border-[var(--border)] rounded-lg hover:bg-[var(--background)] transition-all cursor-pointer'
                >
                  Отмена
                </button>
                <button
                  type='submit'
                  className='px-5 py-2 text-sm font-medium text-white bg-[var(--info)] rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer'
                >
                  Создать проект
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

export default CreateProjectModal
