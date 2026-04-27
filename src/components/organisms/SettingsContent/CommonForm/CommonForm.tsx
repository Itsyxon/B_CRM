'use client'
import React, { useState } from 'react'
import { Check } from 'lucide-react'
import Link from 'next/link'
import Divider from '@/components/atoms/Divider'
import Input from '@/components/atoms/Input'
import { useSettings } from '@/context/SettingsContext'
import { settingsDictionary } from '@/lib/dictionaries'
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
    const { own, common, updateCommon } = useSettings()
    const d = settingsDictionary[own.language]
    const [companyName, setCompanyName] = useState(common.companyName)

    const set = <K extends keyof CommonSettings>(key: K, value: CommonSettings[K]) => {
        updateCommon({ ...common, [key]: value })
    }

    return (
        <div className="mt-4 flex flex-col gap-0">
            <Divider />
            <div className="py-3">
                <SectionTitle>{d.sections.company}</SectionTitle>
                <div className="py-2.5">
                    <label className="text-sm font-medium text-[var(--foreground)] block mb-1.5">
                        {d.common.companyNameLabel}
                    </label>
                    <Input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        onBlur={() => set('companyName', companyName)}
                        placeholder={d.common.companyNamePlaceholder}
                        className="w-full max-w-sm"
                    />
                </div>
                <Row label={d.common.hideCompanyName} description={d.common.hideCompanyNameDesc}>
                    <Checkbox
                        id="hideCompanyName"
                        checked={common.hideCompanyName}
                        onChange={(v) => set('hideCompanyName', v)}
                    />
                </Row>
                <Row label={d.common.hideEmployeeCount} description={d.common.hideEmployeeCountDesc}>
                    <Checkbox
                        id="hideEmployeeCount"
                        checked={common.hideEmployeeCount}
                        onChange={(v) => set('hideEmployeeCount', v)}
                    />
                </Row>
                <Row label={d.common.hideDealCount} description={d.common.hideDealCountDesc}>
                    <Checkbox
                        id="hideDealCount"
                        checked={common.hideDealCount}
                        onChange={(v) => set('hideDealCount', v)}
                    />
                </Row>
                <Row label={d.common.privateProfile} description={d.common.privateProfileDesc}>
                    <Checkbox
                        id="privateProfile"
                        checked={common.privateProfile}
                        onChange={(v) => set('privateProfile', v)}
                    />
                </Row>
            </div>

            <Divider />
            <div className="py-3">
                <SectionTitle>{d.sections.widgets}</SectionTitle>
                <p className="text-sm text-[var(--secondary)] py-1">
                    <Link
                        className="text-[var(--info)] font-semibold underline underline-offset-4"
                        href="/help"
                    >
                        {d.common.widgetContact}
                    </Link>{' '}
                    {d.common.widgetContactText}
                </p>
            </div>

            <Divider />
            <div className="py-3">
                <SectionTitle>{d.sections.projects}</SectionTitle>
                <Row label={d.common.autoHideExpired} description={d.common.autoHideExpiredDesc}>
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
