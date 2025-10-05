'use client'
import Button from '@/components/atoms/Button';
import Logo from '@/components/atoms/Logo';
import { useRouter } from 'next/navigation';
import React from 'react';

const NavBar = () => {
    const router = useRouter()
    const handleLogout = () => {
        document.cookie =
            'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        router.push('/login')

    }
    return (
        <nav className='bg-[#F3F3F5] w-[250px] h-screen border-r border-gray-300 flex flex-col py-8 pl-16 justify-between fixed'>
            <div className='[&>h1]:mb-12'>
                <Logo />
                <div>

                </div>
            </div>
            <div className='bg-[#F3F3F5] w-fit'>
                <Button onClick={handleLogout} className='bg-red-300 !text-red-700 hover:bg-red-700 hover:!text-white transition'>Выйти</Button>
            </div>
        </nav>
    );
};

export default NavBar;