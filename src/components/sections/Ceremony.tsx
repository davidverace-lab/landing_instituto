import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { Play, Pause } from '@phosphor-icons/react'
import { Colors, Type, DescriptionCSS } from '../../tokens'

export default function Ceremony() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) { videoRef.current.pause(); setPlaying(false) }
    else { videoRef.current.play(); setPlaying(true) }
  }

  return (
    <section className="relative overflow-hidden bg-navy-dark" style={{ minHeight: '100dvh' }}>

      {/* Imagen de fondo compartida */}
      <div className="absolute inset-0 z-0">
        <img
          src="/webp/fotos-nacho/DSC03304.webp"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.18 }}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Layout: columna en mobile, dos columnas en desktop */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-[100dvh]">

        {/* Columna izquierda: texto */}
        <div className="relative w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-20 py-20 lg:py-28 order-1">
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(154,202,235,0.88)' }} />

          <div className="relative z-10 max-w-lg mx-auto lg:mx-0">
            <SectionReveal>
              <h2 className="section-title text-navy mb-5 md:mb-6" style={{ fontSize: Type.h2 }}>
                ¡NOS VEMOS EN<br />
                LA CEREMONIA<br />
                <span className="text-white">DE CLAUSURA!</span>
              </h2>
              <p className="text-navy mb-8" style={DescriptionCSS.base}>
                Julio será el mes de la victoria. Celebraremos tu esfuerzo y
                compromiso en un evento que reconocerá a todos los colaboradores
                que completaron su formación en el Instituto Hutchison Ports.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p
                className="font-verlag text-sky-brand uppercase mb-1"
                style={{ fontSize: Type.h2, lineHeight: 1.05, letterSpacing: '-0.4px' }}
              >
                Fecha
              </p>
              <p
                className="font-verlag text-navy"
                style={{ fontSize: Type.h2, lineHeight: 1.05, letterSpacing: '-0.4px' }}
              >
                JULIO 2026
              </p>
            </SectionReveal>
          </div>
        </div>

        {/* Columna derecha: video — SIEMPRE visible */}
        <div className="relative w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-10 py-12 lg:py-28 order-2">
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,46,109,0.90)' }} />

          <div className="relative z-10 w-full max-w-lg mx-auto lg:mx-0">
            <SectionReveal direction="left" delay={0.2}>
              <div className="relative">
                <div
                  className="absolute -inset-3 opacity-20 blur-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${Colors.skyBlue100} 0%, transparent 70%)` }}
                />

                <motion.div
                  className="relative overflow-hidden"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                >
                  {/* Contenedor con ratio 16:9 */}
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

                    {/* Overlay gradiente */}
                    <div
                      className="absolute inset-0 transition-opacity duration-400"
                      style={{
                        opacity: playing ? 0 : 1,
                        background: 'linear-gradient(to top, rgba(0,46,109,0.80) 0%, rgba(0,46,109,0.20) 60%, transparent 100%)',
                      }}
                    />

                    {/* Botón play/pause */}
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

                    {/* Info del video */}
                    {!playing && (
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <div>
                          <p className="font-verlag text-white text-xs md:text-sm uppercase">Video Teaser</p>
                          <p className="font-montserrat text-white text-xs">Ceremonia de Clausura 2025</p>
                        </div>
                        <div
                          className="px-2 py-1 text-xs font-montserrat font-semibold text-white uppercase tracking-wider"
                          style={{ background: Colors.skyBlue100 }}
                        >
                          Próximamente
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </SectionReveal>
          </div>
        </div>

      </div>
    </section>
  )
}
