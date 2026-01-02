import { Link } from 'react-router-dom'

const Button = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    px-6 py-3 rounded-lg
    font-medium text-sm
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-primary-blue/50
  `

  const variants = {
    primary: `
      bg-gradient-to-r from-primary-blue/30 to-primary-purple/30
      border border-white/10
      text-white
      hover:from-primary-blue/50 hover:to-primary-purple/50
      hover:border-white/20
      hover:-translate-y-0.5
      hover:shadow-lg hover:shadow-primary-blue/25
      active:translate-y-0
    `,
    secondary: `
      bg-white/5
      border border-white/10
      text-white/80
      hover:bg-white/10
      hover:text-white
      hover:border-white/20
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    ghost: `
      text-white/70
      hover:text-white
      hover:bg-white/5
    `,
  }

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`

  // Internal link (React Router)
  if (to) {
    return (
      <Link to={to} className={combinedClassName} {...props}>
        {children}
      </Link>
    )
  }

  // External link
  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    )
  }

  // Button
  return (
    <button className={combinedClassName} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button
