'use client'
import React from 'react';
import Button from '../atoms/Button';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const BackButton = ({ className }: { className?: string }) => {
    const router = useRouter()
    return (
        <Button onClick={() => router.back()} className={`flex items-center !px-2 ${className}`}>
            <ChevronLeft className='p-0' /> Назад
        </Button>
    );
};

export default BackButton;