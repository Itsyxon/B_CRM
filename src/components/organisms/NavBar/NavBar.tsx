'use client'
import Logo from '@/components/atoms/Logo';
import LogoutButton from '@/components/molecules/LogoutButton';
import { CircleGauge, FolderKanban, Menu, MessageCircleQuestionMark, Settings, ShieldUser, UserRoundCog, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
    { id: 1, label: 'Дашборд', link: '/dashboard', icon: <CircleGauge /> },
    { id: 2, label: 'Пользователи', link: '/users', icon: <UserRoundCog /> },
    { id: 3, label: 'Проекты', link: '/projects', icon: <FolderKanban /> },
    { id: 4, label: 'Персонал', link: '/staff', icon: <ShieldUser /> },
    { id: 5, label: 'Настройки', link: '/settings', icon: <Settings /> },
    { id: 6, label: 'Помощь', link: '/help', icon: <MessageCircleQuestionMark /> },
]

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const translateClass = isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0';

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className='md:hidden fixed top-3 left-3 z-50 p-2 rounded-lg bg-[var(--navbar)] border border-[var(--border)] shadow-sm'
                aria-label='Открыть меню'
            >
                <Menu size={20} />
            </button>

            {isOpen && (
                <div
                    className='md:hidden fixed inset-0 bg-black/40 z-40'
                    onClick={() => setIsOpen(false)}
                />
            )}

            <nav className={`bg-[var(--navbar)] w-[250px] h-screen border-r border-[var(--border)] flex flex-col py-8 justify-between fixed z-50 transition-transform duration-300 ${translateClass}`}>
                <div>
                    <div className='flex items-center justify-between px-6 mb-12'>
                        <Logo />
                        <button
                            onClick={() => setIsOpen(false)}
                            className='md:hidden text-secondary hover:text-red-500 transition'
                            aria-label='Закрыть меню'
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className='flex flex-col'>
                        {navLinks.map((navLink) => (
                            <Link
                                href={navLink.link}
                                key={navLink.id}
                                onClick={() => setIsOpen(false)}
                                className='py-5 px-6 flex gap-4 border-l-8 border-[#F3F3F5] hover:border-l-8 hover:border-blue-400 hover:bg-blue-300/30 transition'
                            >
                                {navLink.icon} {navLink.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='bg-[var(--navbar)] w-fit mx-6'>
                    <LogoutButton />
                </div>
            </nav>
        </>
    );
};

export default NavBar;
