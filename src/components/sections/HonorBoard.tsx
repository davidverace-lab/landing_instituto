import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Type, DescriptionCSS, Colors } from '../../tokens'

interface HonorBoardProps {
  titulo?: string
  descripcion?: string
  fotos?: string[]
}

interface HonorUnit {
  name: string
  logos: string[]
  photos: [string, string, string]
  preserveColor?: boolean
}

const POOL = [
  '/webp/fotos-nacho/4J4B8787.webp',
  '/webp/fotos-nacho/4J4B8793.webp',
  '/webp/fotos-nacho/4J4B8798.webp',
  '/webp/fotos-nacho/4J4B8483.webp',
  '/webp/fotos-nacho/4J4B8556.webp',
  '/webp/fotos-nacho/DSC09930.webp',
  '/webp/fotos-nacho/DSC02858.webp',
  '/webp/fotos-nacho/DSC07077.webp',
] as const

const pick = (i: number, j: number, k: number): [string, string, string] => [
  POOL[i % POOL.length],
  POOL[j % POOL.length],
  POOL[k % POOL.length],
]

const UNITS: HonorUnit[] = [
  { name: 'CCI',          logos: ['/logos/cci.svg'],                       photos: pick(0, 1, 2) },
  { name: 'EIT + ECV',    logos: ['/logos/eit.svg', '/logos/ecv.svg'],     photos: pick(3, 4, 5) },
  { name: 'HP LOGISTICS', logos: ['/logos/hp-logistics.svg'],              photos: pick(6, 7, 0) },
  { name: 'HP MÉXICO',    logos: ['/webp/hports.webp'],                    photos: pick(1, 2, 3), preserveColor: true },
  { name: 'ICAVE',        logos: ['/logos/icave.svg'],                     photos: pick(4, 5, 6) },
  { name: 'LCMT + LCT',   logos: ['/logos/lcmt.svg', '/logos/lct.svg'],    photos: pick(7, 0, 1) },
  { name: 'TILH',         logos: ['/logos/tilh.svg'],                      photos: pick(2, 3, 4) },
  { name: 'TIMSA',        logos: ['/logos/timsa.svg'],                     photos: pick(5, 6, 7) },
  { name: 'TNG',          logos: ['/logos/tng.svg'],                       photos: pick(0, 3, 6) },
]

const DEFAULTS = {
  titulo: 'RECONOCEMOS TU EXCELENCIA',
  descripcion:
    'En el Instituto Hutchison Ports, valoramos profundamente tu dedicación. El Cuadro de Honor distingue a los colaboradores que destacan por su desempeño académico y proactividad.',
  descripcion2: '¡Su compromiso es una inspiración para toda nuestra comunidad!',
}

function HonorSlideCard({ unit }: { unit: HonorUnit }) {
  const isDouble = unit.logos.length > 1

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        gap: 'clamp(14px, 2vh, 24px)',
      }}
    >
      <div
        className="grid grid-cols-3 w-full"
        style={{
          gap: 'clamp(8px, 1vw, 16px)',
        }}
      >
        {['/proximamente 1.jpg', '/proximamente.jpg', '/proximamente 1.jpg'].map((src, i) => (
          <div
            key={`${unit.name}-${i}`}
            className="relative overflow-hidden rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.04)',
              boxShadow: '0 18px 40px -16px rgba(0,0,0,0.5)',
              aspectRatio: '3 / 4',
            }}
          >
            <img
              src={src}
              alt="Próximamente"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div
        className="honor-logos w-full flex items-center justify-center"
        style={{
          gap: isDouble ? 'var(--logo-gap)' : 0,
        }}
      >
        {unit.logos.map((logo, i) => (
          <img
            key={`${unit.name}-logo-${i}`}
            src={logo}
            alt={unit.name}
            className="block select-none pointer-events-none"
            style={{
              height: unit.preserveColor
                ? 'var(--logo-h-lg)'
                : 'var(--logo-h)',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              filter: unit.preserveColor ? 'none' : 'brightness(0) invert(1)',
            }}
            draggable={false}
          />
        ))}
      </div>
    </div>
  )
}

export default function HonorBoard(_props: HonorBoardProps) {
  const titulo = DEFAULTS.titulo
  const descripcion = DEFAULTS.descripcion
  const descripcion2 = DEFAULTS.descripcion2
  const total = UNITS.length

  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir)
    setActive(((idx % total) + total) % total)
  }, [total])

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setActive(a => (a + 1) % total)
    }, 4500)
  }, [total])

  useEffect(() => {
    resetInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [resetInterval])

  const handlePrev = () => { goTo(active - 1, -1); resetInterval() }
  const handleNext = () => { goTo(active + 1, 1); resetInterval() }

  const slideVariants = {
    enter: (dir: number) => ({ y: dir > 0 ? '110%' : '-110%', opacity: 0 }),
    center: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 180, damping: 28, mass: 0.9 },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? '-110%' : '110%',
      opacity: 0,
      transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    }),
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#002E6D' }}
      aria-label="Cuadro de Honor"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/reconocemosfondo.png"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.12 }}
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 20% 0%, rgba(0,155,222,0.18) 0%, rgba(0,46,109,0) 55%), radial-gradient(ellipse at 80% 100%, rgba(255,198,39,0.10) 0%, rgba(0,46,109,0) 60%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-10 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-5 sm:gap-6 md:gap-14 lg:gap-16 items-center">

          {/* Header */}
          <div className="text-center lg:text-left">
            <h2
              className="section-title text-white mb-3 md:mb-6"
              style={{ fontSize: Type.h2, lineHeight: 1.05, textWrap: 'balance' as React.CSSProperties['textWrap'] }}
            >
              {titulo}
            </h2>
            <p
              className="text-white mx-auto lg:mx-0"
              style={{ ...DescriptionCSS.base, color: '#FFFFFF', maxWidth: '52ch', marginBottom: '0.75rem' }}
            >
              {descripcion}
            </p>
            <p
              className="text-white mx-auto lg:mx-0"
              style={{ ...DescriptionCSS.base, color: '#FFFFFF', maxWidth: '52ch' }}
            >
              {descripcion2}
            </p>

            {/* Controles */}
            <div className="mt-5 md:mt-10 flex items-center justify-center lg:justify-start gap-3 md:gap-6 flex-wrap">
              <motion.button
                onClick={handlePrev}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center shrink-0"
                style={{ border: '2px solid #FFFFFF', background: 'transparent' }}
                whileHover={{ backgroundColor: Colors.skyBlue100, borderColor: Colors.skyBlue100, scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.18 }}
                aria-label="Unidad anterior"
              >
                <CaretLeft size={22} color="#FFFFFF" weight="bold" />
              </motion.button>

              <div className="flex items-center gap-2">
                {UNITS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { goTo(i, i > active ? 1 : -1); resetInterval() }}
                    aria-label={`Unidad ${i + 1}`}
                  >
                    <motion.div
                      animate={{
                        width: i === active ? 28 : 12,
                        backgroundColor: i === active ? Colors.skyBlue100 : 'rgba(255,255,255,0.28)',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      style={{ height: 3 }}
                    />
                  </button>
                ))}
              </div>

              <motion.button
                onClick={handleNext}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center shrink-0"
                style={{ border: '2px solid #FFFFFF', background: 'transparent' }}
                whileHover={{ backgroundColor: Colors.skyBlue100, borderColor: Colors.skyBlue100, scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.18 }}
                aria-label="Siguiente unidad"
              >
                <CaretRight size={22} color="#FFFFFF" weight="bold" />
              </motion.button>
            </div>
          </div>

          {/* Carousel — transición vertical: sube hacia arriba, entra desde abajo */}
          <div
            className="honor-carousel relative w-full mx-auto overflow-hidden honor-carousel-mask"
            style={{
              maxWidth: 'min(640px, 100%)',
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
                style={{ willChange: 'transform, opacity' }}
              >
                <HonorSlideCard unit={UNITS[active]} />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
