'use client'
import React from 'react';
import Button from '../atoms/Button';
import { useRouter } from 'next/navigation';

const InfoButton = ({ className }: { className?: string }) => {
    const router = useRouter()
    return (
        <Button className={`${className} bg-gray-500`} onClick={() => router.push('/info')}>
            ?
        </Button>
    );
};

export default InfoButton;