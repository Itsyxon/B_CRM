'use client'
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { AuthData } from '@/types/AuthTypes';
import { useRouter } from 'next/navigation';
import React, { ComponentProps, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

const FormInput = ({ name, type = 'text', ...props }: { name: string } & ComponentProps<'input'>) => {
    const { register } = useFormContext()
    const commonProps = {
        className: 'bg-[#FFFFF2] rounded-lg px-2 py-1 text-black focus:outline-0 min-w-[400px] !text-lg',
        ...register(name),
        ...props
    }

    return <Input {...commonProps} type={type} />
}

const LoginForm = () => {
    const methods = useForm<AuthData>()
    const router = useRouter()
    const [error, setError] = useState<boolean>(false)
    const [submiting, setSubmiting] = useState<boolean>(false)

    const formSubmit = (data: AuthData) => {
        setSubmiting(true)
        setTimeout(() => {
            if (data.user_login == 'admin' && data.user_password == 'admin1') { // ! Тестовые данные без привязки к бэку
                document.cookie = 'auth-token=token5'
                router.push('/dashboard')
            } else {
                setError(true)
            }
            setSubmiting(false)
        }, 1000) // * имитация отправки запроса
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(formSubmit)} className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1.5'>
                    <label className='text-lg'>Логин</label>
                    <FormInput name='user_login' className='w-full'></FormInput>
                </div>
                <div className='flex flex-col gap-1.5'>
                    <label className='text-lg'>Пароль</label>
                    <FormInput name='user_password' type='password' className='w-full'></FormInput>
                </div>
                {error && <p className='my-2 text-red-700'>Данные указаны неверно</p>}
                <Button disabled={submiting} className='mt-2 w-[125px] self-center'>{submiting ? 'Загрузка...' : 'Войти'}</Button>
            </form>
        </FormProvider >
    );
};

export default LoginForm;