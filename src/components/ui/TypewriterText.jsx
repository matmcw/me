import { useState, useEffect } from 'react'

const TypewriterText = ({
  text,
  speed = 65,
  delay = 0,
  newlinePause = 0,
  onComplete,
  className = '',
  cursorClassName = '',
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let timeout

    // Initial delay before typing starts
    timeout = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!isTyping) return

    let currentIndex = 0
    const chars = text.split('')

    const typeNextChar = () => {
      if (currentIndex < chars.length) {
        const currentChar = chars[currentIndex]
        setDisplayedText(text.slice(0, currentIndex + 1))
        currentIndex++

        // Variable typing speed for more natural feel
        const variance = Math.random() * 30 - 15 // -15 to +15ms variance

        // Add extra pause before newline (as if thinking before pressing enter)
        const nextChar = chars[currentIndex]
        const extraPause = nextChar === '\n' ? newlinePause : 0

        setTimeout(typeNextChar, speed + variance + extraPause)
      } else {
        setIsTyping(false)
        setIsComplete(true)
        onComplete?.()
      }
    }

    typeNextChar()
  }, [isTyping, text, speed, newlinePause, onComplete])

  // Cursor should NOT blink while typing, only after complete
  const cursorClasses = `
    inline-block w-[3px] h-[1em] ml-1 align-middle
    bg-primary-blue
    ${isComplete ? 'animate-blink' : ''}
    ${cursorClassName}
  `

  return (
    <span className={className}>
      {displayedText.split('\n').map((line, index, array) => (
        <span key={index}>
          {line}
          {index < array.length - 1 && <br />}
        </span>
      ))}
      {showCursor && <span className={cursorClasses} />}
    </span>
  )
}

export default TypewriterText
