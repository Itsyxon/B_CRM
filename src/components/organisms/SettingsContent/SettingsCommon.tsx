import Content from '@/components/atoms/Content';
import React from 'react';
import CommonForm from './CommonForm/CommonForm';

const SettingsCommon = () => {
    return (
        <Content className='w-full'>
            <h1 className='text-lg'>Общие настройки</h1>
            <CommonForm />
        </Content>
    );
};

export default SettingsCommon;