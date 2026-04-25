import Header from '@/components/organisms/Header/Header';
import NavBar from '@/components/organisms/NavBar/NavBar';
import UserPanel from '@/components/organisms/UserPanel/UserPanel';
import React from 'react';

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <NavBar />
            <div className='md:ml-[250px]'>
                <UserPanel />
                <main className='p-4 md:p-8'>
                    <Header />
                    {children}
                </main>
            </div>
        </div>
    );
};

export default PagesLayout;