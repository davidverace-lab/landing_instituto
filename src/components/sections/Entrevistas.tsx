import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import SectionReveal from '../ui/SectionReveal'
import VideoBox from '../ui/VideoBox'
import { Colors, DescriptionCSS, Section } from '../../tokens'
import { Hi } from '../ui/Texto'
import { Words, LineGrow } from '../ui/Anim'

/**
 * CAMBIO 2 — Entrevistas del Congreso de Calidad Total de Hutchison Ports México.
 * Reemplaza a "Voces de éxito". Carrusel de videos verticales (formato celular).
 */
const COPY = {
  titulo: 'ENTREVISTAS DEL CONGRESO DE CALIDAD TOTAL DE HUTCHISON PORTS MÉXICO',
  descripcion:
    'Durante el Congreso de Calidad Total se llevó a cabo la primera transmisión de Instituto al Aire, un programa en vivo que permitió conocer las experiencias, opiniones y perspectivas de los asistentes de las distintas unidades de negocio sobre este importante encuentro.',
  etiqueta: 'Instituto al Aire',
}

// Clips verticales del set de Instituto al Aire (720×1280, WebM + MP4, carátula .webp).
const ENTREVISTAS = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  label: `Entrevista ${i + 1}`,
  poster: `/videos/entrevista-${i + 1}-poster.webp`,
  sources: [
    { src: `/videos/entrevista-${i + 1}.webm`, type: 'video/webm' },
    { src: `/videos/entrevista-${i + 1}.mp4`, type: 'video/mp4' },
  ],
}))
type Entrevista = (typeof ENTREVISTAS)[number]

const CARD_W = 'min(300px, 70vw)'

/** Tarjetas laterales: sólo la carátula, desenfocada. */
function Ghost({ e, side }: { e: Entrevista; side: 'left' | 'right' }) {
  return (
    <div
      className="relative shrink-0 rounded-2xl overflow-hidden"
      style={{
        width: 'clamp(80px, 8vw, 120px)',
        aspectRatio: '9/16',
        opacity: 0.35,
        filter: 'blur(2px)',
        transform: `scale(0.9) translateX(${side === 'left' ? '16px' : '-16px'})`,
        pointerEvents: 'none',
      }}
    >
      <img src={e.poster} alt="" aria-hidden className="w-full h-full object-cover" loading="lazy" decoding="async" draggable={false} />
    </div>
  )
}

export default function Entrevistas() {
  const n = ENTREVISTAS.length
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)

  const go = useCallback((idx: number, d: number) => { setDir(d); setActive(((idx % n) + n) % n) }, [n])
  const prev = () => go(active - 1, -1)
  const next = () => go(active + 1, 1)

  // Autoplay: avanza cada 6 s; se detiene mientras el cursor está encima.
  // Tampoco avanza mientras se reproduce un clip.
  const paused = useRef(false)
  const playing = useRef(false)
  useEffect(() => {
    playing.current = false
    const id = setInterval(() => { if (!paused.current && !playing.current) go(active + 1, 1) }, 6000)
    return () => clearInterval(id)
  }, [active, go])

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 220 : -220, opacity: 0, scale: 0.94 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 34 } },
    exit: (d: number) => ({ x: d > 0 ? -220 : 220, opacity: 0, scale: 0.94, transition: { duration: 0.2 } }),
  }

  const NavButton = ({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) => (
    <motion.button
      onClick={onClick}
      aria-label={label}
      className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0"
      style={{ border: '2px solid rgba(255,255,255,0.7)', background: 'rgba(0,46,109,0.35)', backdropFilter: 'blur(6px)' }}
      whileHover={{ backgroundColor: Colors.skyBlue100, borderColor: Colors.skyBlue100, scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.18 }}
    >
      {children}
    </motion.button>
  )

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#04213F' }}>
      <div className="absolute inset-0 z-0">
        <img
          src="/webp/fondo-entrevistas.webp"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.45 }}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(4,33,63,0.96) 0%, rgba(4,33,63,0.75) 45%, rgba(4,33,63,0.35) 100%)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,33,63,0.9) 0%, transparent 35%)' }} />
      </div>

      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center"
        style={{ paddingTop: 'clamp(64px, 8vw, 120px)', paddingBottom: 'clamp(64px, 8vw, 120px)' }}
      >
        {/* Texto centrado */}
        <SectionReveal className="w-full flex flex-col items-center text-center" style={{ maxWidth: 860 }}>
          <Words text={COPY.titulo} className="font-verlag uppercase text-white" style={{ fontSize: Section.title, lineHeight: 1.06, letterSpacing: '-0.3px', textWrap: 'balance' as React.CSSProperties['textWrap'] }} />
          <LineGrow color={Colors.skyBlue100} className="mt-5 mb-6 mx-auto" delay={0.3} />
          <p className="text-white" style={{ ...DescriptionCSS.sm, fontSize: Section.desc, lineHeight: Section.descLH, opacity: 0.92, maxWidth: '72ch', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
            Durante el Congreso de Calidad Total se llevó a cabo la <Hi tone="dark">primera transmisión de Instituto al Aire</Hi>, un programa en vivo que permitió conocer las <Hi tone="dark">experiencias, opiniones y perspectivas</Hi> de los asistentes de las distintas unidades de negocio sobre este importante encuentro.
          </p>

          {/* Indicadores */}
          <div className="flex items-center justify-center gap-2 mt-8 mb-12">
            {ENTREVISTAS.map((e, i) => (
              <button key={e.id} onClick={() => go(i, i > active ? 1 : -1)} aria-label={`Ir a ${e.label}`}>
                <motion.div
                  animate={{ width: i === active ? 34 : 18, backgroundColor: i === active ? Colors.skyBlue100 : 'rgba(255,255,255,0.4)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{ height: 4, borderRadius: 2 }}
                />
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Carrusel */}
        <SectionReveal delay={0.15} className="w-full">
          <div className="flex flex-col items-center" onMouseEnter={() => { paused.current = true }} onMouseLeave={() => { paused.current = false }}>
            <div className="flex items-center justify-center gap-3 w-full">
              <div className="hidden md:block"><NavButton onClick={prev} label="Entrevista anterior"><CaretLeft size={22} color="#FFF" weight="bold" /></NavButton></div>

              <div className="hidden md:block"><Ghost e={ENTREVISTAS[(active - 1 + n) % n]} side="left" /></div>

              <div className="relative" style={{ width: CARD_W, aspectRatio: '9/16' }}>
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.div
                    key={active}
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <VideoBox
                      poster={ENTREVISTAS[active].poster}
                      sources={ENTREVISTAS[active].sources}
                      label={ENTREVISTAS[active].label}
                      ratio="9/16"
                      radius={16}
                      hideCaption
                      onPlayingChange={v => { playing.current = v }}
                      style={{ width: '100%', border: '2px solid rgba(255,255,255,0.35)', boxShadow: '0 40px 80px -30px rgba(0,0,0,0.7)' }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="hidden md:block"><Ghost e={ENTREVISTAS[(active + 1) % n]} side="right" /></div>

              <div className="hidden md:block"><NavButton onClick={next} label="Siguiente entrevista"><CaretRight size={22} color="#FFF" weight="bold" /></NavButton></div>
            </div>

            {/* Flechas en móvil */}
            <div className="flex md:hidden items-center gap-4 mt-5">
              <NavButton onClick={prev} label="Entrevista anterior"><CaretLeft size={22} color="#FFF" weight="bold" /></NavButton>
              <NavButton onClick={next} label="Siguiente entrevista"><CaretRight size={22} color="#FFF" weight="bold" /></NavButton>
            </div>

            <p className="font-verlag uppercase text-white mt-6" style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', letterSpacing: '0.18em' }}>
              {COPY.etiqueta}
            </p>
            <div style={{ width: 120, height: 3, background: `linear-gradient(90deg, transparent, ${Colors.skyBlue100}, transparent)`, marginTop: 8 }} />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
