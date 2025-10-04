import Content from '@/components/atoms/Content';
import BackButton from '@/components/molecules/BackButton';
import React from 'react';

const InfoPage = () => {
    return (
        <div className='absolute left-1/2 top-1/2 !w-[550px] -translate-1/2 *:[&>h1]:text-center'>
            <Content>
                <h1 className='text-xl mb-4'>Информация</h1>
                <p>B-CRM - тестовый проект, напоминающей CRM-панель какой-то компании, но на деле не является полноценным продуктом. Используется только в формате разработки.</p>
                <p className='mt-4'><span className='font-bold'>Данные для тестового входа:</span> admin admin1</p>
                <BackButton className='mt-4' />
            </Content>
        </div>
    );
};

export default InfoPage;