'use client'
import React from 'react'
import { Check } from 'lucide-react'
import Divider from '@/components/atoms/Divider'
import ThemeToggle from '@/components/molecules/ThemeToggle'
import { useSettings } from '@/context/SettingsContext'
import { settingsDictionary } from '@/lib/dictionaries'
import { Language, OwnSettings } from '@/types/SettingsTypes'

const SegmentedToggle = <T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) => (
  <div className='inline-flex rounded-lg overflow-hidden border border-[var(--border)]'>
    {options.map((opt) => (
      <button
        key={opt.value}
        type='button'
        onClick={() => onChange(opt.value)}
        className={`px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer
                    ${
                      value === opt.value
                        ? 'bg-[var(--info)] text-white'
                        : 'bg-[var(--tertiary)] text-[var(--secondary)] hover:bg-[var(--navbar)]'
                    }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
)

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) => (
  <button
    type='button'
    role='switch'
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative h-6 w-11 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none shrink-0
            ${checked ? 'bg-[var(--info)]' : 'bg-[var(--accent-gray)]/40'}`}
  >
    <span
      className={`absolute top-[2px] h-5 w-5 rounded-full bg-white shadow-md transition-all duration-200
                ${checked ? 'left-[22px]' : 'left-[2px]'}`}
    />
  </button>
)

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
    type='button'
    id={id}
    role='checkbox'
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer shrink-0
            ${
              checked
                ? 'bg-[var(--info)] border-[var(--info)]'
                : 'bg-[var(--input-bg)] border-[var(--accent-gray)] hover:border-[var(--info)]'
            }`}
  >
    {checked && <Check size={11} className='text-white' strokeWidth={3} />}
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
  <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 py-2.5'>
    <div className='sm:w-[300px] sm:shrink-0 flex-1'>
      <p className='text-sm font-medium text-[var(--foreground)]'>{label}</p>
      {description && (
        <p className='text-xs text-[var(--accent-gray)] mt-0.5'>
          {description}
        </p>
      )}
    </div>
    <div className='shrink-0'>{children}</div>
  </div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <p className='text-sm font-semibold text-[var(--secondary)] uppercase tracking-wide mt-1 mb-1'>
    {children}
  </p>
)

const OwnForm = () => {
  const { own, updateOwn } = useSettings()
  const d = settingsDictionary[own.language]

  const set = <K extends keyof OwnSettings>(key: K, value: OwnSettings[K]) => {
    updateOwn({ ...own, [key]: value })
  }

  return (
    <div className='mt-4 flex flex-col gap-0'>
      <Divider />
      <div className='py-3'>
        <SectionTitle>{d.sections.appearance}</SectionTitle>
        <Row label={d.own.language}>
          <SegmentedToggle<Language>
            value={own.language}
            options={[
              { value: 'ru', label: 'RU' },
              { value: 'en', label: 'ENG' },
              { value: 'de', label: 'DE' },
            ]}
            onChange={(v) => set('language', v)}
          />
        </Row>
        <Row label={d.own.theme}>
          <ThemeToggle />
        </Row>
        <Row label={d.own.dealStatuses} description={d.own.dealStatusesDesc}>
          <Checkbox
            id='dealStatusesVisible'
            checked={own.dealStatusesVisible}
            onChange={(v) => set('dealStatusesVisible', v)}
          />
        </Row>
      </div>

      <Divider />
      <div className='py-3'>
        <SectionTitle>{d.sections.workflows}</SectionTitle>
        <Row label={d.own.tagsAndCategories} description={d.own.tagsAndCategoriesDesc}>
          <Checkbox
            id='tagsAndCategories'
            checked={own.tagsAndCategories}
            onChange={(v) => set('tagsAndCategories', v)}
          />
        </Row>
        <Row label={d.own.hideAmounts} description={d.own.hideAmountsDesc}>
          <Checkbox
            id='hideAmounts'
            checked={own.hideAmounts}
            onChange={(v) => set('hideAmounts', v)}
          />
        </Row>
      </div>

      <Divider />
      <div className='py-3'>
        <SectionTitle>{d.sections.security}</SectionTitle>
        <Row label={d.own.twoFactorAuth} description={d.own.twoFactorAuthDesc}>
          <Toggle
            checked={own.twoFactorAuth}
            onChange={(v) => set('twoFactorAuth', v)}
          />
        </Row>
        <Row label={d.own.autoLogout} description={d.own.autoLogoutDesc}>
          <Toggle
            checked={own.autoLogout}
            onChange={(v) => set('autoLogout', v)}
          />
        </Row>
      </div>

      <Divider />
      <div className='py-3'>
        <SectionTitle>{d.sections.notifications}</SectionTitle>
        <Row label={d.own.notifyProjects}>
          <Checkbox
            id='notifyProjects'
            checked={own.notifyProjects}
            onChange={(v) => set('notifyProjects', v)}
          />
        </Row>
        <Row label={d.own.notifyPayments}>
          <Checkbox
            id='notifyPayments'
            checked={own.notifyPayments}
            onChange={(v) => set('notifyPayments', v)}
          />
        </Row>
        <Row label={d.own.notifySubscriptions}>
          <Checkbox
            id='notifySubscriptions'
            checked={own.notifySubscriptions}
            onChange={(v) => set('notifySubscriptions', v)}
          />
        </Row>
      </div>
    </div>
  )
}

export default OwnForm
