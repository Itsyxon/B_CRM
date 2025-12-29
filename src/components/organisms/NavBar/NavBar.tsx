import Logo from '@/components/atoms/Logo';
import LogoutButton from '@/components/molecules/LogoutButton';
import { CircleGauge, FolderKanban, MessageCircleQuestionMark, Settings, ShieldUser, UserRoundCog } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
    { id: 1, label: 'Дашборд', link: '/dashboard', icon: <CircleGauge /> },
    { id: 2, label: 'Пользователи', link: '/users', icon: <UserRoundCog /> },
    { id: 3, label: 'Проекты', link: '/projects', icon: <FolderKanban /> },
    { id: 4, label: 'Персонал', link: '/staff', icon: <ShieldUser /> },
    { id: 5, label: 'Настройки', link: '/settings', icon: <Settings /> },
    { id: 6, label: 'Помощь', link: '/help', icon: <MessageCircleQuestionMark /> },
]

const NavBar = () => {
    return (
        <nav className='bg-[var(--navbar)] w-[250px] h-screen border-r border-gray-300 flex flex-col py-8 justify-between fixed'>
            <div className='[&>h1]:mb-12 [&>h1]:px-6'>
                <Logo />
                <div className='flex flex-col'>
                    {navLinks.map((navLink) => (
                        <Link href={navLink.link} key={navLink.id} className='py-5 px-6 flex gap-4 border-l-8 border-[#F3F3F5] hover:border-l-8 hover:border-blue-400 hover:bg-blue-300/30 transition font-medium'>{navLink.icon} {navLink.label}</Link>
                    ))}
                </div>
            </div>
            <div className='bg-[var(--navbar)] w-fit mx-6'>
                <LogoutButton />
            </div>
        </nav>
    );
};

export default NavBar;