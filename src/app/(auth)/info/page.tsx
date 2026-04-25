import BackButton from '@/components/molecules/BackButton';
import { InfoIcon, KeyIcon } from 'lucide-react';

const InfoPage = () => {
    return (
        <div className="w-full max-w-sm">
            <div className="bg-[var(--tertiary)] rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden">
                <div className="bg-gradient-to-br from-[var(--info)] to-blue-700 px-8 py-7 text-center">
                    <h1 className="text-white text-3xl font-bold tracking-tight">B-CRM</h1>
                    <p className="text-white/60 text-sm mt-1">Система управления</p>
                </div>

                <div className="p-7">
                    <div className="flex items-center gap-2 mb-4">
                        <InfoIcon size={18} className="text-[var(--info)]" />
                        <h2 className="text-lg font-semibold text-[var(--foreground)]">Информация</h2>
                    </div>

                    <p className="text-sm text-[var(--accent-gray)] leading-relaxed mb-6">
                        B-CRM — тестовый проект, напоминающий CRM-панель компании, но не являющийся полноценным продуктом. Используется только в формате разработки.
                    </p>

                    <div className="bg-[var(--info)]/8 border border-[var(--info)]/20 rounded-xl p-4 mb-6">
                        <p className="text-xs text-[var(--info)] font-medium mb-3 flex items-center gap-1.5">
                            <KeyIcon size={12} />
                            Данные для тестового входа
                        </p>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-[var(--accent-gray)] w-14 shrink-0">Логин:</span>
                                <code className="text-sm font-mono bg-[var(--background)] text-[var(--foreground)] px-2.5 py-0.5 rounded-md border border-[var(--border)]">
                                    admin
                                </code>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-[var(--accent-gray)] w-14 shrink-0">Пароль:</span>
                                <code className="text-sm font-mono bg-[var(--background)] text-[var(--foreground)] px-2.5 py-0.5 rounded-md border border-[var(--border)]">
                                    admin1
                                </code>
                            </div>
                        </div>
                    </div>

                    <BackButton className="w-full justify-center" />
                </div>
            </div>
        </div>
    );
};

export default InfoPage;
