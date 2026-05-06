import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { CaretLeft, CaretRight, Play, Pause } from '@phosphor-icons/react'
import { Colors, DescriptionCSS } from '../../tokens'
import type { SanityTestimonial } from '../../types/sanity'

interface TestimonialsProps {
  titulo?: string
  items?: SanityTestimonial[]
}

interface TestimonialVideo {
  name: string
  role: string
  bu: string
  quote: string
  videoSrc: string
  poster: string
}

const DEFAULT_TITLE = 'VOCES DE ÉXITO'

const DEFAULT_TESTIMONIALS: TestimonialVideo[] = [
  {
    name: 'Rodrigo Espinoza Varela',
    role: 'Operador de Grúa',
    bu: 'Terminal Lázaro Cárdenas',
    quote: 'El Tronco Común me dio las bases para entender mi impacto en toda la operación.',
    videoSrc: '',
    poster: '/webp/fotos-nacho/DSC03415.webp',
  },
  {
    name: 'Mariana Villanueva Cruz',
    role: 'Supervisora de Operaciones',
    bu: 'Terminal Manzanillo',
    quote: 'Completar la Culturización me abrió una perspectiva diferente del liderazgo.',
    videoSrc: '',
    poster: '/webp/fotos-nacho/DSC03437.webp',
  },
  {
    name: 'Óscar Fuentes Méndez',
    role: 'Técnico de Mantenimiento',
    bu: 'Terminal Ensenada',
    quote: 'Los módulos son claros y relevantes para lo que vivimos en el puerto cada día.',
    videoSrc: '',
    poster: '/webp/fotos-nacho/DSC03462.webp',
  },
  {
    name: 'Lucía Ramírez Solano',
    role: 'Coordinadora de RRHH',
    bu: 'Corporativo HP México',
    quote: 'Ver el ranking fue el empuje que necesitaba. Subimos tres posiciones en una semana.',
    videoSrc: '',
    poster: '/webp/fotos-nacho/4J4B8483.webp',
  },
]

function normalizeTestimonials(items?: SanityTestimonial[]): TestimonialVideo[] {
  if (!items || items.length === 0) return DEFAULT_TESTIMONIALS
  return items.map((it, i) => ({
    name: it.name ?? DEFAULT_TESTIMONIALS[i % DEFAULT_TESTIMONIALS.length].name,
    role: it.role ?? '',
    bu: it.bu ?? '',
    quote: it.quote ?? '',
    videoSrc: it.videoSrc ?? '',
    poster: it.poster ?? DEFAULT_TESTIMONIALS[i % DEFAULT_TESTIMONIALS.length].poster,
  }))
}

function ActiveCard({ t }: { t: TestimonialVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) { videoRef.current.pause(); setPlaying(false) }
    else { videoRef.current.play(); setPlaying(true) }
  }

  return (
    <motion.div
      className="relative overflow-hidden shrink-0"
      style={{ width: '260px', height: '462px' }}
      whileHover={{ y: -8, boxShadow: '0 32px 60px rgba(0,159,227,0.3)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
    >
      {t.videoSrc ? (
        <video ref={videoRef} src={t.videoSrc} poster={t.poster}
          className="absolute inset-0 w-full h-full object-cover" playsInline loop />
      ) : (
        <img src={t.poster} alt={t.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy" decoding="async" />
      )}

      <div className="absolute inset-0" style={{
        background: `linear-gradient(to top, rgba(0,46,109,0.97) 0%, rgba(0,46,109,0.40) 45%, transparent 100%)`,
      }} />

      <motion.button
        onClick={togglePlay}
        className="absolute flex items-center justify-center"
        style={{ width: '56px', height: '56px', top: '36%', left: '50%', x: '-50%', y: '-50%',
          background: Colors.skyBlue100, border: '2px solid rgba(255,255,255,0.35)' }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        animate={playing ? {} : {
          boxShadow: ['0 0 0 0 rgba(0,159,227,0)', '0 0 0 14px rgba(0,159,227,0.22)', '0 0 0 28px rgba(0,159,227,0)'],
        }}
        transition={playing ? {} : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label={playing ? 'Pausar' : 'Reproducir'}
      >
        {playing
          ? <Pause size={22} color="#FFFFFF" weight="fill" />
          : <Play  size={22} color="#FFFFFF" weight="fill" style={{ marginLeft: '3px' }} />
        }
      </motion.button>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-navy leading-tight mb-0.5"
          style={{ fontFamily: 'Verlag Black, sans-serif', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '0.04em' }}>
          {t.name}
        </p>
        <p className="font-montserrat text-navy text-xs mb-3">{t.role} · {t.bu}</p>
        <p className="font-montserrat text-navy text-xs leading-relaxed italic">
          "{t.quote}"
        </p>
      </div>
    </motion.div>
  )
}

function GhostCard({ t, side }: { t: TestimonialVideo; side: 'left' | 'right' }) {
  return (
    <div
      className="relative overflow-hidden shrink-0 pointer-events-none select-none"
      style={{
        width: '180px',
        height: '320px',
        opacity: 0.35,
        filter: 'blur(3px)',
        transform: side === 'left' ? 'scale(0.88) translateX(20px)' : 'scale(0.88) translateX(-20px)',
        transformOrigin: side === 'left' ? 'right center' : 'left center',
      }}
    >
      <img src={t.poster} alt="" className="absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy" decoding="async" />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(0,46,109,0.80) 0%, rgba(0,46,109,0.20) 60%, transparent 100%)',
      }} />
      <div className="absolute inset-0" style={{
        background: side === 'left'
          ? 'linear-gradient(to right, rgba(0,46,109,1) 0%, transparent 60%)'
          : 'linear-gradient(to left, rgba(0,46,109,1) 0%, transparent 60%)',
      }} />
    </div>
  )
}

export default function Testimonials({ titulo, items }: TestimonialsProps) {
  const testimonials = normalizeTestimonials(items)
  const n = testimonials.length

  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir)
    setActive(idx)
  }, [])

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setActive(a => (a + 1) % n)
    }, 5000)
  }, [n])

  useEffect(() => {
    resetInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [resetInterval])

  const handlePrev = () => { goTo((active - 1 + n) % n, -1); resetInterval() }
  const handleNext = () => { goTo((active + 1) % n, 1); resetInterval() }

  const prevIdx = (active - 1 + n) % n
  const nextIdx = (active + 1) % n

  const cardVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 260 : -260, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 320, damping: 38, mass: 0.8 } },
    exit:  (dir: number) => ({ x: dir > 0 ? -260 : 260, opacity: 0, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }),
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#9ACAEB' }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/webp/fotos-nacho/DSC00758.webp"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.12 }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="absolute top-0 right-0 w-80 h-80 opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${Colors.skyBlue100} 0%, transparent 70%)` }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <SectionReveal>
            <h2 className="section-title text-navy mb-6">
              {titulo ?? DEFAULT_TITLE}
            </h2>

            <div className="mb-10 min-h-[80px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-navy font-semibold mb-1" style={DescriptionCSS.base}>
                    {testimonials[active].name}
                  </p>
                  <p className="text-navy mb-3" style={DescriptionCSS.base}>
                    {testimonials[active].role} · {testimonials[active].bu}
                  </p>
                  <p className="text-navy font-bold" style={DescriptionCSS.base}>
                    "{testimonials[active].quote}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-6">
              <motion.button onClick={handlePrev}
                className="w-14 h-14 flex items-center justify-center shrink-0"
                style={{ border: '2px solid #FFFFFF', background: 'transparent' }}
                whileHover={{ backgroundColor: Colors.skyBlue100, borderColor: Colors.skyBlue100, scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.18 }}
                aria-label="Anterior">
                <CaretLeft size={26} color="#FFFFFF" weight="bold" />
              </motion.button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => { goTo(i, i > active ? 1 : -1); resetInterval() }}
                    aria-label={`Testimonio ${i + 1}`}>
                    <motion.div
                      animate={{ width: i === active ? 28 : 12, backgroundColor: i === active ? Colors.skyBlue100 : 'rgba(255,255,255,0.2)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      style={{ height: '3px' }}
                    />
                  </button>
                ))}
              </div>

              <motion.button onClick={handleNext}
                className="w-14 h-14 flex items-center justify-center shrink-0"
                style={{ border: '2px solid #FFFFFF', background: 'transparent' }}
                whileHover={{ backgroundColor: Colors.skyBlue100, borderColor: Colors.skyBlue100, scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.18 }}
                aria-label="Siguiente">
                <CaretRight size={26} color="#FFFFFF" weight="bold" />
              </motion.button>
            </div>
          </SectionReveal>

          <div className="flex justify-center lg:justify-end">
            <div className="flex items-center gap-3">

              <GhostCard t={testimonials[prevIdx]} side="left" />

              <div className="relative shrink-0" style={{ width: '260px', height: '462px' }}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={active}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <ActiveCard t={testimonials[active]} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <GhostCard t={testimonials[nextIdx]} side="right" />

            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  )
}
