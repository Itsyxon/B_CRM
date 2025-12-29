'use client'
import { useRouter } from "next/navigation";
import Button from "../atoms/Button";

const LogoutButton = () => {
    const router = useRouter()
    const handleLogout = () => {
        document.cookie =
            'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        router.push('/login')
    }
    return (
        <Button onClick={handleLogout} className='bg-red-300 !text-red-700 hover:bg-red-700 hover:!text-white transition'>Выйти</Button>
    );
};

export default LogoutButton;