'use client'
import Logo from '@/components/atoms/Logo';
import { CircleGauge, FolderKanban, LogOut, Menu, MessageCircleQuestionMark, Settings, ShieldUser, UserRoundCog, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navGroups = [
    {
        label: 'Основное',
        links: [
            { id: 1, label: 'Дашборд', link: '/dashboard', Icon: CircleGauge },
            { id: 2, label: 'Пользователи', link: '/users', Icon: UserRoundCog },
            { id: 3, label: 'Проекты', link: '/projects', Icon: FolderKanban },
            { id: 4, label: 'Персонал', link: '/staff', Icon: ShieldUser },
        ],
    },
    {
        label: 'Система',
        links: [
            { id: 5, label: 'Настройки', link: '/settings', Icon: Settings },
            { id: 6, label: 'Помощь', link: '/help', Icon: MessageCircleQuestionMark },
        ],
    },
]

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/login');
    };

    const close = () => setIsOpen(false);
    const translateClass = isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0';

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

            {/* Overlay */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={close} />
            )}

            {/* Sidebar */}
            <nav className={`bg-[var(--navbar)] w-[240px] h-screen border-r border-[var(--border)] flex flex-col fixed z-50 transition-transform duration-300 ${translateClass}`}>

                {/* Logo */}
                <div className="flex items-center justify-between px-5 h-14 border-b border-[var(--border)] shrink-0">
                    <Logo />
                    <button
                        onClick={close}
                        className="md:hidden p-1 rounded-md hover:bg-[var(--border)] transition text-[var(--accent-gray)] hover:text-[var(--foreground)]"
                        aria-label="Закрыть меню"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Nav groups */}
                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
                    {navGroups.map((group) => (
                        <div key={group.label}>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--accent-gray)] px-3 mb-1.5">
                                {group.label}
                            </p>
                            <div className="space-y-0.5">
                                {group.links.map(({ id, label, link, Icon }) => {
                                    const isActive = pathname === link;
                                    return (
                                        <Link
                                            key={id}
                                            href={link}
                                            onClick={close}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                                ? 'bg-[var(--info)]/10 text-[var(--info)]'
                                                : 'text-[var(--foreground)] hover:bg-[var(--border)] hover:text-[var(--secondary)]'
                                                }`}
                                        >
                                            <Icon size={17} className={isActive ? 'text-[var(--info)]' : 'text-[var(--accent-gray)]'} />
                                            {label}
                                            {isActive && (
                                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--info)]" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer: user card + logout */}
                <div className="shrink-0 border-t border-[var(--border)] p-3 space-y-1">
                    <Link
                        href="/profile"
                        onClick={close}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--border)] transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-full bg-[var(--info)] flex items-center justify-center shrink-0">
                            <span className="text-white text-xs font-bold">АД</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-[var(--secondary)] truncate leading-tight">Администратор</p>
                            <p className="text-xs text-[var(--accent-gray)] truncate">Мой профиль</p>
                        </div>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                        <LogOut size={16} />
                        Выйти
                    </button>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
