import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const
const VIEW = { once: true, margin: '-12% 0px' } as const

/** Foto que se descubre con un barrido lateral y un ligero zoom de salida. */
export function ClipReveal({ children, delay = 0, from = 'left', className = '', style }: {
  children: ReactNode; delay?: number; from?: 'left' | 'right' | 'bottom'; className?: string; style?: React.CSSProperties
}) {
  const hidden = from === 'left' ? 'inset(0 100% 0 0)' : from === 'right' ? 'inset(0 0 0 100%)' : 'inset(100% 0 0 0)'
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      style={style}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={VIEW}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <motion.div
        className="w-full h-full"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.5, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Forma de marca que entra deslizándose desde un lado al aparecer la sección. */
export function ShapeIn({ children, from = 'right', delay = 0, className = '' }: {
  children: ReactNode; from?: 'left' | 'right'; delay?: number; className?: string
}) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      initial={{ x: from === 'right' ? '18%' : '-18%', opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={VIEW}
      transition={{ duration: 1.2, ease: EASE, delay }}
      aria-hidden
    >
      {children}
    </motion.div>
  )
}

/** Título que aparece palabra por palabra. El observador va en el contenedor
 *  (los spans internos están recortados y nunca "entran" en el viewport). */
const wordsParent = { hidden: {}, visible: (delay: number) => ({ transition: { staggerChildren: 0.06, delayChildren: delay } }) }
const wordChild = { hidden: { y: '110%', opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } } }

export function Words({ text, className = '', style, delay = 0, as = 'h2' }: {
  text: string; className?: string; style?: React.CSSProperties; delay?: number; as?: 'h1' | 'h2' | 'p'
}) {
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag
      className={className}
      style={style}
      aria-label={text}
      variants={wordsParent}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEW}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: '0.08em', marginBottom: '-0.08em', paddingTop: '0.18em', marginTop: '-0.18em' }}>
          <motion.span className="inline-block" variants={wordChild}>{w}</motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}

/** Línea de acento que crece de izquierda a derecha. */
export function LineGrow({ color, width = 72, className = '', delay = 0 }: { color: string; width?: number; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      style={{ height: width >= 9999 ? 3 : 4, width: width >= 9999 ? '100%' : width, background: color, borderRadius: 2, transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEW}
      transition={{ duration: 0.8, ease: EASE, delay }}
    />
  )
}
