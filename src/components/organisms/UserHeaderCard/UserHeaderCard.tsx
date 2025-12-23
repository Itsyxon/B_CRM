import { ChevronDown, CircleUser } from 'lucide-react';
import Link from 'next/link';

const UserHeaderCard = () => {
    return (
        <div className='flex pl-8 border-l border-gray-300 items-center gap-6 '>
            <p className='text-md text-[var(--secondary)] font-semibold'>Администратор</p>
            <Link href='/profile'><CircleUser className='w-10 h-10 cursor-pointer' /></Link>
            <ChevronDown className='text-[var(--secondary)] cursor-pointer' />
        </div>
    );
};

export default UserHeaderCard;