import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'

interface Props {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  color?: string
  style?: React.CSSProperties
}

export default function AnimatedCounter({ target, duration = 2000, suffix = '', prefix = '', className = '', color, style }: Props) {
  const { ref, inView } = useInView()
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return (
    <span ref={ref} className={className} style={{ ...(color ? { color } : {}), ...style }}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}
