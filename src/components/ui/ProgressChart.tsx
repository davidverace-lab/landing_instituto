import { motion } from 'framer-motion'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useInView } from '../../hooks/useInView'

export interface ProgressChartItem {
  name: string
  value: number
  color: string
  logos?: string[]
  completados?: number
  total?: number
}

interface Props {
  data: ProgressChartItem[]
  textColor?: string
  trackColor?: string
}

const NAVY = '#002E6D'
const WHITE = '#FFFFFF'

const LIGHT_COLORS = new Set([
  '#FFC627',
  '#54BBAB',
  '#33AEE5',
  '#FFFFFF',
])

function getContrastTextColor(bg: string): string {
  return LIGHT_COLORS.has(bg.toUpperCase()) ? NAVY : WHITE
}

export default function ProgressChart({
  data,
  textColor = NAVY,
  trackColor = 'rgba(0, 46, 109, 0.08)',
}: Props) {
  const { ref, inView } = useInView()
  const [hovered, setHovered] = useState<number | null>(null)
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null)

  const handleMouseMove = (e: React.MouseEvent, idx: number) => {
    if (hovered !== idx) setHovered(idx)
    setCursorPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseLeave = () => {
    setHovered(null)
    setCursorPos(null)
  }

  const hoveredItem = hovered !== null ? data[hovered] : null

  return (
    <>
    <div ref={ref} className="w-full flex flex-col gap-3 md:gap-4">
      {data.map((item, idx) => {
        const barTextColor = getContrastTextColor(item.color)
        const isHovered = hovered === idx
        const isDimmed = hovered !== null && hovered !== idx

        return (
          <div
            key={item.name}
            className="row grid items-center cursor-pointer"
            style={{ gridTemplateColumns: '240px 1fr', columnGap: 0 }}
            onMouseMove={(e) => handleMouseMove(e, idx)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="logo-column flex items-center" style={{ width: 240, height: 26 }}>
              {item.logos && item.logos.length > 0 ? (
                <motion.div
                  className={`logo-wrapper flex items-center justify-start${item.logos.length > 1 ? ' double' : ''}`}
                  style={{
                    height: 26,
                    gap: item.logos.length > 1 ? 10 : 0,
                  }}
                  animate={{ opacity: isDimmed ? 0.4 : 1, scale: isHovered ? 1.06 : 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  aria-label={item.name}
                >
                  {item.logos.map((logo, i) => (
                    <div
                      key={`${item.name}-slot-${i}`}
                      className="logo-container flex items-center"
                      style={{ height: 26 }}
                    >
                      <img
                        src={logo}
                        alt={item.name}
                        className="block select-none pointer-events-none"
                        style={{
                          height: '100%',
                          width: 'auto',
                          objectFit: 'contain',
                        }}
                        draggable={false}
                      />
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.span
                  className="font-montserrat font-semibold uppercase tracking-wide text-left"
                  style={{
                    color: textColor,
                    fontSize: 'clamp(0.7rem, 0.9vw, 0.9rem)',
                    letterSpacing: '0.04em',
                  }}
                  animate={{ opacity: isDimmed ? 0.4 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
              )}
            </div>

            <motion.div
              className="relative w-full overflow-hidden rounded-md"
              style={{ height: 'clamp(24px, 2.6vw, 34px)', backgroundColor: trackColor }}
              animate={{
                opacity: isDimmed ? 0.5 : 1,
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <motion.div
                className="h-full flex items-center justify-end pr-2 md:pr-3 rounded-md"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${item.value}%` } : { width: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 + idx * 0.07 }}
              >
                <motion.span
                  className="font-montserrat font-bold"
                  style={{
                    color: barTextColor,
                    fontSize: 'clamp(0.75rem, 1vw, 1rem)',
                  }}
                  animate={{ scale: isHovered ? 1.15 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {item.value}%
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        )
      })}
    </div>
    {cursorPos && hoveredItem && hoveredItem.completados !== undefined && hoveredItem.total !== undefined && typeof document !== 'undefined' && createPortal(
      <div
        style={{
          position: 'fixed',
          left: cursorPos.x,
          top: cursorPos.y - 24,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -100%)',
        }}
      >
        <div
          style={{
            position: 'relative',
            backgroundColor: NAVY,
            color: WHITE,
            padding: '8px 12px',
            borderRadius: 8,
            fontFamily: '"Montserrat", sans-serif',
            fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(0,46,109,0.25)',
          }}
        >
          <span style={{ fontWeight: 700 }}>{hoveredItem.name}:</span>{' '}
          {hoveredItem.completados} completados de {hoveredItem.total}
          <span
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: `6px solid ${NAVY}`,
            }}
          />
        </div>
      </div>,
      document.body
    )}
    </>
  )
}
