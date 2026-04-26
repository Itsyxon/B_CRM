import Header from '@/components/organisms/Header/Header'
import NavBar from '@/components/organisms/NavBar/NavBar'
import UserPanel from '@/components/organisms/UserPanel/UserPanel'
import NavContentArea from '@/components/atoms/NavContentArea'
import { NavCollapseProvider } from '@/context/NavCollapseContext'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <NavCollapseProvider>
            <NavBar />
            <NavContentArea>
                <UserPanel />
                <main className='p-4 md:p-8 overflow-x-hidden'>
                    <Header />
                    {children}
                </main>
            </NavContentArea>
        </NavCollapseProvider>
    )
}

export default PagesLayout
