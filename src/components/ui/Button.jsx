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
	const variantClass = {
		primary: 'btn btn-primary',
		secondary: 'btn btn-secondary',
		ghost: 'btn btn-ghost',
	}[variant] || 'btn btn-primary'

	const combinedClassName = `${variantClass} ${className}`

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
