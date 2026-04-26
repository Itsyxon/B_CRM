import ProfileCard from '@/components/organisms/ProfileCard/ProfileCard'
import ProfileStats from '@/components/organisms/ProfileStats/ProfileStats'
import ProfileActivity from '@/components/organisms/ProfileActivity/ProfileActivity'

const ProfilePage = () => {
    return (
        <div className="flex flex-col gap-4 lg:gap-6">
            <ProfileStats />
            <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4 lg:gap-6 items-start">
                <ProfileCard />
                <ProfileActivity />
            </div>
        </div>
    )
}

export default ProfilePage
