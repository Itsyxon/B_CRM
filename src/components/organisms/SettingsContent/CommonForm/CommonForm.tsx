'use client'
import React, { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import Link from 'next/link'
import Divider from '@/components/atoms/Divider'
import Input from '@/components/atoms/Input'
import { useSettings } from '@/context/SettingsContext'
import { CommonSettings } from '@/types/SettingsTypes'

const Checkbox = ({
    id,
    checked,
    onChange,
}: {
    id: string
    checked: boolean
    onChange: (v: boolean) => void
}) => (
    <button
        type="button"
        id={id}
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer shrink-0
            ${checked
                ? 'bg-[var(--info)] border-[var(--info)]'
                : 'bg-[var(--input-bg)] border-[var(--accent-gray)] hover:border-[var(--info)]'
            }`}
    >
        {checked && <Check size={11} className="text-white" strokeWidth={3} />}
    </button>
)

const Row = ({
    label,
    description,
    children,
}: {
    label: string
    description?: string
    children: React.ReactNode
}) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 py-2.5">
        <div className="sm:w-[300px] sm:shrink-0 flex-1">
            <p className="text-sm font-medium text-[var(--foreground)]">{label}</p>
            {description && (
                <p className="text-xs text-[var(--accent-gray)] mt-0.5">{description}</p>
            )}
        </div>
        <div className="shrink-0">{children}</div>
    </div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm font-semibold text-[var(--secondary)] uppercase tracking-wide mt-1 mb-1">
        {children}
    </p>
)

const CommonForm = () => {
    const { common, updateCommon } = useSettings()
    const [companyName, setCompanyName] = useState(common.companyName)

    useEffect(() => {
        setCompanyName(common.companyName)
    }, [common.companyName])

    const set = <K extends keyof CommonSettings>(key: K, value: CommonSettings[K]) => {
        updateCommon({ ...common, [key]: value })
    }

    return (
        <div className="mt-4 flex flex-col gap-0">
            <Divider />
            <div className="py-3">
                <SectionTitle>Настройки компании</SectionTitle>
                <div className="py-2.5">
                    <label className="text-sm font-medium text-[var(--foreground)] block mb-1.5">
                        Название компании
                    </label>
                    <Input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        onBlur={() => set('companyName', companyName)}
                        placeholder="Введите название"
                        className="w-full max-w-sm"
                    />
                </div>
                <Row
                    label="Скрывать название компании"
                    description="Другие пользователи не увидят название"
                >
                    <Checkbox
                        id="hideCompanyName"
                        checked={common.hideCompanyName}
                        onChange={(v) => set('hideCompanyName', v)}
                    />
                </Row>
                <Row
                    label="Скрывать количество сотрудников"
                    description="Скрыть число сотрудников в вашем профиле"
                >
                    <Checkbox
                        id="hideEmployeeCount"
                        checked={common.hideEmployeeCount}
                        onChange={(v) => set('hideEmployeeCount', v)}
                    />
                </Row>
                <Row
                    label="Скрывать количество сделок"
                    description="Скрыть статистику сделок от других пользователей"
                >
                    <Checkbox
                        id="hideDealCount"
                        checked={common.hideDealCount}
                        onChange={(v) => set('hideDealCount', v)}
                    />
                </Row>
                <Row
                    label="Закрытый профиль компании"
                    description="Доступен только участникам вашей компании"
                >
                    <Checkbox
                        id="privateProfile"
                        checked={common.privateProfile}
                        onChange={(v) => set('privateProfile', v)}
                    />
                </Row>
            </div>

            <Divider />
            <div className="py-3">
                <SectionTitle>Виджеты</SectionTitle>
                <p className="text-sm text-[var(--secondary)] py-1">
                    <Link
                        className="text-[var(--info)] font-semibold underline underline-offset-4"
                        href="/help"
                    >
                        Свяжитесь
                    </Link>{' '}
                    с тех. поддержкой, чтобы запросить создание собственного виджета
                </p>
            </div>

            <Divider />
            <div className="py-3">
                <SectionTitle>Настройка проектов</SectionTitle>
                <Row
                    label="Автоматически скрывать просроченные проекты"
                    description="Проекты с истекшим сроком убираются из общего списка"
                >
                    <Checkbox
                        id="autoHideExpiredProjects"
                        checked={common.autoHideExpiredProjects}
                        onChange={(v) => set('autoHideExpiredProjects', v)}
                    />
                </Row>
            </div>
        </div>
    )
}

export default CommonForm
