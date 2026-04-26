interface LogoProps {
  className?: string
}

const Logo = ({ className }: LogoProps) => {
  return (
    <h1
      className={`text-[var(--info)] text-xl font-bold whitespace-nowrap ${className || ''}`}
    >
      B-CRM
    </h1>
  )
}

export default Logo
