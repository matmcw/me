import { useState, useEffect } from 'react'

const FadeIn = ({
  children,
  delay = 0,
  duration = 600,
  direction = 'up',
  className = '',
  show = true,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!show) return

    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timeout)
  }, [delay, show])

  const transforms = {
    up: 'translateY(20px)',
    down: 'translateY(-20px)',
    left: 'translateX(20px)',
    right: 'translateX(-20px)',
    none: 'translateY(0)',
  }

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) translateX(0)' : transforms[direction],
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      }}
    >
      {children}
    </div>
  )
}

export default FadeIn
