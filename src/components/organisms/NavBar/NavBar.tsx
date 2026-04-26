'use client'
import Logo from '@/components/atoms/Logo'
import {
    ChevronLeft, ChevronRight,
    CircleGauge, FolderKanban, LogOut, Menu,
    MessageCircleQuestionMark, Settings, ShieldUser,
    UserRoundCog, X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useNavCollapse } from '@/context/NavCollapseContext'

const navGroups = [
    {
        label: 'Основное',
        links: [
            { id: 1, label: 'Дашборд',     link: '/dashboard', Icon: CircleGauge },
            { id: 2, label: 'Пользователи', link: '/users',     Icon: UserRoundCog },
            { id: 3, label: 'Проекты',      link: '/projects',  Icon: FolderKanban },
            { id: 4, label: 'Персонал',     link: '/staff',     Icon: ShieldUser },
        ],
    },
    {
        label: 'Система',
        links: [
            { id: 5, label: 'Настройки', link: '/settings', Icon: Settings },
            { id: 6, label: 'Помощь',    link: '/help',     Icon: MessageCircleQuestionMark },
        ],
    },
]

const FaviconIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7 shrink-0">
        <defs>
            <linearGradient id="nav-favicon-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1D4ED8" />
                <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
        </defs>
        <rect width="32" height="32" rx="7" fill="url(#nav-favicon-g)" />
        <rect x="4"  y="20" width="6" height="7"  rx="1.5" fill="white" opacity="0.45" />
        <rect x="13" y="14" width="6" height="13" rx="1.5" fill="white" opacity="0.72" />
        <rect x="22" y="8"  width="6" height="19" rx="1.5" fill="white" />
    </svg>
)

const Tooltip = ({ label }: { label: string }) => (
    <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 text-xs font-medium bg-[var(--secondary)] text-[var(--navbar)] rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-[60] shadow-lg">
        {label}
    </span>
)

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { isCollapsed, toggle } = useNavCollapse()
    const pathname = usePathname()
    const router = useRouter()

    // On mobile the menu slides in/out — always show expanded content while open
    const collapsed = isCollapsed && !isOpen

    const handleLogout = () => {
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        router.push('/login')
    }

    const close = () => setIsOpen(false)
    const translateClass = isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'

    return (
        <>
            {/* Mobile burger */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-[10px] left-3 z-50 p-2 rounded-lg bg-[var(--navbar)] border border-[var(--border)] shadow-sm"
                aria-label="Открыть меню"
            >
                <Menu size={18} />
            </button>

            {/* Mobile overlay */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={close} />
            )}

            {/* Sidebar */}
            <nav
                className={`
                    bg-[var(--navbar)] h-screen border-r border-[var(--border)] flex flex-col fixed z-50
                    transition-[width,transform] duration-300 ease-in-out
                    w-[240px] ${collapsed ? 'md:w-[64px]' : ''}
                    ${translateClass}
                `}
            >
                {/* ── Header ──────────────────────────────────────────── */}
                {collapsed ? (
                    <button
                        onClick={toggle}
                        aria-label="Развернуть"
                        className="hidden md:flex w-full h-14 border-b border-[var(--border)] shrink-0 items-center justify-center hover:bg-[var(--border)] transition-colors cursor-pointer"
                    >
                        <FaviconIcon />
                    </button>
                ) : (
                    <div className="flex items-center gap-2 px-4 h-14 border-b border-[var(--border)] shrink-0">
                        <div className="flex-1 min-w-0 overflow-hidden"><Logo /></div>
                        <button
                            onClick={toggle}
                            className="hidden md:flex shrink-0 w-7 h-7 items-center justify-center rounded-lg text-[var(--accent-gray)] hover:text-[var(--secondary)] hover:bg-[var(--border)] transition-colors cursor-pointer"
                            aria-label="Свернуть"
                        >
                            <ChevronLeft size={15} />
                        </button>
                        <button
                            onClick={close}
                            className="md:hidden shrink-0 p-1.5 rounded-md hover:bg-[var(--border)] transition text-[var(--accent-gray)] hover:text-[var(--foreground)]"
                            aria-label="Закрыть меню"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}

                {/* ── Nav groups ──────────────────────────────────────── */}
                {/* overflow-y-auto only when expanded — allows tooltips to escape when collapsed */}
                <div className={`flex-1 py-4 px-2 space-y-4 ${collapsed ? '' : 'overflow-y-auto'}`}>
                    {navGroups.map((group, idx) => (
                        <div key={group.label}>
                            {collapsed ? (
                                idx > 0 && <div className="h-px bg-[var(--border)] mx-1 mb-3" />
                            ) : (
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--accent-gray)] px-3 mb-1.5">
                                    {group.label}
                                </p>
                            )}
                            <div className="space-y-0.5">
                                {group.links.map(({ id, label, link, Icon }) => {
                                    const isActive = pathname === link
                                    return (
                                        <Link
                                            key={id}
                                            href={link}
                                            onClick={close}
                                            className={`
                                                relative group flex items-center rounded-lg text-sm font-medium transition-colors
                                                ${collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'}
                                                ${isActive
                                                    ? 'bg-[var(--info)]/10 text-[var(--info)]'
                                                    : 'text-[var(--foreground)] hover:bg-[var(--border)] hover:text-[var(--secondary)]'}
                                            `}
                                        >
                                            <Icon
                                                size={17}
                                                className={`shrink-0 ${isActive ? 'text-[var(--info)]' : 'text-[var(--accent-gray)]'}`}
                                            />
                                            {!collapsed && (
                                                <>
                                                    <span>{label}</span>
                                                    {isActive && (
                                                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--info)]" />
                                                    )}
                                                </>
                                            )}
                                            {collapsed && <Tooltip label={label} />}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Footer ──────────────────────────────────────────── */}
                <div className="shrink-0 border-t border-[var(--border)] p-2 space-y-0.5">
                    <Link
                        href="/profile"
                        onClick={close}
                        className={`relative group flex items-center rounded-lg hover:bg-[var(--border)] transition-colors ${
                            collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'
                        }`}
                    >
                        <div className="w-8 h-8 rounded-full bg-[var(--info)] flex items-center justify-center shrink-0">
                            <span className="text-white text-xs font-bold">АД</span>
                        </div>
                        {!collapsed && (
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-[var(--secondary)] truncate leading-tight">
                                    Администратор
                                </p>
                                <p className="text-xs text-[var(--accent-gray)] truncate">Мой профиль</p>
                            </div>
                        )}
                        {collapsed && <Tooltip label="Мой профиль" />}
                    </Link>

                    <button
                        onClick={handleLogout}
                        className={`relative group w-full flex items-center rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer ${
                            collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'
                        }`}
                    >
                        <LogOut size={16} className="shrink-0" />
                        {!collapsed && <span>Выйти</span>}
                        {collapsed && <Tooltip label="Выйти" />}
                    </button>
                </div>
            </nav>
        </>
    )
}

export default NavBar
