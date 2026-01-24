import { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'

const DecryptedText = ({
	text,
	speed = 50,
	maxIterations = 10,
	sequential = false,
	revealDirection = 'start',
	useOriginalCharsOnly = false,
	characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
	className = '',
	parentClassName = '',
	encryptedClassName = '',
	animateOn = 'view',
	onComplete,
	...props
}) => {
	const [displayText, setDisplayText] = useState(text)
	const [isAnimating, setIsAnimating] = useState(false)
	const [isScrambling, setIsScrambling] = useState(false)
	const [revealedIndices, setRevealedIndices] = useState(new Set())
	const [hasAnimated, setHasAnimated] = useState(false)
	const containerRef = useRef(null)

	useEffect(() => {
		let interval
		let currentIteration = 0

		const getNextIndex = (revealedSet) => {
			const textLength = text.length
			switch (revealDirection) {
				case 'start':
					return revealedSet.size
				case 'end':
					return textLength - 1 - revealedSet.size
				case 'center': {
					const middle = Math.floor(textLength / 2)
					const offset = Math.floor(revealedSet.size / 2)
					const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1

					if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
						return nextIndex
					}

					for (let i = 0; i < textLength; i++) {
						if (!revealedSet.has(i)) return i
					}
					return 0
				}
				default:
					return revealedSet.size
			}
		}

		const availableChars = useOriginalCharsOnly
			? Array.from(new Set(text.split(''))).filter((char) => char !== ' ' && char !== '\n')
			: characters.split('')

		const shuffleText = (originalText, currentRevealed) => {
			if (useOriginalCharsOnly) {
				const positions = originalText.split('').map((char, i) => ({
					char,
					isSpace: char === ' ' || char === '\n',
					index: i,
					isRevealed: currentRevealed.has(i),
				}))

				const nonSpaceChars = positions.filter((p) => !p.isSpace && !p.isRevealed).map((p) => p.char)

				for (let i = nonSpaceChars.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1))
					;[nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]]
				}

				let charIndex = 0
				return positions
					.map((p) => {
						if (p.isSpace) return p.char
						if (p.isRevealed) return originalText[p.index]
						return nonSpaceChars[charIndex++]
					})
					.join('')
			} else {
				return originalText
					.split('')
					.map((char, i) => {
						if (char === ' ' || char === '\n') return char
						if (currentRevealed.has(i)) return originalText[i]
						return availableChars[Math.floor(Math.random() * availableChars.length)]
					})
					.join('')
			}
		}

		if (isAnimating) {
			setIsScrambling(true)
			interval = setInterval(() => {
				setRevealedIndices((prevRevealed) => {
					if (sequential) {
						if (prevRevealed.size < text.length) {
							const nextIndex = getNextIndex(prevRevealed)
							const newRevealed = new Set(prevRevealed)
							newRevealed.add(nextIndex)
							setDisplayText(shuffleText(text, newRevealed))
							return newRevealed
						} else {
							clearInterval(interval)
							setIsScrambling(false)
							if (onComplete) onComplete()
							return prevRevealed
						}
					} else {
						setDisplayText(shuffleText(text, prevRevealed))
						currentIteration++
						if (currentIteration >= maxIterations) {
							clearInterval(interval)
							setIsScrambling(false)
							setDisplayText(text)
							if (onComplete) onComplete()
						}
						return prevRevealed
					}
				})
			}, speed)
		} else if (!hasAnimated) {
			// Show scrambled text initially before animation starts
			setDisplayText(
				text
					.split('')
					.map((char) => {
						if (char === ' ' || char === '\n') return char
						return availableChars[Math.floor(Math.random() * availableChars.length)]
					})
					.join('')
			)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isAnimating, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly, hasAnimated, onComplete])

	useEffect(() => {
		if (animateOn !== 'view' && animateOn !== 'both') return

		const observerCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !hasAnimated) {
					setIsAnimating(true)
					setHasAnimated(true)
				}
			})
		}

		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1,
		}

		const observer = new IntersectionObserver(observerCallback, observerOptions)
		const currentRef = containerRef.current
		if (currentRef) {
			observer.observe(currentRef)
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef)
			}
		}
	}, [animateOn, hasAnimated])

	const hoverProps =
		animateOn === 'hover' || animateOn === 'both'
			? {
					onMouseEnter: () => setIsAnimating(true),
					onMouseLeave: () => setIsAnimating(false),
				}
			: {}

	// Render text with newline support
	const renderText = () => {
		const lines = displayText.split('\n')
		return lines.map((line, lineIndex) => (
			<span key={lineIndex}>
				{line.split('').map((char, charIndex) => {
					const globalIndex = lines.slice(0, lineIndex).reduce((acc, l) => acc + l.length + 1, 0) + charIndex
					const isRevealedOrDone = revealedIndices.has(globalIndex) || !isScrambling || !isAnimating

					return (
						<span key={charIndex} className={isRevealedOrDone ? className : encryptedClassName}>
							{char}
						</span>
					)
				})}
				{lineIndex < lines.length - 1 && <br />}
			</span>
		))
	}

	return (
		<motion.span
			className={parentClassName}
			ref={containerRef}
			style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}
			{...hoverProps}
			{...props}
		>
			<span
				style={{
					position: 'absolute',
					width: '1px',
					height: '1px',
					padding: 0,
					margin: '-1px',
					overflow: 'hidden',
					clip: 'rect(0,0,0,0)',
					border: 0,
				}}
			>
				{text}
			</span>

			<span aria-hidden="true">{renderText()}</span>
		</motion.span>
	)
}

export default DecryptedText
