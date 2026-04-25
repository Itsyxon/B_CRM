interface LogoProps {
  className?: string
}

const Logo = ({ className }: LogoProps) => {
  return (
    <h1
      className={`text-[var(--info)] text-4xl font-bold text-shadow-black ${className || ''}`}
    >
      B-CRM
    </h1>
  )
}

export default Logo
