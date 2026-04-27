'use client'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Briefcase, CheckCircle2, Search } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useStaff } from '@/app/api/staff/useStaff'
import { Project, ProjectPriority, ProjectStatus } from '@/types/ProjectTypes'
import { UserType } from '@/types/UserTypes'
import { useSettings } from '@/context/SettingsContext'
import { projectsDictionary } from '@/lib/dictionaries'

interface Props {
  onClose: () => void
}

const PRIORITY_STYLES: Record<
  ProjectPriority,
  { dot: string; active: string; idle: string }
> = {
  low: {
    dot: 'bg-slate-400',
    active: 'border-slate-400 bg-slate-50 dark:bg-slate-400/10 text-slate-600 dark:text-slate-300',
    idle: 'border-[var(--border)] text-[var(--accent-gray)] hover:border-slate-300 hover:bg-[var(--navbar)]',
  },
  medium: {
    dot: 'bg-amber-400',
    active: 'border-amber-400 bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-300',
    idle: 'border-[var(--border)] text-[var(--accent-gray)] hover:border-amber-300 hover:bg-[var(--navbar)]',
  },
  high: {
    dot: 'bg-rose-500',
    active: 'border-rose-500 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-300',
    idle: 'border-[var(--border)] text-[var(--accent-gray)] hover:border-rose-300 hover:bg-[var(--navbar)]',
  },
  critical: {
    dot: 'bg-red-600',
    active: 'border-red-600 bg-red-50 dark:bg-red-600/15 text-red-700 dark:text-red-400',
    idle: 'border-[var(--border)] text-[var(--accent-gray)] hover:border-red-400 hover:bg-[var(--navbar)]',
  },
}

const STATUS_VALUES: ('active' | 'paused')[] = ['active', 'paused']

const PREDEFINED_TAGS = [
  'API', 'Backend', 'Frontend', 'Mobile', 'Design',
  'Database', 'Security', 'Testing', 'DevOps', 'Analytics',
  'Marketing', 'Finance', 'HR', 'Integrations', 'Documentation',
]
const MAX_TAGS = 10

const fieldCls =
  'w-full px-3 py-2.5 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--info)] focus:ring-2 focus:ring-[var(--info)]/15 transition-all text-[var(--foreground)] placeholder:text-[var(--accent-gray)]'
const labelCls =
  'block text-xs font-semibold text-[var(--accent-gray)] uppercase tracking-wide mb-1.5'

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

interface MultiComboboxProps {
  staff: UserType[]
  value: UserType[]
  onChange: (v: UserType[]) => void
  searchPlaceholder: string
  allAddedText: string
  notFoundText: string
}

const MultiAssigneeSelector = ({
  staff,
  value,
  onChange,
  searchPlaceholder,
  allAddedText,
  notFoundText,
}: MultiComboboxProps) => {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selectedIds = new Set(value.map((u) => u.id))
  const available = staff.filter((s) => !selectedIds.has(s.id))
  const filtered = search.trim()
    ? available.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.role?.toLowerCase().includes(search.toLowerCase()),
      )
    : available

  const updateRect = () => {
    if (wrapRef.current) setRect(wrapRef.current.getBoundingClientRect())
  }

  const openDrop = () => {
    updateRect()
    setOpen(true)
  }

  const pick = (s: UserType) => {
    onChange([...value, s])
    setSearch('')
    setTimeout(() => {
      updateRect()
      inputRef.current?.focus()
    }, 0)
  }

  const remove = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(value.filter((u) => u.id !== id))
    if (open) setTimeout(updateRect, 0)
  }

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOpen(false)
    }
  }

  return (
    <div
      ref={wrapRef}
      tabIndex={-1}
      className='outline-none'
      onBlur={handleBlur}
    >
      <div
        className={`${fieldCls} flex flex-wrap items-center gap-1.5 cursor-text min-h-[40px] py-2 ${open ? 'border-[var(--info)] ring-2 ring-[var(--info)]/15' : ''}`}
        onClick={() => {
          openDrop()
          inputRef.current?.focus()
        }}
      >
        {value.map((u) => (
          <span
            key={u.id}
            className='inline-flex items-center gap-1 bg-[var(--info)]/15 text-[var(--info)] rounded-md px-1.5 py-0.5 text-[11px] font-medium shrink-0'
          >
            <span className='w-3.5 h-3.5 rounded-full bg-[var(--info)] flex items-center justify-center text-[7px] font-bold text-white'>
              {initials(u.name)}
            </span>
            {u.name.split(' ')[0]}
            <button
              type='button'
              onClick={(e) => remove(u.id, e)}
              className='hover:text-rose-500 transition-colors cursor-pointer ml-0.5'
            >
              <X size={9} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            if (!open) openDrop()
          }}
          onFocus={openDrop}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && open) {
              e.stopPropagation()
              setOpen(false)
            }
          }}
          placeholder={value.length === 0 ? searchPlaceholder : ''}
          className='flex-1 min-w-[80px] bg-transparent outline-none text-sm text-[var(--foreground)] placeholder:text-[var(--accent-gray)]'
        />
        {value.length === 0 && (
          <Search size={13} className='shrink-0 text-[var(--accent-gray)] pointer-events-none' />
        )}
      </div>

      {open &&
        rect &&
        createPortal(
          <div
            onMouseDown={(e) => e.preventDefault()}
            className='fixed z-[200] bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden'
            style={{ top: rect.bottom + 4, left: rect.left, width: rect.width }}
          >
            {filtered.length === 0 ? (
              <p className='px-3 py-3 text-sm text-[var(--accent-gray)] text-center'>
                {available.length === 0 ? allAddedText : notFoundText}
              </p>
            ) : (
              <ul className='max-h-[200px] overflow-y-auto'>
                {filtered.map((s) => (
                  <li key={s.id}>
                    <button
                      type='button'
                      onMouseDown={() => pick(s)}
                      className='w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors cursor-pointer hover:bg-[var(--border)]'
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

const CreateProjectModal = ({ onClose }: Props) => {
  const { own } = useSettings()
  const d = projectsDictionary[own.language].create

  const { data: staff = [] } = useStaff()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignees, setAssignees] = useState<UserType[]>([])
  const [priority, setPriority] = useState<ProjectPriority>('medium')
  const [status, setStatus] = useState<ProjectStatus>('active')
  const [deadline, setDeadline] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [titleError, setTitleError] = useState(false)
  const [success, setSuccess] = useState(false)

  const titleRef = useRef<HTMLInputElement>(null)
  const qc = useQueryClient()

  const PRIORITIES: { value: ProjectPriority; label: string; dot: string; active: string; idle: string }[] = [
    { value: 'low',      label: d.priorityLabels.low,      ...PRIORITY_STYLES.low },
    { value: 'medium',   label: d.priorityLabels.medium,   ...PRIORITY_STYLES.medium },
    { value: 'high',     label: d.priorityLabels.high,     ...PRIORITY_STYLES.high },
    { value: 'critical', label: d.priorityLabels.critical, ...PRIORITY_STYLES.critical },
  ]

  const STATUSES: { value: ProjectStatus; label: string }[] = STATUS_VALUES.map((v) => ({
    value: v,
    label: d.statusLabels[v],
  }))

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
      author: assignees[0]?.name ?? '—',
      authorId: assignees[0]?.id ?? 0,
      assignees: assignees.map((a) => ({ id: a.id, name: a.name })),
      status,
      priority,
      progress: 0,
      deadline:
        deadline ||
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      tags,
      budget: '—',
      teamSize: Math.max(1, assignees.length),
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
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
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
              {d.successTitle}
            </p>
            <p className='text-sm text-[var(--accent-gray)]'>
              {d.successMessage(title)}
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
                    {d.title}
                  </h2>
                  <p className='text-xs text-[var(--accent-gray)]'>
                    {d.subtitle}
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
                  <p className={labelCls}>
                    {d.titleLabel}{' '}
                    <span className='text-rose-500 normal-case font-normal'>*</span>
                  </p>
                  <input
                    ref={titleRef}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value)
                      setTitleError(false)
                    }}
                    placeholder={d.titlePlaceholder}
                    className={`${fieldCls} ${titleError ? 'border-rose-400 focus:ring-rose-400/15' : ''}`}
                  />
                  {titleError && (
                    <p className='text-xs text-rose-500 mt-1'>{d.titleError}</p>
                  )}
                </div>

                <div>
                  <p className={labelCls}>{d.descriptionLabel}</p>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={d.descriptionPlaceholder}
                    rows={3}
                    className={`${fieldCls} resize-none`}
                  />
                </div>

                <div>
                  <p className={labelCls}>{d.assigneesLabel}</p>
                  <MultiAssigneeSelector
                    staff={staff}
                    value={assignees}
                    onChange={setAssignees}
                    searchPlaceholder={d.assigneesSearch}
                    allAddedText={d.allAdded}
                    notFoundText={d.notFound}
                  />
                </div>

                <div>
                  <p className={labelCls}>{d.priorityLabel}</p>
                  <div className='grid grid-cols-2 gap-2'>
                    {PRIORITIES.map((p) => (
                      <button
                        key={p.value}
                        type='button'
                        onClick={() => setPriority(p.value)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                          priority === p.value ? p.active : p.idle
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full shrink-0 ${p.dot}`} />
                        {p.label}
                        {priority === p.value && (
                          <CheckCircle2 size={12} className='ml-auto shrink-0 opacity-80' />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <p className={labelCls}>{d.statusLabel}</p>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                      className={`${fieldCls} cursor-pointer`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p className={labelCls}>{d.deadlineLabel}</p>
                    <input
                      type='date'
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      min={todayMin}
                      className={`${fieldCls} cursor-pointer`}
                    />
                  </div>
                </div>

                <div>
                  <p className={labelCls}>
                    {d.tagsLabel(MAX_TAGS)}
                  </p>
                  <div className='flex flex-wrap gap-1.5'>
                    {PREDEFINED_TAGS.map((tag) => {
                      const isSelected = tags.includes(tag)
                      const disabled = !isSelected && tags.length >= MAX_TAGS
                      return (
                        <button
                          key={tag}
                          type='button'
                          disabled={disabled}
                          onClick={() =>
                            setTags(
                              isSelected
                                ? tags.filter((t) => t !== tag)
                                : [...tags, tag],
                            )
                          }
                          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all border ${
                            isSelected
                              ? 'bg-[var(--info)] border-[var(--info)] text-white cursor-pointer'
                              : disabled
                                ? 'opacity-35 cursor-not-allowed border-[var(--border)] text-[var(--accent-gray)]'
                                : 'border-[var(--border)] text-[var(--accent-gray)] hover:border-[var(--info)]/50 hover:text-[var(--secondary)] hover:bg-[var(--navbar)] cursor-pointer'
                          }`}
                        >
                          {tag}
                        </button>
                      )
                    })}
                  </div>
                  {tags.length > 0 && (
                    <p className='text-xs text-[var(--accent-gray)] mt-1.5'>
                      {d.selectedTags(tags.length, MAX_TAGS)}
                    </p>
                  )}
                </div>
              </div>

              <div className='flex items-center justify-end gap-2 px-6 py-4 border-t border-[var(--border)] bg-[var(--navbar)]'>
                <button
                  type='button'
                  onClick={onClose}
                  className='px-4 py-2 text-sm font-medium text-[var(--accent-gray)] hover:text-[var(--secondary)] bg-[var(--tertiary)] border border-[var(--border)] rounded-lg hover:bg-[var(--background)] transition-all cursor-pointer'
                >
                  {d.cancelButton}
                </button>
                <button
                  type='submit'
                  className='px-5 py-2 text-sm font-medium text-white bg-[var(--info)] rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer'
                >
                  {d.createButton}
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
