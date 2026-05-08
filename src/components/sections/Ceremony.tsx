import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { Colors, DescriptionCSS } from '../../tokens'

interface CeremonyProps {
  titulo?: string
  descripcion?: string
  etiquetaFecha?: string
  fecha?: string
  videoLabel?: string
  videoSubLabel?: string
}

const DEFAULTS = {
  tituloLinea1: '¡NOS VEMOS EN LA CEREMONIA DE CLAUSURA!',
  tituloLinea2: '',
  descripcion: 'Julio será el mes donde nos daremos cita para reconocer la dedicación de quienes han completado su trayectoria en la etapa de culturización: Tronco Común. Celebraremos tu esfuerzo y compromiso en un evento exclusivo de graduación. No te puedes perder este momento.',
  etiquetaFecha: 'Fecha',
  fecha: 'JULIO 2026',
  videoLabel: 'Video Teaser',
  videoSubLabel: 'Ceremonia de Clausura 2025',
}

export default function Ceremony(_props: CeremonyProps) {
  // CMS desconectado temporalmente — usar DEFAULTS hardcodeados
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) { videoRef.current.pause(); setPlaying(false) }
    else { videoRef.current.play(); setPlaying(true) }
  }

  const linea1 = DEFAULTS.tituloLinea1
  const linea2 = DEFAULTS.tituloLinea2
  const descripcion = DEFAULTS.descripcion
  const etiquetaFecha = DEFAULTS.etiquetaFecha
  const fecha = DEFAULTS.fecha
  const videoLabel = DEFAULTS.videoLabel
  const videoSubLabel = DEFAULTS.videoSubLabel

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: Colors.bgSurface }}>

      <img
        src="/fondo.png"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
        style={{ opacity: 0.18 }}
        draggable={false}
      />

      <SectionReveal>
        <div
          className="relative z-10 w-full flex flex-col items-center justify-center text-center"
          style={{
            paddingTop: 'clamp(48px, 6vw, 96px)',
            paddingBottom: 'clamp(24px, 3vw, 48px)',
            paddingLeft: 'clamp(24px, 6vw, 96px)',
            paddingRight: 'clamp(24px, 6vw, 96px)',
          }}
        >
          <div style={{ width: '100%', maxWidth: 'min(900px, 100%)' }}>
            <h2
              className="font-verlag uppercase text-navy"
              style={{
                fontSize: 'clamp(1.4rem, 4.5vw, 3.2rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.4px',
                textWrap: 'balance' as React.CSSProperties['textWrap'],
              }}
            >
              <span className="block">{linea1}</span>
              {linea2 && <span className="block">{linea2}</span>}
            </h2>
            <p
              className="text-navy mt-6 md:mt-8"
              style={{ ...DescriptionCSS.base, width: '100%' }}
            >
              {descripcion}
            </p>
          </div>
        </div>
      </SectionReveal>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-12 pb-16 md:pb-24 flex flex-col items-center text-center">

        <SectionReveal delay={0.2} className="w-full mb-10">
          <motion.div
            className="relative overflow-hidden w-full"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: '16/9', backgroundColor: '#001840' }}
            >
              <video
                ref={videoRef}
                onClick={togglePlay}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                poster="/Teaser1-poster.jpg"
                playsInline
                preload="metadata"
                controls={playing}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
              >
                <source src="/Teaser1.mp4" type="video/mp4" />
              </video>

              <div
                className="absolute inset-0 transition-opacity duration-400 pointer-events-none"
                style={{
                  opacity: playing ? 0 : 1,
                  background: 'linear-gradient(to top, rgba(0,46,109,0.80) 0%, rgba(0,46,109,0.20) 60%, transparent 100%)',
                }}
              />

              {!playing && (
                <button
                  onClick={togglePlay}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-200 hover:scale-105"
                  style={{
                    width: '68px',
                    height: '48px',
                    background: Colors.seaBlue100,
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  }}
                  aria-label="Reproducir teaser"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}

              {!playing && (
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-verlag text-white text-xs md:text-sm uppercase">{videoLabel}</p>
                  <p className="font-montserrat text-white text-xs">{videoSubLabel}</p>
                </div>
              )}
            </div>
          </motion.div>
        </SectionReveal>

        <SectionReveal delay={0.35}>
          <p
            className="font-verlag text-navy uppercase flex flex-wrap items-baseline justify-center"
            style={{ fontSize: 'clamp(1.4rem, 4vw, 3.2rem)', lineHeight: 1.05, letterSpacing: '-0.4px', gap: '0.4em' }}
          >
            <span>{etiquetaFecha}:</span>
            {fecha.split(' ').map((parte, i) => {
              const esAnio = /^\d{4}$/.test(parte)
              return (
                <span
                  key={i}
                  style={esAnio ? { fontSize: '1.25em', lineHeight: 1 } : undefined}
                >
                  {parte}
                </span>
              )
            })}
          </p>
        </SectionReveal>

      </div>
    </section>
  )
}
