import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import React from 'react';

const LoginForm = () => {
    return (
        <form className='flex flex-col gap-2 min-w-[550px]'>
            <div className='flex flex-col gap-1.5'>
                <label className='text-lg ml-4'>Логин</label>
                <Input className='w-full'></Input>
            </div>
            <div className='flex flex-col gap-1.5'>
                <label className='text-lg ml-4'>Пароль</label>
                <Input className='w-full'></Input>
            </div>
            <Button className='mt-2 w-[125px] self-center'>Войти</Button>
        </form>
    );
};

export default LoginForm;