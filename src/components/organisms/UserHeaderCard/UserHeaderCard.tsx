'use client'
import { useProfile } from '@/app/api/profile/useProfile';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const getInitials = (name: string) =>
    name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

const UserHeaderCard = () => {
    const { data: profile } = useProfile();
    const name = profile?.name ?? 'Администратор';
    const role = profile?.role ?? 'Администратор';
    const initials = getInitials(name);

    return (
        <Link
            href="/profile"
            className="flex items-center gap-3 pl-4 border-l border-[var(--border)] hover:opacity-80 transition-opacity group shrink-0"
            title="Перейти в профиль"
        >
            <div className="w-9 h-9 rounded-full bg-[var(--info)] flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-sm">
                {initials}
            </div>
            <div className="hidden sm:block min-w-0">
                <p className="text-sm font-semibold text-[var(--secondary)] leading-tight truncate max-w-[120px]">{name}</p>
                <p className="text-xs text-[var(--accent-gray)] truncate max-w-[120px]">{role}</p>
            </div>
            <ChevronRight
                size={15}
                className="hidden sm:block text-[var(--accent-gray)] group-hover:translate-x-0.5 transition-transform shrink-0"
            />
        </Link>
    );
};

export default UserHeaderCard;
