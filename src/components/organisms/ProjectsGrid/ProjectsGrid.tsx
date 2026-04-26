'use client'
import { useProjects } from '@/app/api/projects/useProjects'
import { Project, ProjectPriority, ProjectStatus } from '@/types/ProjectTypes'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Plus,
  Search,
  Tag,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import Content from '@/components/atoms/Content'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import CreateProjectModal from '@/components/organisms/CreateProjectModal/CreateProjectModal'

const PAGE_SIZE = 6

const statusMeta: Record<
  ProjectStatus,
  { label: string; dot: string; badge: string }
> = {
  active: {
    label: 'Активный',
    dot: 'bg-emerald-500',
    badge:
      'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10',
  },
  completed: {
    label: 'Завершён',
    dot: 'bg-blue-500',
    badge: 'text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10',
  },
  paused: {
    label: 'На паузе',
    dot: 'bg-amber-500',
    badge:
      'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10',
  },
  cancelled: {
    label: 'Отменён',
    dot: 'bg-rose-400',
    badge: 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10',
  },
}

const priorityMeta: Record<ProjectPriority, { label: string; cls: string }> = {
  high: {
    label: 'Высокий',
    cls: 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10',
  },
  medium: {
    label: 'Средний',
    cls: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10',
  },
  low: {
    label: 'Низкий',
    cls: 'text-slate-500 bg-slate-100 dark:text-slate-400 dark:bg-slate-500/10',
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

const formatDate = (s: string) =>
  new Date(s).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

type Filter = 'all' | ProjectStatus

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'paused', label: 'На паузе' },
  { value: 'completed', label: 'Завершены' },
  { value: 'cancelled', label: 'Отменены' },
]

const VALID_FILTERS = FILTERS.map((f) => f.value)

const ProjectDetailModal = ({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) => {
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
      onKeyDown={(e) => { if (e.key === 'Escape') onClose() }}
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
                  {sm.label}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${pm.cls}`}
                >
                  {pm.label}
                </span>
                {isOverdue && (
                  <span className='text-[10px] font-semibold px-2 py-0.5 rounded-full text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10'>
                    Просрочен
                  </span>
                )}
              </div>
              <h2 className='text-lg sm:text-xl font-bold text-[var(--secondary)] leading-tight'>
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
                Описание
              </p>
              <p className='text-sm text-[var(--foreground)] leading-relaxed'>
                {project.description}
              </p>
            </div>
          ) : (
            <p className='text-sm text-[var(--accent-gray)] italic'>
              Описание не указано
            </p>
          )}

          {/* Progress */}
          <div className='bg-[var(--navbar)] rounded-xl p-4'>
            <div className='flex items-center justify-between mb-2.5'>
              <div className='flex items-center gap-1.5 text-sm font-medium text-[var(--secondary)]'>
                <TrendingUp size={14} className='text-[var(--accent-gray)]' />
                Прогресс
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
                <CalendarDays
                  size={11}
                  className='text-[var(--accent-gray)] shrink-0'
                />
                <p className='text-[10px] font-semibold text-[var(--accent-gray)] uppercase tracking-wide'>
                  Дедлайн
                </p>
              </div>
              <p
                className={`text-sm font-semibold leading-snug ${isOverdue ? 'text-rose-500' : 'text-[var(--secondary)]'}`}
              >
                {formatDate(project.deadline)}
              </p>
            </div>

            <div className='bg-[var(--navbar)] rounded-xl p-3 sm:p-4'>
              <div className='flex items-center gap-1 mb-1.5'>
                <Users
                  size={11}
                  className='text-[var(--accent-gray)] shrink-0'
                />
                <p className='text-[10px] font-semibold text-[var(--accent-gray)] uppercase tracking-wide'>
                  Команда
                </p>
              </div>
              <p className='text-sm font-semibold text-[var(--secondary)]'>
                {project.teamSize} чел.
              </p>
            </div>

            <div className='bg-[var(--navbar)] rounded-xl p-3 sm:p-4'>
              <div className='flex items-center gap-1 mb-1.5'>
                <DollarSign
                  size={11}
                  className='text-[var(--accent-gray)] shrink-0'
                />
                <p className='text-[10px] font-semibold text-[var(--accent-gray)] uppercase tracking-wide'>
                  Бюджет
                </p>
              </div>
              <p className='text-sm font-semibold text-[var(--secondary)]'>
                {project.budget}
              </p>
            </div>

            <div className='bg-[var(--navbar)] rounded-xl p-3 sm:p-4'>
              <div className='flex items-center gap-1 mb-1.5'>
                <Clock
                  size={11}
                  className='text-[var(--accent-gray)] shrink-0'
                />
                <p className='text-[10px] font-semibold text-[var(--accent-gray)] uppercase tracking-wide'>
                  Создан
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
                  Теги
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
                  Ответственные
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

  return (
    <div
      onClick={onClick}
      className='rounded-xl border border-[var(--border)] bg-[var(--tertiary)] p-5 flex flex-col gap-4 hover:border-[var(--info)]/40 hover:shadow-md transition-all cursor-pointer group'
    >
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
        <span
          className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${pm.cls}`}
        >
          {pm.label}
        </span>
      </div>

      <div>
        <h3 className='text-sm font-semibold text-[var(--secondary)] leading-snug mb-1 group-hover:text-[var(--info)] transition-colors'>
          {project.name}
        </h3>
        <p className='text-xs text-[var(--accent-gray)] line-clamp-2 leading-relaxed'>
          {project.description}
        </p>
      </div>

      <div>
        <div className='flex items-center justify-between mb-1.5'>
          <span className='text-xs text-[var(--accent-gray)]'>Прогресс</span>
          <span
            className={`text-xs font-bold ${project.progress === 100 ? 'text-blue-500' : 'text-[var(--secondary)]'}`}
          >
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
          <span
            className={`flex items-center gap-1 ${isOverdue ? 'text-rose-500 font-medium' : ''}`}
          >
            <CalendarDays size={11} />
            {formatDate(project.deadline)}
          </span>
        </div>
      </div>
      <span
        className={`self-start flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${sm.badge}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />
        {sm.label}
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

  const pushUrl = (f: Filter, q: string, p: number) => {
    const params = new URLSearchParams()
    if (f !== 'all') params.set('filter', f)
    if (q.trim()) params.set('q', q.trim())
    if (p > 1) params.set('page', String(p))
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

  const filtered = useMemo(() => {
    if (!projects) return []
    const q = search.toLowerCase().trim()
    return projects.filter((p) => {
      const matchStatus = filter === 'all' || p.status === filter
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      return matchStatus && matchSearch
    })
  }, [projects, filter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)

  const paginated = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage],
  )

  const handleFilter = (f: Filter) => {
    setFilter(f)
    setPage(1)
    pushUrl(f, search, 1)
  }

  const handleSearch = (v: string) => {
    setSearch(v)
    setPage(1)
    pushUrl(filter, v, 1)
  }

  const handlePage = (p: number) => {
    setPage(p)
    pushUrl(filter, search, p)
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
        <p className='text-red-500 text-sm'>Ошибка загрузки проектов</p>
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
              placeholder='Поиск по проектам...'
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
              Найдено{' '}
              <span className='font-semibold text-[var(--foreground)]'>
                {filtered.length}
              </span>{' '}
              проектов
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className='flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white bg-[var(--info)] rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer shrink-0'
            >
              <Plus size={15} />
              Создать проект
            </button>
          </div>
        </div>

        <div className='flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none'>
          {FILTERS.map((f) => {
            const count = counts[f.value] ?? 0
            const isActive = filter === f.value
            return (
              <button
                key={f.value}
                onClick={() => handleFilter(f.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[var(--info)] text-white shadow-sm'
                    : 'bg-[var(--tertiary)] text-[var(--accent-gray)] border border-[var(--border)] hover:border-[var(--info)]/50 hover:text-[var(--secondary)]'
                }`}
              >
                {f.label}
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--navbar)] text-[var(--accent-gray)]'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {paginated.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-center'>
            <div className='w-14 h-14 rounded-full bg-[var(--navbar)] flex items-center justify-center mb-4'>
              <Search size={22} className='text-[var(--accent-gray)]' />
            </div>
            <p className='text-base font-semibold text-[var(--secondary)]'>
              Проекты не найдены
            </p>
            <p className='text-sm text-[var(--accent-gray)] mt-1'>
              Попробуйте изменить фильтр или запрос
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
              Страница{' '}
              <span className='font-semibold text-[var(--foreground)]'>
                {safePage}
              </span>{' '}
              из{' '}
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
