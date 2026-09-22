import { Play, Image as ImageIcon, QrCode } from '@phosphor-icons/react'
import { Colors } from '../../tokens'

type Kind = 'video' | 'foto' | 'qr'

interface Props {
  kind: Kind
  /** Texto principal dentro del recuadro (p. ej. "Video graduados"). */
  label?: string
  /** Texto secundario pequeño. */
  sublabel?: string
  /** Relación de aspecto CSS, p. ej. "16/9", "9/16", "1/1". */
  ratio?: string
  /** Tono del recuadro según el fondo de la sección. */
  tone?: 'light' | 'dark'
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_LABEL: Record<Kind, string> = {
  video: 'Video',
  foto: 'Foto',
  qr: 'Código QR',
}

/**
 * Recuadro reservado para un video, una foto o un QR que todavía no se
 * agrega. Mantiene el espacio y la proporción definitivos para que la
 * sección se vea completa mientras llega el material.
 */
export default function MediaPlaceholder({
  kind,
  label,
  sublabel,
  ratio = '16/9',
  tone = 'light',
  className = '',
  style,
}: Props) {
  const isDark = tone === 'dark'
  const fg = isDark ? '#FFFFFF' : Colors.seaBlue100
  const border = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,46,109,0.35)'
  const bg = isDark
    ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
    : 'linear-gradient(135deg, rgba(0,46,109,0.06) 0%, rgba(0,155,222,0.06) 100%)'

  const Icon = kind === 'video' ? Play : kind === 'foto' ? ImageIcon : QrCode
  const text = label ?? DEFAULT_LABEL[kind]

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: ratio, background: bg, border: `2px dashed ${border}`, borderRadius: 12, ...style }}
      role="img"
      aria-label={`${text} (pendiente)`}
    >
      {/* Trama sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isDark ? 0.08 : 0.06,
          backgroundImage: `repeating-linear-gradient(45deg, ${fg} 0px, ${fg} 1px, transparent 1px, transparent 14px)`,
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style={{ gap: 'clamp(6px, 1.2cqw, 12px)' }}>
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 'clamp(40px, 12%, 72px)',
            aspectRatio: '1/1',
            background: kind === 'video' ? Colors.skyBlue100 : 'transparent',
            border: kind === 'video' ? 'none' : `2px solid ${border}`,
            boxShadow: kind === 'video' ? '0 8px 24px rgba(0,155,222,0.35)' : 'none',
          }}
        >
          <Icon
            size={kind === 'video' ? 26 : 30}
            weight={kind === 'video' ? 'fill' : 'regular'}
            color={kind === 'video' ? '#FFFFFF' : fg}
            style={kind === 'video' ? { marginLeft: 3 } : undefined}
          />
        </div>
        <p
          className="font-verlag uppercase"
          style={{ color: fg, fontSize: 'clamp(0.7rem, 1.6vw, 0.95rem)', letterSpacing: '0.12em', margin: 0 }}
        >
          {text}
        </p>
        {sublabel && (
          <p
            className="font-montserrat"
            style={{ color: fg, opacity: 0.7, fontSize: 'clamp(0.65rem, 1.3vw, 0.8rem)', margin: 0, maxWidth: '28ch' }}
          >
            {sublabel}
          </p>
        )}
      </div>
    </div>
  )
}
