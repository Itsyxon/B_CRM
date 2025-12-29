import Content from '@/components/atoms/Content';
import React from 'react';
import OwnForm from './OwnForm/OwnForm';

const SettingsOwn = () => {
    return (
        <Content className='w-full rounded-tl-none'>
            <h1 className='text-lg'>Личные настройки</h1>
            <OwnForm />
        </Content>
    );
};

export default SettingsOwn;