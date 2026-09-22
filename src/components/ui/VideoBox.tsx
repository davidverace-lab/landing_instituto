import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Colors } from '../../tokens'

/**
 * Reproductor de video con carátula (.webp) y fuentes WebM + MP4.
 *
 * Sin `sources` funciona como carátula lista para incrustar: muestra la portada
 * y el botón de play desactivado, para cuando todavía no llega el material.
 */
export interface VideoBoxProps {
  poster: string
  /** [webm, mp4]. Si va vacío, el recuadro queda sólo como carátula. */
  sources?: { src: string; type: string }[]
  label: string
  sublabel?: string
  ratio?: string
  radius?: number
  /** Oculta el rótulo sobre la portada cuando el marco de alrededor ya lo dice. */
  hideCaption?: boolean
  /** Botón de play: círculo blanco (por defecto) o cuadrado azul redondeado. */
  playShape?: 'circle' | 'square'
  /** Avisa cuando el video empieza o deja de reproducirse. */
  onPlayingChange?: (playing: boolean) => void
  className?: string
  style?: React.CSSProperties
}

export default function VideoBox({
  poster,
  sources = [],
  label,
  sublabel,
  ratio = '16 / 9',
  radius = 12,
  hideCaption = false,
  playShape = 'circle',
  onPlayingChange,
  className = '',
  style,
}: VideoBoxProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const playable = sources.length > 0
  const setPlay = (v: boolean) => { setPlaying(v); onPlayingChange?.(v) }
  const square = playShape === 'square'

  const toggle = () => {
    if (!playable || !ref.current) return
    if (playing) { ref.current.pause() } else { void ref.current.play() }
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio, borderRadius: radius, background: '#001840', boxShadow: '0 30px 60px -24px rgba(0,46,109,0.45)', ...style }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
    >
      {playable ? (
        <video
          ref={ref}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          poster={poster}
          playsInline
          preload="none"
          controls={playing}
          onClick={toggle}
          onPlay={() => setPlay(true)}
          onPause={() => setPlay(false)}
          onEnded={() => setPlay(false)}
        >
          {sources.map(s => <source key={s.src} src={s.src} type={s.type} />)}
        </video>
      ) : (
        <img src={poster} alt={label} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" draggable={false} />
      )}

      {!playing && (
        <>
          {/* Velo para que el botón y el rótulo se lean sobre cualquier portada */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,24,64,0.72) 0%, rgba(0,24,64,0.12) 45%, rgba(0,24,64,0.18) 100%)' }}
          />

          <button
            type="button"
            onClick={toggle}
            aria-label={playable ? `Reproducir ${label}` : label}
            disabled={!playable}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-200 hover:scale-105 disabled:cursor-default"
            style={
              square
                ? { width: 'clamp(60px, 9%, 96px)', aspectRatio: '1', borderRadius: 14, background: Colors.seaBlue100, border: '3px solid #FFFFFF', boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }
                : { width: 'clamp(56px, 8%, 76px)', aspectRatio: '1', borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }
            }
          >
            <svg width={square ? 36 : 26} height={square ? 36 : 26} viewBox="0 0 24 24" fill={square ? '#FFFFFF' : Colors.seaBlue100} aria-hidden style={{ marginLeft: 4 }}><path d="M8 5v14l11-7z" /></svg>
          </button>

          {!hideCaption && (
          <div className="absolute inset-x-0 bottom-0 px-4 md:px-6 pb-4 md:pb-5 pointer-events-none text-center">
            <p className="font-verlag uppercase text-white" style={{ fontSize: 'clamp(0.72rem, 1.5vw, 1rem)', letterSpacing: '0.14em', margin: 0 }}>
              {label}
            </p>
            {sublabel && (
              <p className="font-montserrat text-white" style={{ fontSize: 'clamp(0.66rem, 1.1vw, 0.82rem)', opacity: 0.85, marginTop: 4 }}>
                {sublabel}
              </p>
            )}
          </div>
          )}
        </>
      )}
    </motion.div>
  )
}
