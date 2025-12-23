import Header from '@/components/organisms/Header/Header';
import NavBar from '@/components/organisms/NavBar/NavBar';
import UserPanel from '@/components/organisms/UserPanel/UserPanel';
import React from 'react';

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <NavBar />
            <UserPanel />
            <main className='ml-[250px] p-8'
            >
                <Header />
                {children}</main>
        </div>
    );
};

export default PagesLayout;