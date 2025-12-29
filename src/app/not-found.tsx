import Logo from '@/components/atoms/Logo';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
    return (
        <div className='w-full h-full'>
            <div className='absolute left-1/2 top-1/2 -translate-1/2 text-center'>
                <Logo />
                <h1 className='text-3xl font-semibold text-secondary my-6'>Страница не найдена</h1>
                <Link className='text-xl text-[var(--info)] underline underline-offset-4' href='/'>Вернуться на главную</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;