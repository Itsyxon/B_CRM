'use client'
import { useProfile } from '@/app/api/profile/useProfile';
import React, { useState } from 'react';
import Image from 'next/image';
import Loader from '../../atoms/Loader';
import adminPhoto from '../../../assets/admin.jpg';
import { EditIcon, SaveIcon, XIcon, MailIcon, BriefcaseIcon, CalendarIcon } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { UserType } from '@/types/UserTypes';

type Draft = { name: string; email: string; bio: string };

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) => (
    <div className="flex items-center gap-3 py-3 border-b border-[var(--border)] last:border-0">
        <div className="text-[var(--info)] shrink-0">{icon}</div>
        <span className="text-xs text-[var(--accent-gray)] w-28 shrink-0">{label}</span>
        <span className="text-sm text-[var(--foreground)] truncate">{value || '—'}</span>
    </div>
);

const EditField = ({
    label, value, onChange, type = 'text', disabled,
}: {
    label: string; value: string; onChange: (v: string) => void; type?: string; disabled?: boolean;
}) => (
    <div>
        <label className="block text-xs text-[var(--accent-gray)] mb-1.5">{label}</label>
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-2.5 border border-[var(--border)] bg-[var(--input-bg)] text-[var(--foreground)] text-sm rounded-lg focus:outline-none focus:border-[var(--info)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        />
    </div>
);

const ProfileCard = () => {
    const { data: profile, isLoading, isError } = useProfile();
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState<Draft>({ name: '', email: '', bio: '' });

    if (isLoading) {
        return (
            <div className="flex justify-center py-16">
                <Loader className="w-14 h-14" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-2xl bg-[var(--tertiary)] border border-[var(--border)] p-8 text-center">
                <p className="text-[var(--accent-gray)] text-sm">Произошла ошибка при загрузке данных. Повторите попытку позднее</p>
            </div>
        );
    }

    const startEdit = () => {
        setDraft({ name: profile?.name || '', email: profile?.email || '', bio: profile?.bio || '' });
        setIsEditing(true);
    };

    const save = () => {
        queryClient.setQueryData<UserType>(['user'], old => old ? { ...old, ...draft } : old);
        setIsEditing(false);
    };

    return (
        <div className="rounded-2xl overflow-hidden shadow-lg bg-[var(--tertiary)] border border-[var(--border)]">
            <div className="h-24 bg-gradient-to-br from-[var(--info)] to-blue-700" />

            <div className="px-5 sm:px-6 pb-6">
                <div className="flex items-end justify-between -mt-10 mb-5">
                    <div className="ring-4 ring-[var(--tertiary)] rounded-full">
                        <Image
                            className="rounded-full w-16 h-16 sm:w-20 sm:h-20 object-cover"
                            src={profile?.photo || adminPhoto}
                            width={80}
                            height={80}
                            alt="Фото профиля"
                            quality={100}
                        />
                    </div>

                    {!isEditing ? (
                        <button
                            onClick={startEdit}
                            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--accent-gray)] hover:border-[var(--info)] hover:text-[var(--info)] transition-colors"
                        >
                            <EditIcon size={14} />
                            <span className="hidden xs:inline">Изменить</span>
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={save}
                                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-[var(--info)] text-white hover:opacity-90 transition-opacity"
                            >
                                <SaveIcon size={14} />
                                <span className="hidden xs:inline">Сохранить</span>
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--accent-gray)] hover:border-red-400 hover:text-red-400 transition-colors"
                            >
                                <XIcon size={14} />
                            </button>
                        </div>
                    )}
                </div>

                {!isEditing ? (
                    <>
                        <div className="mb-5">
                            <h2 className="text-xl font-semibold text-[var(--foreground)]">{profile?.name}</h2>
                            <p className="text-sm text-[var(--info)] mt-0.5">{profile?.role}</p>
                        </div>
                        <div>
                            <InfoRow icon={<MailIcon size={15} />} label="Email" value={profile?.email} />
                            <InfoRow icon={<BriefcaseIcon size={15} />} label="О себе" value={profile?.bio} />
                            <InfoRow icon={<CalendarIcon size={15} />} label="Дата регистрации" value={profile?.createdAt} />
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <EditField
                            label="Имя"
                            value={draft.name}
                            onChange={v => setDraft(p => ({ ...p, name: v }))}
                        />
                        <EditField
                            label="Email"
                            value={draft.email}
                            onChange={v => setDraft(p => ({ ...p, email: v }))}
                            type="email"
                        />
                        <div className="sm:col-span-2">
                            <label className="block text-xs text-[var(--accent-gray)] mb-1.5">О себе</label>
                            <textarea
                                value={draft.bio}
                                onChange={e => setDraft(p => ({ ...p, bio: e.target.value }))}
                                rows={3}
                                className="w-full px-3 py-2.5 border border-[var(--border)] bg-[var(--input-bg)] text-[var(--foreground)] text-sm rounded-lg focus:outline-none focus:border-[var(--info)] transition-colors resize-none"
                            />
                        </div>
                        <EditField label="Должность" value={profile?.role || ''} onChange={() => {}} disabled />
                        <EditField label="Дата регистрации" value={profile?.createdAt || ''} onChange={() => {}} disabled />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;
