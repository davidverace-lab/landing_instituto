import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Colors } from '../../tokens'

/**
 * Reproductor de video con carátula (.webp) y fuentes WebM + MP4.
 *
 * Mientras no se reproduce, siempre muestra la portada con el botón de play
 * (cuadrado azul): antes de empezar, en pausa y al terminar. Sólo suena un
 * video a la vez, y se pausa solo al salir de la pantalla.
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
  /** Avisa cuando el video empieza o deja de reproducirse. */
  onPlayingChange?: (playing: boolean) => void
  className?: string
  style?: React.CSSProperties
}

/** El video que está sonando, para pausarlo cuando arranca otro. */
let current: HTMLVideoElement | null = null

export default function VideoBox({
  poster,
  sources = [],
  label,
  sublabel,
  ratio = '16 / 9',
  radius = 12,
  hideCaption = false,
  onPlayingChange,
  className = '',
  style,
}: VideoBoxProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const box = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const playable = sources.length > 0
  const setPlay = (v: boolean) => { setPlaying(v); onPlayingChange?.(v) }

  const toggle = () => {
    const v = ref.current
    if (!playable || !v) return
    if (playing) { v.pause(); return }
    if (current && current !== v) current.pause()
    current = v
    void v.play()
  }

  // Al salir de la pantalla se pausa y vuelve a la portada.
  useEffect(() => {
    const el = box.current
    if (!el || !playable) return
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) ref.current?.pause() }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [playable])

  return (
    <motion.div
      ref={box}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio, borderRadius: radius, background: '#001840', boxShadow: '0 30px 60px -24px rgba(0,46,109,0.45)', ...style }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
    >
      {playable && (
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
          onEnded={() => { if (ref.current) ref.current.currentTime = 0; setPlay(false) }}
        >
          {sources.map(s => <source key={s.src} src={s.src} type={s.type} />)}
        </video>
      )}

      {!playing && (
        <>
          {/* Portada encima del cuadro en pausa: siempre vuelve a la vista previa */}
          <img
            src={poster}
            alt={playable ? '' : label}
            aria-hidden={playable}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          {/* Velo para que el botón y el rótulo se lean sobre cualquier portada */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,24,64,0.6) 0%, rgba(0,24,64,0.08) 45%, rgba(0,24,64,0.12) 100%)' }}
          />

          <button
            type="button"
            onClick={toggle}
            aria-label={playable ? `Reproducir ${label}` : label}
            disabled={!playable}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-200 hover:scale-105 disabled:cursor-default"
            style={{ width: 'clamp(56px, 9%, 96px)', aspectRatio: '1', borderRadius: 14, background: Colors.seaBlue100, border: '3px solid #FFFFFF', boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}
          >
            <svg width="55%" height="55%" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden style={{ marginLeft: '6%' }}><path d="M8 5v14l11-7z" /></svg>
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
