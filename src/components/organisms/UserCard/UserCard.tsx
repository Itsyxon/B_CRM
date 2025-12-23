import { ChevronDown, CircleUser } from 'lucide-react';
import React from 'react';

const UserCard = () => {
    return (
        <div className='flex pl-8 border-l border-gray-300 items-center gap-6 '>
            <p className='text-md text-[var(--secondary)] font-semibold'>Администратор</p>
            <CircleUser className='w-10 h-10 cursor-pointer' />
            <ChevronDown className='text-[var(--secondary)] cursor-pointer' />
        </div>
    );
};

export default UserCard;