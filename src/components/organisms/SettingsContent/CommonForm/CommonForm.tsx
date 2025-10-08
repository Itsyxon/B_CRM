import Button from '@/components/atoms/Button';
import Divider from '@/components/atoms/Divider';
import Link from 'next/link';
import React from 'react';

const CommonForm = () => {
    return (
        <form className='mt-4 flex flex-col gap-4'>
            <Divider />
            <div className='font-semibold'>Настройки компании</div>
            <div>
                <label className='text-sm'>Название компании</label>
            </div>
            <div>
                <label className='text-sm'>Скрывать название моей компании</label>
            </div>
            <div>
                <label className='text-sm'>Скрывать количество сотрудников в моей компании</label>
            </div>
            <div>
                <label className='text-sm'>Скрывать количество сделок моей компании</label>
            </div>
            <div>
                <label className='text-sm'>Сделать профиль моей компании закрытым</label>
            </div>
            <Divider />
            <div className='font-semibold'>Виджеты</div>
            <p className='text-sm text-[var(--secondary)]'><Link className='text-blue-400 font-semibold underline underline-offset-4' href='/help'>Свяжитесь</Link> с тех. поддержкой, чтобы запросить создание собственного виджета</p>
            <Divider />
            <div className='font-semibold'>Настройка проектов</div>
            <div>
                <label className='text-sm'>Автоматически скрывать проекты с истекшим сроком</label>
            </div>
            <Button className='self-center'>Сохранить</Button>
        </form>
    );
};

export default CommonForm;