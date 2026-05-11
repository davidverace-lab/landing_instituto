import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { CaretLeft, CaretRight, Play, Pause } from '@phosphor-icons/react'
import { Colors } from '../../tokens'
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
    name: 'Héctor Raúl Acosta Ponce',
    role: '',
    bu: 'TIMSA',
    quote: 'Formar parte del Instituto me ha permitido conocer a mayor detalle la filosofía del grupo, su historia, visión estratégica actual y planes a futuro. Todo ello sin duda suma al fortalecimiento de las competencias de cada uno de los que conformamos Hutchison Ports.',
    videoSrc: '',
    poster: '/webp/Hector Raul Acosta Ponce.png',
  },
  {
    name: 'Jafet Salas Díaz',
    role: '',
    bu: 'ICAVE',
    quote: 'Me ha reforzado los conocimientos generales, adquiriendo una comprensión global sobre todas las áreas de la organización, objetivos comunes y un funcionamiento más efectivo, siendo una experiencia útil para sentirme identificado con la empresa y comprender de manera general cómo contribuye mi trabajo a los objetivos del grupo.',
    videoSrc: '',
    poster: '/webp/Jafet salas.png',
  },
  {
    name: 'Jaime Ortiz Sosa',
    role: '',
    bu: 'Container Care',
    quote: 'Formar parte del Instituto Hutchison Ports ha sido una gran oportunidad de crecimiento personal y profesional, comprendiendo el valor de cada departamento, ya que todos contribuyen al éxito del Grupo.',
    videoSrc: '',
    poster: '/webp/Jaime Ortiz Sosa.png',
  },
  {
    name: 'Lucila del Carmen Mora Bravo',
    role: '',
    bu: 'Corporativo Hutchison Ports',
    quote: 'El Instituto Hutchison Ports ha representado una gran experiencia de vanguardia tecnológica aplicada a la capacitación. Es una plataforma muy enriquecedora que contempla todos los procesos y aristas que nos permite que la operación se lleve a cabo de manera eficiente en tiempo y forma.',
    videoSrc: '',
    poster: '/webp/Lucila Mora.png',
  },
  {
    name: 'María Susana Aguileta Roquet',
    role: '',
    bu: 'TNG',
    quote: 'Aprendí sobre la Filosofía del Grupo, las Operaciones Portuarias, la seguridad de las mismas, la sostenibilidad y demás temas clave que fortalecen y exhortan el trabajo en equipo. Sin duda esta experiencia me ha inspirado a seguir creciendo y a continuar aportando lo mejor de mi en Hutchison Ports.',
    videoSrc: '',
    poster: '/webp/Susana Aguileta.png',
  },
]

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
      className="relative overflow-hidden shrink-0 rounded-2xl w-full h-full"
      whileHover={{ y: -8, boxShadow: '0 32px 60px rgba(0,159,227,0.3)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
    >
      {t.videoSrc ? (
        <video ref={videoRef} src={t.videoSrc} poster={t.poster}
          className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 25%' }} playsInline loop />
      ) : (
        <img src={t.poster} alt={t.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 25%' }}
          loading="lazy" decoding="async" />
      )}

      {t.videoSrc && (
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
      )}

    </motion.div>
  )
}

function GhostCard({ t, side }: { t: TestimonialVideo; side: 'left' | 'right' }) {
  return (
    <div
      className="relative overflow-hidden shrink-0 pointer-events-none select-none rounded-2xl"
      style={{
        width: '240px',
        height: '320px',
        opacity: 0.35,
        filter: 'blur(3px)',
        transform: side === 'left' ? 'scale(0.88) translateX(20px)' : 'scale(0.88) translateX(-20px)',
        transformOrigin: side === 'left' ? 'right center' : 'left center',
      }}
    >
      <img src={t.poster} alt="" className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 25%' }}
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

export default function Testimonials(_props: TestimonialsProps) {
  // CMS desconectado temporalmente — usar DEFAULTS hardcodeados
  const titulo = DEFAULT_TITLE
  const testimonials = DEFAULT_TESTIMONIALS
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
    enter: (dir: number) => ({ x: dir > 0 ? 320 : -320, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 320, damping: 38, mass: 0.8 } },
    exit:  (dir: number) => ({ x: dir > 0 ? -320 : 320, opacity: 0, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }),
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#B5D5EA' }}
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:pl-16 lg:pr-12 py-10 md:py-20 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-10 lg:gap-12 items-center">

          <SectionReveal>
            <h2 className="section-title text-navy mb-4 md:mb-8 lg:mb-10" style={{ textWrap: 'balance' as React.CSSProperties['textWrap'] }}>
              {titulo}
            </h2>

            <div className="testimonial-text-wrap mb-4 sm:mb-5 md:mb-8 lg:mb-10 relative w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="testimonial-text-inner"
                >
                  <p
                    className="text-navy text-left"
                    style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)',
                      lineHeight: 1.3,
                      letterSpacing: '-0.005em',
                      marginBottom: '4px',
                      textWrap: 'wrap' as React.CSSProperties['textWrap'],
                    }}
                  >
                    {testimonials[active].name}
                  </p>
                  <p
                    className="text-navy text-left"
                    style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: 500,
                      fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                      lineHeight: 1.4,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      opacity: 0.7,
                      marginBottom: '20px',
                      textWrap: 'wrap' as React.CSSProperties['textWrap'],
                    }}
                  >
                    {testimonials[active].bu}
                  </p>
                  <p
                    className="text-navy text-left"
                    style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: 500,
                      fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
                      lineHeight: 1.55,
                      letterSpacing: '0.005em',
                      textWrap: 'wrap' as React.CSSProperties['textWrap'],
                    }}
                  >
                    "{testimonials[active].quote}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 flex-wrap">
              <motion.button onClick={handlePrev}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center shrink-0"
                style={{ border: '2px solid #FFFFFF', background: 'transparent' }}
                whileHover={{ backgroundColor: Colors.skyBlue100, borderColor: Colors.skyBlue100, scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.18 }}
                aria-label="Anterior">
                <CaretLeft size={22} color="#FFFFFF" weight="bold" />
              </motion.button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => { goTo(i, i > active ? 1 : -1); resetInterval() }}
                    aria-label={`Testimonio ${i + 1}`}>
                    <motion.div
                      animate={{ width: i === active ? 24 : 10, backgroundColor: i === active ? Colors.skyBlue100 : 'rgba(255,255,255,0.2)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      style={{ height: '3px' }}
                    />
                  </button>
                ))}
              </div>

              <motion.button onClick={handleNext}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center shrink-0"
                style={{ border: '2px solid #FFFFFF', background: 'transparent' }}
                whileHover={{ backgroundColor: Colors.skyBlue100, borderColor: Colors.skyBlue100, scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.18 }}
                aria-label="Siguiente">
                <CaretRight size={22} color="#FFFFFF" weight="bold" />
              </motion.button>
            </div>
          </SectionReveal>

          <div className="flex justify-center lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-32 xl:translate-x-40">
            <div className="flex items-center gap-3">

              <div className="hidden md:block">
                <GhostCard t={testimonials[prevIdx]} side="left" />
              </div>

              <div
                className="relative shrink-0"
                style={{
                  width: 'min(360px, 88vw)',
                  height: 'clamp(240px, 78vw, 460px)',
                }}
              >
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

              <div className="hidden md:block">
                <GhostCard t={testimonials[nextIdx]} side="right" />
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  )
}
