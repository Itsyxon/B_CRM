import { USER_REQUESTS } from '@/lib/constants';
import LocalStorage from '@/lib/LocalStorage';

type Request = {
    id: number,
    text: string
}

const HelpRequests = () => {
    const requests = LocalStorage.get<Request[]>(USER_REQUESTS) || []

    if (requests.length === 0) {
        return (
            <div>
                <h1 className='text-xl font-semibold mb-4'>Мои обращения</h1>
                <p className="text-gray-500">У вас пока нет обращений в техническую поддержку</p>
            </div>
        )
    }

    return (
        <div className='w-1/3'>
            <h1 className='text-xl font-semibold mb-4'>Мои обращения</h1>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {requests.map((request) => (
                    <div
                        key={request.id}
                        className="bg-[var(--tertiary)] border border-gray-200 rounded-lg p-4 shadow-sm max-w-full"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm text-gray-500">
                                ID: {request.id}
                            </span>
                        </div>
                        <p className="text-gray-800 truncate">{request.text.slice(0, 50)}...</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpRequests;