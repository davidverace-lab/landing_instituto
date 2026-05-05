import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { Play, Pause } from '@phosphor-icons/react'
import { Colors, Type, DescriptionCSS } from '../../tokens'

interface CeremonyProps {
  titulo?: string
  descripcion?: string
  etiquetaFecha?: string
  fecha?: string
  videoLabel?: string
  videoSubLabel?: string
  videoBadge?: string
}

const DEFAULTS = {
  titulo: '¡NOS VEMOS EN LA CEREMONIA DE CLAUSURA!',
  descripcion: 'Julio será el mes de la victoria. Celebraremos tu esfuerzo y compromiso en un evento que reconocerá a todos los colaboradores que completaron su formación en el Instituto Hutchison Ports.',
  etiquetaFecha: 'Fecha',
  fecha: 'JULIO 2026',
  videoLabel: 'Video Teaser',
  videoSubLabel: 'Ceremonia de Clausura 2025',
  videoBadge: 'Próximamente',
}

export default function Ceremony({
  titulo,
  descripcion,
  etiquetaFecha,
  fecha,
  videoLabel,
  videoSubLabel,
  videoBadge,
}: CeremonyProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) { videoRef.current.pause(); setPlaying(false) }
    else { videoRef.current.play(); setPlaying(true) }
  }

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: 'rgba(154,202,235,0.88)' }}>

      <div className="w-full max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col items-center text-center">

        <SectionReveal>
          <h2 className="section-title text-navy mb-5 md:mb-6" style={{ fontSize: Type.h2 }}>
            {titulo ?? DEFAULTS.titulo}
          </h2>
          <p className="text-navy mb-10" style={DescriptionCSS.base}>
            {descripcion ?? DEFAULTS.descripcion}
          </p>
        </SectionReveal>

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
                className="absolute inset-0 w-full h-full object-cover"
                poster="/webp/fotos-nacho/DJI_20251002152513_0063_D.webp"
                playsInline
                loop
              />

              <div
                className="absolute inset-0 transition-opacity duration-400"
                style={{
                  opacity: playing ? 0 : 1,
                  background: 'linear-gradient(to top, rgba(0,46,109,0.80) 0%, rgba(0,46,109,0.20) 60%, transparent 100%)',
                }}
              />

              <motion.button
                onClick={togglePlay}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
                style={{ background: Colors.skyBlue100, border: '3px solid rgba(255,255,255,0.35)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.94 }}
                animate={playing ? {} : {
                  boxShadow: [
                    '0 0 0 0 rgba(0,159,227,0)',
                    '0 0 0 18px rgba(0,159,227,0.2)',
                    '0 0 0 36px rgba(0,159,227,0)',
                  ],
                }}
                transition={playing ? {} : { duration: 2, repeat: Infinity }}
                aria-label={playing ? 'Pausar' : 'Reproducir teaser'}
              >
                {playing
                  ? <Pause size={26} color="#FFFFFF" weight="fill" />
                  : <Play  size={26} color="#FFFFFF" weight="fill" style={{ marginLeft: '3px' }} />
                }
              </motion.button>

              {!playing && (
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div>
                    <p className="font-verlag text-white text-xs md:text-sm uppercase">{videoLabel ?? DEFAULTS.videoLabel}</p>
                    <p className="font-montserrat text-white text-xs">{videoSubLabel ?? DEFAULTS.videoSubLabel}</p>
                  </div>
                  <div
                    className="px-2 py-1 text-xs font-montserrat font-semibold text-white uppercase tracking-wider"
                    style={{ background: Colors.skyBlue100 }}
                  >
                    {videoBadge ?? DEFAULTS.videoBadge}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </SectionReveal>

        <SectionReveal delay={0.35}>
          <p
            className="font-verlag text-navy uppercase"
            style={{ fontSize: Type.h2, lineHeight: 1.05, letterSpacing: '-0.4px' }}
          >
            {etiquetaFecha ?? DEFAULTS.etiquetaFecha}: {fecha ?? DEFAULTS.fecha}
          </p>
        </SectionReveal>

      </div>
    </section>
  )
}
