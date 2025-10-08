import Button from '@/components/atoms/Button';
import Divider from '@/components/atoms/Divider';
import React from 'react';

const OwnForm = () => {
    return (
        <form className='mt-4 flex flex-col gap-4'>
            <Divider />
            <div className='font-semibold'>Внешний вид</div>
            <div>
                <label className='text-sm'>Язык</label>
            </div>
            <div>
                <label className='text-sm'>Тема сайта</label>
            </div>
            <div>
                <label className='text-sm'>Статусы сделок</label>
            </div>
            <Divider />
            <div className='font-semibold'>Рабочие процессы</div>
            <div>
                <label className='text-sm'>Статусы сделок</label>
            </div>
            <div>
                <label className='text-sm'>Теги и категории</label>
            </div>
            <div>
                <label className='text-sm'>Скрывать суммы</label>
            </div>
            <Divider />
            <div className='font-semibold'>Безопасность</div>
            <div>
                <label className='text-sm'>Двухфакторная аутентификация</label>
            </div>
            <div>
                <label className='text-sm'>Автоматический выход</label>
            </div>
            <div>
                <label className='text-sm'></label>
            </div>
            <Divider />
            <div className='font-semibold'>Уведомления</div>
            <div>
                <label className='text-sm'>О моих проектах</label>
            </div>
            <div>
                <label className='text-sm'>О моих платежах</label>
            </div>
            <div>
                <label className='text-sm'>О пользователях, на которых я подписан</label>
            </div>
            <div>
                <label className='text-sm'></label>
            </div>
            <Button className='self-center'>Сохранить</Button>
        </form>
    );
};

export default OwnForm;