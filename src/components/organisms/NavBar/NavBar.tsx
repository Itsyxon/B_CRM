'use client'
import Button from '@/components/atoms/Button';
import Logo from '@/components/atoms/Logo';
import { CircleGauge, FolderKanban, Settings, ShieldUser, UserRoundCog } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const navLinks = [
    { id: 1, label: 'Дашборд', link: '/dashboard', icon: <CircleGauge /> },
    { id: 2, label: 'Пользователи', link: '/users', icon: <UserRoundCog /> },
    { id: 3, label: 'Персонал', link: '/staff', icon: <ShieldUser /> },
    { id: 4, label: 'Проекты', link: '/projects', icon: <FolderKanban /> },
    { id: 5, label: 'Настройки', link: '/settings', icon: <Settings /> },
]

const NavBar = () => {
    const router = useRouter()
    const handleLogout = () => {
        document.cookie =
            'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        router.push('/login')
    }

    return (
        <nav className='bg-[#F3F3F5] w-[250px] h-screen border-r border-gray-300 flex flex-col py-8 justify-between fixed'>
            <div className='[&>h1]:mb-12 [&>h1]:px-6'>
                <Logo />
                <div className='flex flex-col'>
                    {navLinks.map((navLink) => (
                        <Link href={navLink.link} key={navLink.id} className='py-4 px-6 flex gap-4 hover:border-l-8 border-blue-400 transition'>{navLink.icon} {navLink.label}</Link>
                    ))}
                </div>
            </div>
            <div className='bg-[#F3F3F5] w-fit px-6'>
                <Button onClick={handleLogout} className='bg-red-300 !text-red-700 hover:bg-red-700 hover:!text-white transition'>Выйти</Button>
            </div>
        </nav>
    );
};

export default NavBar;