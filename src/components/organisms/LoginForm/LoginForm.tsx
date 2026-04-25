'use client'
import { AuthData } from '@/types/AuthTypes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserIcon, LockIcon, EyeIcon, EyeOffIcon, AlertCircleIcon } from 'lucide-react';

const LoginForm = () => {
    const { register, handleSubmit } = useForm<AuthData>();
    const router = useRouter();
    const [error, setError] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const formSubmit = (data: AuthData) => {
        setSubmitting(true);
        setError(false);
        setTimeout(() => {
            if (data.user_login === 'admin' && data.user_password === 'admin1') {
                document.cookie = 'auth-token=token5';
                router.push('/dashboard');
            } else {
                setError(true);
            }
            setSubmitting(false);
        }, 1000);
    };

    return (
        <div className="w-full max-w-sm">
            <div className="bg-[var(--tertiary)] rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden">
                <div className="bg-gradient-to-br from-[var(--info)] to-blue-700 px-8 py-7 text-center">
                    <h1 className="text-white text-3xl font-bold tracking-tight">B-CRM</h1>
                    <p className="text-white/60 text-sm mt-1">Система управления</p>
                </div>

                <div className="p-7">
                    <h2 className="text-lg font-semibold text-[var(--foreground)]">Добро пожаловать</h2>
                    <p className="text-sm text-[var(--accent-gray)] mb-6">Войдите в свой аккаунт</p>

                    <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm text-[var(--foreground)]">Логин</label>
                            <div className="relative">
                                <UserIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent-gray)] pointer-events-none" />
                                <input
                                    {...register('user_login')}
                                    type="text"
                                    placeholder="Введите логин"
                                    autoComplete="username"
                                    className="w-full pl-9 pr-3 py-2.5 border border-[var(--border)] bg-[var(--input-bg)] text-[var(--foreground)] rounded-lg text-sm focus:outline-none focus:border-[var(--info)] transition-colors placeholder:text-[var(--accent-gray)]/60"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm text-[var(--foreground)]">Пароль</label>
                            <div className="relative">
                                <LockIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent-gray)] pointer-events-none" />
                                <input
                                    {...register('user_password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Введите пароль"
                                    autoComplete="current-password"
                                    className="w-full pl-9 pr-10 py-2.5 border border-[var(--border)] bg-[var(--input-bg)] text-[var(--foreground)] rounded-lg text-sm focus:outline-none focus:border-[var(--info)] transition-colors placeholder:text-[var(--accent-gray)]/60"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(p => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--accent-gray)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    {showPassword ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-400">
                                <AlertCircleIcon size={15} className="shrink-0" />
                                <span className="text-sm">Неверный логин или пароль</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="mt-1 w-full py-2.5 bg-[var(--info)] text-white rounded-lg text-sm font-medium hover:opacity-90 active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Вход...
                                </span>
                            ) : 'Войти'}
                        </button>
                    </form>

                    <div className="mt-5 text-center">
                        <Link href="/info" className="text-xs text-[var(--accent-gray)] hover:text-[var(--info)] transition-colors">
                            Информация о системе
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
