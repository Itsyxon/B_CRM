import Content from '@/components/atoms/Content';
import Logo from '@/components/atoms/Logo';
import InfoButton from '@/components/molecules/InfoButton';
import LoginForm from '@/components/organisms/LoginForm/LoginForm';
import React from 'react';

const LoginPage = () => {
    return (
        <div className='absolute left-1/2 top-1/2 -translate-1/2 *:[&>h1]:text-center [&>*]:first:!w-[550px]'>
            <Content>
                <Logo />
                <LoginForm />
            </Content>
            <InfoButton className='mt-3' />
        </div>
    );
};

export default LoginPage;