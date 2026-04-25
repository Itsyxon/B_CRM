'use client'
import { usersData } from '@/app/api/users/data';
import { staffData } from '@/app/api/staff/data';
import { UserType } from '@/types/UserTypes';
import { ChevronRight, Search, SearchX, ShieldUser, UserRoundCog } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

const AVATAR_COLORS = [
    'bg-blue-500', 'bg-emerald-500', 'bg-violet-500',
    'bg-amber-500', 'bg-rose-500', 'bg-cyan-500',
    'bg-indigo-500', 'bg-teal-500',
];

const getInitials = (name: string) =>
    name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

const getColor = (id: number) => AVATAR_COLORS[id % AVATAR_COLORS.length];

type ResultItemProps = {
    user: UserType;
    subtitle: string;
    href: string;
    badge?: string;
    badgeClass?: string;
};

const ResultItem = ({ user, subtitle, href, badge, badgeClass }: ResultItemProps) => (
    <Link
        href={href}
        className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--tertiary)] hover:border-[var(--info)]/40 hover:shadow-sm transition-all group"
    >
        <div className={`w-9 h-9 rounded-full ${getColor(user.id)} flex items-center justify-center shrink-0`}>
            <span className="text-white text-xs font-semibold">{getInitials(user.name)}</span>
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--secondary)] truncate leading-tight">{user.name}</p>
            <p className="text-xs text-[var(--accent-gray)] truncate mt-0.5">{subtitle}</p>
        </div>
        {badge && (
            <span className={`hidden sm:inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${badgeClass}`}>
                {badge}
            </span>
        )}
        <ChevronRight size={15} className="text-[var(--accent-gray)] group-hover:text-[var(--info)] group-hover:translate-x-0.5 transition-all shrink-0" />
    </Link>
);

type SearchResultsProps = { value: string };

const SearchResults = ({ value }: SearchResultsProps) => {
    const { users, staff } = useMemo(() => {
        if (!value.trim()) return { users: [], staff: [] };
        const q = value.toLowerCase();
        return {
            users: usersData.filter(u =>
                u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
            ),
            staff: staffData.filter(s =>
                s.name.toLowerCase().includes(q) ||
                s.email.toLowerCase().includes(q) ||
                s.role?.toLowerCase().includes(q)
            ),
        };
    }, [value]);

    const total = users.length + staff.length;

    if (!value.trim()) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--navbar)] flex items-center justify-center mb-4">
                    <Search size={24} className="text-[var(--accent-gray)]" />
                </div>
                <p className="text-base font-semibold text-[var(--secondary)]">Введите запрос</p>
                <p className="text-sm text-[var(--accent-gray)] mt-1">Поиск по пользователям и персоналу</p>
            </div>
        );
    }

    if (total === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--navbar)] flex items-center justify-center mb-4">
                    <SearchX size={24} className="text-[var(--accent-gray)]" />
                </div>
                <p className="text-base font-semibold text-[var(--secondary)]">Ничего не найдено</p>
                <p className="text-sm text-[var(--accent-gray)] mt-1">
                    По запросу <span className="font-medium text-[var(--foreground)]">«{value}»</span> результатов нет
                </p>
            </div>
        );
    }

    return (
        <div className="mt-5 max-w-2xl space-y-7">
            <p className="text-sm text-[var(--accent-gray)]">
                Найдено <span className="font-semibold text-[var(--foreground)]">{total}</span> результатов по запросу{' '}
                <span className="font-semibold text-[var(--foreground)]">«{value}»</span>
            </p>

            {users.length > 0 && (
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <UserRoundCog size={14} className="text-[var(--accent-gray)]" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-gray)]">
                            Пользователи
                        </span>
                        <span className="text-xs font-semibold text-[var(--info)] bg-[var(--info)]/10 px-1.5 py-0.5 rounded-full">
                            {users.length}
                        </span>
                    </div>
                    <div className="space-y-2">
                        {users.map(u => (
                            <ResultItem
                                key={u.id}
                                user={u}
                                subtitle={u.email}
                                href="/users"
                                badge="Пользователь"
                                badgeClass="text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10"
                            />
                        ))}
                    </div>
                </section>
            )}

            {staff.length > 0 && (
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <ShieldUser size={14} className="text-[var(--accent-gray)]" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-gray)]">
                            Персонал
                        </span>
                        <span className="text-xs font-semibold text-[var(--info)] bg-[var(--info)]/10 px-1.5 py-0.5 rounded-full">
                            {staff.length}
                        </span>
                    </div>
                    <div className="space-y-2">
                        {staff.map(s => (
                            <ResultItem
                                key={s.id}
                                user={s}
                                subtitle={s.role ?? s.email}
                                href="/staff"
                                badge={s.role}
                                badgeClass="text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10"
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default SearchResults;
