'use client'
import { useProfile } from '@/app/api/profile/useProfile';
import React from 'react';
import Content from '../../atoms/Content';
import Image from 'next/image';
import Loader from '../../atoms/Loader';
import adminPhoto from '../../../assets/admin.jpg'
import Button from '@/components/atoms/Button';
import { EditIcon } from 'lucide-react';

const ProfileCard = () => {
    const { data: profileCard, isLoading, isError } = useProfile()

    if (isLoading) {
        return <Loader className='w-24 h-24 mx-auto' />
    }

    if (isError) {
        return <p className='text-lg'>Произошла ошибка при загрузке данных. Повторите попытку позднее</p>
    }

    return (
        <Content className='w-full'>
            <div className='flex gap-12 justify-between border-gray-200 rounded-md border p-4'>
                <div className='flex items-center'>
                    <Image className='rounded-full w-30 h-30' src={profileCard?.photo || adminPhoto} width={100} height={100} alt='photo' quality={100} />
                    <div className='flex flex-col gap-1'>
                        <p className='text-lg font-semibold'>{profileCard?.name}</p>
                        <p className='text-md'>{profileCard?.email}</p>
                        <p className='text-md'>{profileCard?.role}</p>
                        <p className='text-md'>Дата регистрации: {profileCard?.createdAt}</p>
                    </div>
                </div>
                <Button className='self-start flex items-center gap-3 text-sm'><EditIcon size={18} /> Изменить</Button>
            </div>
        </Content>
    );
};

export default ProfileCard;