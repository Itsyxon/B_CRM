'use client'
import { useProjects } from '@/app/api/projects/useProjects'
import { Project, ProjectPriority, ProjectStatus } from '@/types/ProjectTypes'
import {
  Ban,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Pause,
  Play,
  Plus,
  Search,
  Tag,
  Trash2,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { createPortal } from 'react-dom'
import Content from '@/components/atoms/Content'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import CreateProjectModal from '@/components/organisms/CreateProjectModal/CreateProjectModal'
import { useSettings } from '@/context/SettingsContext'
import { projectsDictionary, localeMap } from '@/lib/dictionaries'

const PAGE_SIZE = 6

const statusMeta: Record<ProjectStatus, { dot: string; badge: string }> = {
  active: {
    dot: 'bg-emerald-500',
    badge: 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10',
  },
  completed: {
    dot: 'bg-blue-500',
    badge: 'text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10',
  },
  paused: {
    dot: 'bg-amber-500',
    badge: 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10',
  },
  cancelled: {
    dot: 'bg-rose-400',
    badge: 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10',
  },
}

const priorityMeta: Record<ProjectPriority, { cls: string; dot: string }> = {
  low: {
    cls: 'text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-500/10',
    dot: 'bg-slate-400',
  },
  medium: {
    cls: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10',
    dot: 'bg-amber-400',
  },
  high: {
    cls: 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10',
    dot: 'bg-rose-500',
  },
  critical: {
    cls: 'text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-500/10',
    dot: 'bg-red-600',
  },
}

const progressColor = (p: number) => {
  if (p === 100) return 'bg-blue-500'
  if (p >= 60) return 'bg-emerald-500'
  if (p >= 30) return 'bg-amber-500'
  return 'bg-rose-400'
}

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
const getColor = (id: number) => AVATAR_COLORS[id % AVATAR_COLORS.length]

type Filter = 'all' | ProjectStatus
type PriorityFilter = 'all' | ProjectPriority

const VALID_FILTERS: Filter[] = ['all', 'active', 'paused', 'completed', 'cancelled']
const VALID_PRIORITY_FILTERS: PriorityFilter[] = ['all', 'low', 'medium', 'high', 'critical']

const FilterDropdown = ({
  label,
  active,
  children,
}: {
  label: React.ReactNode
  active?: boolean
  children: (close: () => void) => React.ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div
      className='relative outline-none'
      tabIndex={-1}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
      }}
    >
      <button
        type='button'
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer whitespace-nowrap ${
          active || open
            ? 'border-[var(--info)] bg-[var(--info)]/10 text-[var(--info)]'
            : 'border-[var(--border)] bg-[var(--tertiary)] text-[var(--accent-gray)] hover:text-[var(--secondary)] hover:border-[var(--info)]/40'
        }`}
      >
        {label}
        <ChevronDown
          size={12}
          className={`shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div
          onMouseDown={(e) => e.preventDefault()}
          className='absolute top-full left-0 mt-1.5 z-50 min-w-[170px] max-h-64 overflow-y-auto bg-[var(--tertiary)] border border-[var(--border)] rounded-xl shadow-lg py-1 overflow-hidden'
        >
          {children(close)}
        </div>
      )}
    </div>
  )
}

const ProjectDetailModal = ({
  project,
  onClose,
  onUpdate,
}: {
  project: Project
  onClose: () => void
  onUpdate: (updated: Project) => void
}) => {
  const { own } = useSettings()
  const d = projectsDictionary[own.language]
  const locale = localeMap[own.language]
  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  const queryClient = useQueryClient()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const updateStatus = (status: ProjectStatus) => {
    const updated = { ...project, status }
    queryClient.setQueryData<Project[]>(['projects'], (old) =>
      old ? old.map((p) => (p.id === project.id ? updated : p)) : old,
    )
    onUpdate(updated)
  }

  const deleteProject = () => {
    queryClient.setQueryData<Project[]>(['projects'], (old) =>
      old ? old.filter((p) => p.id !== project.id) : old,
    )
    onClose()
  }

  const sm = statusMeta[project.status]
  const pm = priorityMeta[project.priority]
  const pc = progressColor(project.progress)
  const isOverdue =
    project.status !== 'completed' &&
    project.status !== 'cancelled' &&
    new Date(project.deadline) < new Date()

  const displayAssignees = project.assignees?.length
    ? project.assignees
    : project.author && project.author !== '—'
      ? [{ id: project.authorId, name: project.author }]
      : []

  return createPortal(
    <div
      className='fixed inset-0 z-[150] flex items-end sm:items-center justify-center sm:p-4'
      aria-modal='true'
      role='dialog'
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
    >
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      <div className='relative z-10 w-full sm:max-w-2xl bg-[var(--tertiary)] border border-[var(--border)] sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh]'>
        {/* Header */}
        <div className='px-5 sm:px-6 py-4 sm:py-5 border-b border-[var(--border)] shrink-0'>
          <div className='flex items-start justify-between gap-3'>
            <div className='flex-1 min-w-0'>
              <div className='flex flex-wrap items-center gap-2 mb-2'>
                <span
                  className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${sm.badge}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />
                  {d.statusLabels[project.status]}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${pm.cls}`}
                >
                  {d.priorityLabels[project.priority]}
                </span>
                {isOverdue && (
                  <span className='text-[10px] font-semibold px-2 py-0.5 rounded-full text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10'>
                    {d.card.overdue}
                  </span>
                )}
              </div>
              <h2 className='text-lg sm:text-xl font-bold text-[var(--secondary)] leading-tight truncate'>
                {project.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className='w-8 h-8 flex items-center justify-center rounded-lg text-[var(--accent-gray)] hover:text-[var(--secondary)] hover:bg-[var(--navbar)] transition-colors cursor-pointer shrink-0'
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className='overflow-y-auto flex-1 px-5 sm:px-6 py-5 space-y-5'>
          {/* Description */}
          {project.description ? (
            <div>
              <p className='text-xs font-semibold text-[var(--accent-gray)] uppercase tracking-wide mb-2'>
                {d.modal.description}
              </p>
              <p className='text-sm text-[var(--foreground)] leading-relaxed'>
                {project.description}
              </p>
            </div>
          ) : (
            <p className='text-sm text-[var(--accent-gray)] italic'>
              {d.modal.noDescription}
            </p>
          )}

          {/* Progress */}
          <div className='bg-[var(--navbar)] rounded-xl p-4'>
            <div className='flex items-center justify-between mb-2.5'>
              <div className='flex items-center gap-1.5 text-sm font-medium text-[var(--secondary)]'>
                <TrendingUp size={14} className='text-[var(--accent-gray)]' />
                {d.modal.progress}
              </div>
              <span
                className={`text-xl font-bold ${project.progress === 100 ? 'text-blue-500' : 'text-[var(--secondary)]'}`}
              >
                {project.progress}%
              </span>
            </div>
            <div className='h-2 w-full bg-[var(--border)] rounded-full overflow-hidden'>
              <div
                className={`h-full rounded-full transition-all duration-700 ${pc}`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Info grid */}
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
            <div className='bg-[var(--navbar)] rounded-xl p-3 sm:p-4'>
              <div className='flex items-center gap-1 mb-1.5'>
                <CalendarDays size={11} className='text-[var(--accent-gray)] shrink-0' />
                <p className='text-[10px] font-semibold text-[var(--accent-gray)] uppercase tracking-wide'>
                  {d.modal.deadline}
                </p>
              </div>
              <p className={`text-sm font-semibold leading-snug ${isOverdue ? 'text-rose-500' : 'text-[var(--secondary)]'}`}>
                {formatDate(project.deadline)}
              </p>
            </div>

            <div className='bg-[var(--navbar)] rounded-xl p-3 sm:p-4'>
              <div className='flex items-center gap-1 mb-1.5'>
                <Users size={11} className='text-[var(--accent-gray)] shrink-0' />
                <p className='text-[10px] font-semibold text-[var(--accent-gray)] uppercase tracking-wide'>
                  {d.modal.team}
                </p>
              </div>
              <p className='text-sm font-semibold text-[var(--secondary)]'>
                {d.modal.persons(project.teamSize)}
              </p>
            </div>

            <div className='bg-[var(--navbar)] rounded-xl p-3 sm:p-4'>
              <div className='flex items-center gap-1 mb-1.5'>
                <DollarSign size={11} className='text-[var(--accent-gray)] shrink-0' />
                <p className='text-[10px] font-semibold text-[var(--accent-gray)] uppercase tracking-wide'>
                  {d.modal.budget}
                </p>
              </div>
              <p className='text-sm font-semibold text-[var(--secondary)]'>
                {project.budget}
              </p>
            </div>

            <div className='bg-[var(--navbar)] rounded-xl p-3 sm:p-4'>
              <div className='flex items-center gap-1 mb-1.5'>
                <Clock size={11} className='text-[var(--accent-gray)] shrink-0' />
                <p className='text-[10px] font-semibold text-[var(--accent-gray)] uppercase tracking-wide'>
                  {d.modal.created}
                </p>
              </div>
              <p className='text-sm font-semibold text-[var(--secondary)] leading-snug'>
                {formatDate(project.createdAt)}
              </p>
            </div>
          </div>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div>
              <div className='flex items-center gap-1.5 mb-2'>
                <Tag size={11} className='text-[var(--accent-gray)]' />
                <p className='text-xs font-semibold text-[var(--accent-gray)] uppercase tracking-wide'>
                  {d.modal.tags}
                </p>
              </div>
              <div className='flex flex-wrap gap-2'>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className='text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--navbar)] text-[var(--accent-gray)] border border-[var(--border)]'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Assignees */}
          {displayAssignees.length > 0 && (
            <div>
              <div className='flex items-center gap-1.5 mb-2'>
                <Users size={11} className='text-[var(--accent-gray)]' />
                <p className='text-xs font-semibold text-[var(--accent-gray)] uppercase tracking-wide'>
                  {d.modal.assignees}
                </p>
              </div>
              <div className='flex flex-wrap gap-2'>
                {displayAssignees.map((a) => (
                  <div
                    key={a.id}
                    className='flex items-center gap-2 bg-[var(--navbar)] border border-[var(--border)] rounded-full pl-1 pr-3 py-1'
                  >
                    <div
                      className={`w-6 h-6 rounded-full ${getColor(a.id)} flex items-center justify-center shrink-0`}
                    >
                      <span className='text-white text-[9px] font-bold'>
                        {getInitials(a.name)}
                      </span>
                    </div>
                    <span className='text-sm font-medium text-[var(--secondary)]'>
                      {a.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer — actions */}
        <div className='px-5 sm:px-6 py-4 border-t border-[var(--border)] shrink-0'>
          {confirmDelete ? (
            <div className='flex items-center justify-between gap-3'>
              <p className='text-sm text-[var(--foreground)]'>
                {d.modal.confirmText}
              </p>
              <div className='flex items-center gap-2 shrink-0'>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className='px-3 py-1.5 rounded-lg text-sm font-medium border border-[var(--border)] bg-[var(--tertiary)] text-[var(--accent-gray)] hover:text-[var(--secondary)] transition-colors cursor-pointer'
                >
                  {d.modal.cancelDelete}
                </button>
                <button
                  onClick={deleteProject}
                  className='px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer'
                >
                  {d.modal.confirmDelete}
                </button>
              </div>
            </div>
          ) : (
            <div className='flex items-center gap-2 flex-wrap'>
              {project.status !== 'completed' && (
                <button
                  onClick={() => updateStatus('completed')}
                  className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 transition-colors cursor-pointer'
                >
                  <CheckCircle2 size={14} />
                  {d.modal.complete}
                </button>
              )}
              {project.status === 'active' && (
                <button
                  onClick={() => updateStatus('paused')}
                  className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 dark:text-amber-400 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 transition-colors cursor-pointer'
                >
                  <Pause size={14} />
                  {d.modal.pause}
                </button>
              )}
              {(project.status === 'paused' || project.status === 'cancelled') && (
                <button
                  onClick={() => updateStatus('active')}
                  className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-colors cursor-pointer'
                >
                  <Play size={14} />
                  {d.modal.resume}
                </button>
              )}
              {project.status !== 'cancelled' && (
                <button
                  onClick={() => updateStatus('cancelled')}
                  className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 dark:text-rose-400 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-colors cursor-pointer'
                >
                  <Ban size={14} />
                  {d.modal.cancelAction}
                </button>
              )}
              <button
                onClick={() => setConfirmDelete(true)}
                className='ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--accent-gray)] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 border border-[var(--border)] hover:border-red-200 dark:hover:border-red-500/30 transition-colors cursor-pointer'
              >
                <Trash2 size={14} />
                {d.modal.delete}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

// ── Project Card ──────────────────────────────────────────────────────────────
const ProjectCard = ({
  project,
  onClick,
}: {
  project: Project
  onClick: () => void
}) => {
  const { own } = useSettings()
  const d = projectsDictionary[own.language]
  const locale = localeMap[own.language]
  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  const sm = statusMeta[project.status]
  const pm = priorityMeta[project.priority]
  const pc = progressColor(project.progress)
  const isCritical = project.priority === 'critical'
  const isOverdue =
    project.status !== 'completed' &&
    project.status !== 'cancelled' &&
    new Date(project.deadline) < new Date()

  const displayAssignees = project.assignees?.length
    ? project.assignees
    : project.author && project.author !== '—'
      ? [{ id: project.authorId, name: project.author }]
      : []

  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl border p-5 flex flex-col gap-4 transition-all cursor-pointer group overflow-hidden ${
        isCritical
          ? 'border-red-300 dark:border-red-700/60 bg-[var(--tertiary)] hover:border-red-400 dark:hover:border-red-600 hover:shadow-[0_4px_24px_-4px_rgba(220,38,38,0.25)]'
          : 'border-[var(--border)] bg-[var(--tertiary)] hover:border-[var(--info)]/40 hover:shadow-md'
      }`}
    >
      {isCritical && (
        <span className='absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-red-400 to-rose-500' />
      )}
      <div className='flex items-start justify-between gap-2'>
        <div className='flex flex-wrap gap-1.5'>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className='text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--navbar)] text-[var(--accent-gray)] border border-[var(--border)]'
            >
              {tag}
            </span>
          ))}
        </div>
        <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${pm.cls}`}>
          {d.priorityLabels[project.priority]}
        </span>
      </div>

      <div>
        <h3 className='text-sm font-semibold truncate text-[var(--secondary)] leading-snug mb-1 group-hover:text-[var(--info)] transition-colors'>
          {project.name}
        </h3>
        <p className='text-xs text-[var(--accent-gray)] line-clamp-2 leading-relaxed'>
          {project.description}
        </p>
      </div>

      <div>
        <div className='flex items-center justify-between mb-1.5'>
          <span className='text-xs text-[var(--accent-gray)]'>{d.card.progress}</span>
          <span className={`text-xs font-bold ${project.progress === 100 ? 'text-blue-500' : 'text-[var(--secondary)]'}`}>
            {project.progress}%
          </span>
        </div>
        <div className='h-1.5 w-full bg-[var(--border)] rounded-full overflow-hidden'>
          <div
            className={`h-full rounded-full transition-all duration-500 ${pc}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className='flex items-center justify-between gap-2 pt-1 border-t border-[var(--border)]'>
        <div className='flex items-center'>
          {displayAssignees.slice(0, 3).map((a, i) => (
            <div
              key={a.id}
              className={`w-6 h-6 rounded-full ${getColor(a.id)} flex items-center justify-center border-2 border-[var(--tertiary)] ${i > 0 ? '-ml-1.5' : ''}`}
              title={a.name}
            >
              <span className='text-white text-[8px] font-bold'>
                {getInitials(a.name)}
              </span>
            </div>
          ))}
          {displayAssignees.length > 3 && (
            <div className='w-6 h-6 rounded-full bg-[var(--navbar)] border-2 border-[var(--tertiary)] -ml-1.5 flex items-center justify-center'>
              <span className='text-[8px] font-bold text-[var(--accent-gray)]'>
                +{displayAssignees.length - 3}
              </span>
            </div>
          )}
          {displayAssignees.length === 0 && (
            <span className='text-xs text-[var(--accent-gray)]'>—</span>
          )}
        </div>

        <div className='flex items-center gap-3 shrink-0 text-xs text-[var(--accent-gray)]'>
          <span className='flex items-center gap-1'>
            <Users size={11} />
            {project.teamSize}
          </span>
          <span className={`flex items-center gap-1 ${isOverdue ? 'text-rose-500 font-medium' : ''}`}>
            <CalendarDays size={11} />
            {formatDate(project.deadline)}
          </span>
        </div>
      </div>
      <span className={`self-start flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${sm.badge}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />
        {d.statusLabels[project.status]}
      </span>
    </div>
  )
}

const SkeletonCard = () => (
  <div className='rounded-xl border border-[var(--border)] bg-[var(--tertiary)] p-5 space-y-4 animate-pulse'>
    <div className='flex gap-2'>
      <div className='h-4 w-16 rounded-full bg-[var(--skeleton)]' />
      <div className='h-4 w-12 rounded-full bg-[var(--skeleton)]' />
    </div>
    <div className='space-y-1.5'>
      <div className='h-4 w-3/4 rounded bg-[var(--skeleton)]' />
      <div className='h-3 w-full rounded bg-[var(--skeleton)]' />
      <div className='h-3 w-5/6 rounded bg-[var(--skeleton)]' />
    </div>
    <div className='space-y-1.5'>
      <div className='h-3 w-16 rounded bg-[var(--skeleton)]' />
      <div className='h-1.5 w-full rounded-full bg-[var(--skeleton)]' />
    </div>
    <div className='h-px bg-[var(--border)]' />
    <div className='flex justify-between'>
      <div className='flex gap-2 items-center'>
        <div className='w-6 h-6 rounded-full bg-[var(--skeleton)]' />
        <div className='h-3 w-20 rounded bg-[var(--skeleton)]' />
      </div>
      <div className='h-3 w-24 rounded bg-[var(--skeleton)]' />
    </div>
  </div>
)

const ProjectsGrid = () => {
  const { own } = useSettings()
  const d = projectsDictionary[own.language]

  const FILTERS: { value: Filter; label: string }[] = [
    { value: 'all', label: d.filters.all },
    { value: 'active', label: d.filters.active },
    { value: 'paused', label: d.filters.paused },
    { value: 'completed', label: d.filters.completed },
    { value: 'cancelled', label: d.filters.cancelled },
  ]

  const PRIORITY_FILTERS: { value: PriorityFilter; label: string }[] = [
    { value: 'all', label: d.priorityFilters.all },
    { value: 'low', label: d.priorityFilters.low },
    { value: 'medium', label: d.priorityFilters.medium },
    { value: 'high', label: d.priorityFilters.high },
    { value: 'critical', label: d.priorityFilters.critical },
  ]

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const { data: projects, isLoading, isError } = useProjects()

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const [filter, setFilter] = useState<Filter>(() => {
    const f = searchParams.get('filter')
    return f && VALID_FILTERS.includes(f as Filter) ? (f as Filter) : 'all'
  })
  const [search, setSearch] = useState(() => searchParams.get('q') ?? '')
  const [page, setPage] = useState(() => {
    const p = parseInt(searchParams.get('page') ?? '1')
    return Number.isFinite(p) && p >= 1 ? p : 1
  })
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>(() => {
    const pf = searchParams.get('priority')
    return pf && VALID_PRIORITY_FILTERS.includes(pf as PriorityFilter)
      ? (pf as PriorityFilter)
      : 'all'
  })
  const [tagFilter, setTagFilter] = useState<string[]>(() => {
    const tf = searchParams.get('tags')
    return tf ? tf.split(',').filter(Boolean) : []
  })

  const pushUrl = (
    f: Filter,
    q: string,
    p: number,
    pf: PriorityFilter,
    tf: string[],
  ) => {
    const params = new URLSearchParams()
    if (f !== 'all') params.set('filter', f)
    if (q.trim()) params.set('q', q.trim())
    if (p > 1) params.set('page', String(p))
    if (pf !== 'all') params.set('priority', pf)
    if (tf.length > 0) params.set('tags', tf.join(','))
    const qs = params.toString()
    router.replace(`${pathname}${qs ? '?' + qs : ''}`, { scroll: false })
  }

  const counts = useMemo(() => {
    if (!projects) return {} as Record<string, number>
    return {
      all: projects.length,
      active: projects.filter((p) => p.status === 'active').length,
      paused: projects.filter((p) => p.status === 'paused').length,
      completed: projects.filter((p) => p.status === 'completed').length,
      cancelled: projects.filter((p) => p.status === 'cancelled').length,
    }
  }, [projects])

  const allTags = useMemo(() => {
    if (!projects) return []
    const set = new Set<string>()
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return Array.from(set).sort()
  }, [projects])

  const filtered = useMemo(() => {
    if (!projects) return []
    const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }
    const q = search.toLowerCase().trim()
    return projects
      .filter((p) => {
        const matchStatus = filter === 'all' || p.status === filter
        const matchPriority =
          priorityFilter === 'all' || p.priority === priorityFilter
        const matchTags =
          tagFilter.length === 0 || tagFilter.some((t) => p.tags.includes(t))
        const matchSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        return matchStatus && matchPriority && matchTags && matchSearch
      })
      .sort((a, b) => {
        const byDate = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        if (byDate !== 0) return byDate
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      })
  }, [projects, filter, priorityFilter, tagFilter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)

  const paginated = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage],
  )

  const handleFilter = (f: Filter) => {
    setFilter(f)
    setPage(1)
    pushUrl(f, search, 1, priorityFilter, tagFilter)
  }

  const handleSearch = (v: string) => {
    setSearch(v)
    setPage(1)
    pushUrl(filter, v, 1, priorityFilter, tagFilter)
  }

  const handlePage = (p: number) => {
    setPage(p)
    pushUrl(filter, search, p, priorityFilter, tagFilter)
  }

  const handlePriorityFilter = (pf: PriorityFilter) => {
    setPriorityFilter(pf)
    setPage(1)
    pushUrl(filter, search, 1, pf, tagFilter)
  }

  const handleTagFilter = (tag: string) => {
    const next = tagFilter.includes(tag)
      ? tagFilter.filter((t) => t !== tag)
      : [...tagFilter, tag]
    setTagFilter(next)
    setPage(1)
    pushUrl(filter, search, 1, priorityFilter, next)
  }

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='h-10 w-full rounded-lg bg-[var(--skeleton)] animate-pulse' />
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <Content>
        <p className='text-red-500 text-sm'>{d.error}</p>
      </Content>
    )
  }

  return (
    <>
      {modalOpen && <CreateProjectModal onClose={() => setModalOpen(false)} />}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onUpdate={(updated) => setSelectedProject(updated)}
        />
      )}

      <div className='space-y-5'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
          <div className='relative w-full sm:max-w-xs'>
            <Search
              size={14}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent-gray)] pointer-events-none'
            />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={d.searchPlaceholder}
              className='w-full pl-9 pr-8 py-2 text-sm bg-[var(--tertiary)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--info)] focus:ring-2 focus:ring-[var(--info)]/15 text-[var(--foreground)] placeholder:text-[var(--accent-gray)] transition-all'
            />
            {search && (
              <button
                onClick={() => handleSearch('')}
                className='absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-[var(--accent-gray)] hover:text-[var(--foreground)] transition cursor-pointer'
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div className='flex items-center gap-3 shrink-0'>
            <p className='text-sm text-[var(--accent-gray)]'>
              <span className='font-semibold text-[var(--foreground)]'>
                {d.found(filtered.length)}
              </span>
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className='flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white bg-[var(--info)] rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer shrink-0'
            >
              <Plus size={15} />
              {d.createButton}
            </button>
          </div>
        </div>

        <div className='flex items-center gap-2 flex-wrap'>
          <FilterDropdown
            active={filter !== 'all'}
            label={
              filter !== 'all' ? (
                <span className='flex items-center gap-1.5'>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${statusMeta[filter as ProjectStatus].dot}`} />
                  {d.statusLabels[filter as ProjectStatus]}
                </span>
              ) : (
                d.statusDropdown
              )
            }
          >
            {(close) => (
              <>
                {FILTERS.map((f) => {
                  const isActive = filter === f.value
                  const count = counts[f.value] ?? 0
                  return (
                    <button
                      key={f.value}
                      type='button'
                      onClick={() => {
                        handleFilter(f.value)
                        close()
                      }}
                      className={`w-full flex items-center justify-between gap-3 px-3.5 py-2 text-sm transition-colors cursor-pointer ${
                        isActive
                          ? 'text-[var(--info)] font-medium bg-[var(--info)]/8'
                          : 'text-[var(--foreground)] hover:bg-[var(--navbar)]'
                      }`}
                    >
                      <span className='flex items-center gap-2'>
                        {f.value !== 'all' && (
                          <span className={`w-2 h-2 rounded-full ${statusMeta[f.value].dot}`} />
                        )}
                        {f.label}
                      </span>
                      <span className='text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--navbar)] text-[var(--accent-gray)]'>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </>
            )}
          </FilterDropdown>

          <FilterDropdown
            active={priorityFilter !== 'all'}
            label={
              priorityFilter !== 'all' ? (
                <span className='flex items-center gap-1.5'>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${priorityMeta[priorityFilter as ProjectPriority].dot}`} />
                  {d.priorityLabels[priorityFilter as ProjectPriority]}
                </span>
              ) : (
                d.priorityDropdown
              )
            }
          >
            {(close) => (
              <>
                {PRIORITY_FILTERS.map((pf) => {
                  const isActive = priorityFilter === pf.value
                  return (
                    <button
                      key={pf.value}
                      type='button'
                      onClick={() => {
                        handlePriorityFilter(pf.value)
                        close()
                      }}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors cursor-pointer ${
                        isActive
                          ? 'text-[var(--info)] font-medium bg-[var(--info)]/8'
                          : 'text-[var(--foreground)] hover:bg-[var(--navbar)]'
                      }`}
                    >
                      {pf.value !== 'all' && (
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-[var(--info)]' : priorityMeta[pf.value].dot}`}
                        />
                      )}
                      {pf.label}
                    </button>
                  )
                })}
              </>
            )}
          </FilterDropdown>

          {allTags.length > 0 && (
            <FilterDropdown
              active={tagFilter.length > 0}
              label={d.tagsDropdown(tagFilter.length)}
            >
              {() => (
                <>
                  {allTags.map((tag) => {
                    const isActive = tagFilter.includes(tag)
                    return (
                      <button
                        key={tag}
                        type='button'
                        onClick={() => handleTagFilter(tag)}
                        className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors cursor-pointer ${
                          isActive
                            ? 'text-[var(--info)] font-medium bg-[var(--info)]/8'
                            : 'text-[var(--foreground)] hover:bg-[var(--navbar)]'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? 'bg-[var(--info)] border-[var(--info)]'
                              : 'border-[var(--accent-gray)]/50'
                          }`}
                        >
                          {isActive && (
                            <Check size={9} strokeWidth={3} className='text-white' />
                          )}
                        </span>
                        {tag}
                      </button>
                    )
                  })}
                </>
              )}
            </FilterDropdown>
          )}

          {(filter !== 'all' || priorityFilter !== 'all' || tagFilter.length > 0) && (
            <button
              type='button'
              onClick={() => {
                setFilter('all')
                setPriorityFilter('all')
                setTagFilter([])
                setPage(1)
                pushUrl('all', search, 1, 'all', [])
              }}
              className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--accent-gray)] hover:text-rose-500 border border-[var(--border)] hover:border-rose-300 dark:hover:border-rose-500/40 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer whitespace-nowrap'
            >
              <X size={13} />
              {d.resetFilters}
            </button>
          )}
        </div>

        {paginated.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-center'>
            <div className='w-14 h-14 rounded-full bg-[var(--navbar)] flex items-center justify-center mb-4'>
              <Search size={22} className='text-[var(--accent-gray)]' />
            </div>
            <p className='text-base font-semibold text-[var(--secondary)]'>
              {d.empty.title}
            </p>
            <p className='text-sm text-[var(--accent-gray)] mt-1'>
              {d.empty.subtitle}
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
            {paginated.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={() => setSelectedProject(p)}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className='flex items-center justify-between pt-2'>
            <p className='text-xs text-[var(--accent-gray)]'>
              {d.pagination.page}{' '}
              <span className='font-semibold text-[var(--foreground)]'>
                {safePage}
              </span>{' '}
              {d.pagination.of}{' '}
              <span className='font-semibold text-[var(--foreground)]'>
                {totalPages}
              </span>
            </p>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => handlePage(Math.max(1, safePage - 1))}
                disabled={safePage === 1}
                className='w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--tertiary)] text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--navbar)] transition cursor-pointer'
              >
                <ChevronLeft size={15} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => handlePage(n)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition cursor-pointer ${
                    n === safePage
                      ? 'bg-[var(--info)] text-white shadow-sm'
                      : 'border border-[var(--border)] bg-[var(--tertiary)] text-[var(--foreground)] hover:bg-[var(--navbar)]'
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => handlePage(Math.min(totalPages, safePage + 1))}
                disabled={safePage === totalPages}
                className='w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--tertiary)] text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--navbar)] transition cursor-pointer'
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProjectsGrid
