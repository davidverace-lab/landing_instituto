import { Colors } from '../../tokens'

/**
 * Piezas de narrativa compartidas por toda la landing.
 * - <Hi>  resalta una palabra clave con color de marca (sky sobre claro, sunray sobre oscuro).
 * - <Frase> una línea corta en Verlag pequeño, para frases que merecen énfasis.
 */
export function Hi({ children, tone = 'light' }: { children: React.ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <strong className="font-bold" style={{ color: tone === 'light' ? Colors.skyBlue100 : Colors.sunrayYellow100 }}>
      {children}
    </strong>
  )
}

export function Frase({ children, tone = 'light', className = '' }: { children: React.ReactNode; tone?: 'light' | 'dark'; className?: string }) {
  return (
    <p
      className={`font-verlag uppercase ${className}`}
      style={{
        color: tone === 'light' ? Colors.seaBlue100 : '#FFFFFF',
        fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)',
        letterSpacing: '0.08em',
        lineHeight: 1.3,
        marginBottom: 0,
        textWrap: 'balance' as React.CSSProperties['textWrap'],
      }}
    >
      {children}
    </p>
  )
}
