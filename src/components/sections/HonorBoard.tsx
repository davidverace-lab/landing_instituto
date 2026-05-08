import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Type, DescriptionCSS, useBreakpoint } from '../../tokens'

interface HonorBoardProps {
  titulo?: string
  descripcion?: string
  fotos?: string[]
}

interface HonorUnit {
  name: string
  logos: string[]
  photos: [string, string, string]
  /** When true, the logo is a raster/full-color asset and should not be tinted white. */
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
    'En el Instituto Hutchison Ports, valoramos profundamente tu dedicación. El Cuadro de Honor distingue a los colaboradores que destacan por su desempeño académico y proactividad. ¡Su compromiso es una inspiración para toda nuestra comunidad!',
}

/* ------------------------------------------------------------------ */
/* Slide                                                               */
/* ------------------------------------------------------------------ */

interface SlideProps {
  unit: HonorUnit
  /** Width the slide should occupy in viewport units. */
  widthVw: number
  /** Vertical paddings + max width tuned to the breakpoint. */
  variant: 'desktop' | 'mobile'
}

function HonorSlide({ unit, widthVw, variant }: SlideProps) {
  const isDouble = unit.logos.length > 1
  const isMobile = variant === 'mobile'

  return (
    <div
      className="shrink-0 flex items-center justify-center"
      style={{
        width: `${widthVw}vw`,
        height: '100%',
        paddingLeft: isMobile ? 'clamp(20px, 6vw, 40px)' : 'clamp(16px, 2.5vw, 48px)',
        paddingRight: isMobile ? 'clamp(20px, 6vw, 40px)' : 'clamp(24px, 5vw, 80px)',
        paddingTop: isMobile ? 'clamp(20px, 4vh, 36px)' : 'clamp(24px, 4vh, 56px)',
        paddingBottom: isMobile ? 'clamp(28px, 6vh, 56px)' : 'clamp(24px, 4vh, 56px)',
      }}
    >
      <div
        className="flex flex-col items-center justify-center w-full"
        style={{
          maxWidth: isMobile ? 360 : 720,
          height: isMobile ? 'auto' : '100%',
          gap: isMobile ? 'clamp(10px, 2vh, 18px)' : 'clamp(14px, 2vh, 28px)',
        }}
      >
        <div
          className="grid grid-cols-3 w-full"
          style={{
            gap: isMobile ? 'clamp(6px, 1.5vw, 10px)' : 'clamp(8px, 1vw, 16px)',
            flex: isMobile ? '0 0 auto' : '1 1 auto',
            minHeight: 0,
          }}
        >
          {unit.photos.map((src, i) => (
            <div
              key={`${unit.name}-${i}`}
              className="relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                boxShadow: '0 18px 40px -16px rgba(0,0,0,0.5)',
                aspectRatio: isMobile ? '3 / 4' : 'auto',
                height: isMobile ? 'auto' : '100%',
              }}
            >
              <img
                src={src}
                alt={`Colaborador ${unit.name}`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <div
          className="w-full flex items-center justify-center"
          style={{
            paddingTop: isMobile ? '4px' : 'clamp(8px, 1.4vh, 18px)',
            paddingBottom: isMobile ? '4px' : 'clamp(8px, 1.4vh, 18px)',
            gap: isDouble ? (isMobile ? 'clamp(20px, 5vw, 36px)' : 'clamp(28px, 4vw, 56px)') : 0,
            flex: '0 0 auto',
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
                  ? isMobile
                    ? 'clamp(48px, 10vw, 72px)'
                    : 'clamp(60px, 8vh, 110px)'
                  : isMobile
                    ? 'clamp(28px, 6vw, 44px)'
                    : 'clamp(34px, 4.6vh, 64px)',
                width: 'auto',
                objectFit: 'contain',
                filter: unit.preserveColor ? 'none' : 'brightness(0) invert(1)',
              }}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile layout: header fixed top, slides scroll horizontally below   */
/* ------------------------------------------------------------------ */

function HonorBoardMobile({ titulo, descripcion }: { titulo: string; descripcion: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  })

  const total = UNITS.length

  // On mobile each slide takes the full viewport width. Final state centers TNG (last slide).
  // Track total width = total × 100vw. To leave the last slide centered, we translate by (total - 1) × 100vw.
  const finalTranslateVw = (total - 1) * 100

  const holdVH = 100
  const horizontalVH = (total - 1) * 100
  const pinnedDistanceVH = holdVH + horizontalVH
  const sectionVH = 100 + pinnedDistanceVH
  const HOLD_END = holdVH / pinnedDistanceVH

  const trackTranslate = useTransform(
    smoothProgress,
    [0, HOLD_END, 1],
    ['0vw', '0vw', `-${finalTranslateVw}vw`],
  )

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{
        backgroundColor: '#002E6D',
        height: `${sectionVH}vh`,
      }}
      aria-label="Cuadro de Honor"
    >
      <div
        className="sticky top-0 left-0 w-full overflow-hidden flex flex-col"
        style={{ height: '100dvh' }}
      >
        {/* background */}
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
                'radial-gradient(ellipse at 50% 0%, rgba(0,155,222,0.18) 0%, rgba(0,46,109,0) 60%)',
            }}
          />
        </div>

        {/* header — fixed, centered */}
        <header
          className="relative z-10 flex flex-col items-center text-center shrink-0"
          style={{
            paddingTop: 'clamp(24px, 6vh, 48px)',
            paddingLeft: 'clamp(20px, 5vw, 32px)',
            paddingRight: 'clamp(20px, 5vw, 32px)',
            paddingBottom: 'clamp(12px, 2vh, 20px)',
          }}
        >
          <h2
            className="section-title text-white"
            style={{
              fontSize: 'clamp(1.6rem, 6vw, 2.2rem)',
              lineHeight: 1.05,
              marginBottom: 'clamp(10px, 1.6vh, 16px)',
            }}
          >
            {titulo}
          </h2>
          <p
            className="text-white"
            style={{
              ...DescriptionCSS.sm,
              color: 'rgba(255,255,255,0.88)',
              fontSize: 'clamp(0.95rem, 3.4vw, 1.05rem)',
              maxWidth: '38ch',
            }}
          >
            {descripcion}
          </p>
        </header>

        {/* horizontal track — fills remaining space */}
        <div className="relative z-10 flex-1 min-h-0 overflow-hidden">
          <motion.div
            className="flex h-full items-stretch will-change-transform"
            style={{
              width: `${total * 100}vw`,
              x: trackTranslate,
            }}
          >
            {UNITS.map((unit) => (
              <HonorSlide key={unit.name} unit={unit} widthVw={100} variant="mobile" />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop layout: text + slides as a single horizontal track          */
/* ------------------------------------------------------------------ */

function HonorBoardDesktop({ titulo, descripcion }: { titulo: string; descripcion: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  })

  const total = UNITS.length
  const finalTranslateVw = total * 50 - 25

  const holdVH = 100
  const horizontalVH = (finalTranslateVw / 50) * 100
  const pinnedDistanceVH = holdVH + horizontalVH
  const sectionVH = 100 + pinnedDistanceVH
  const HOLD_END = holdVH / pinnedDistanceVH

  const trackTranslate = useTransform(
    smoothProgress,
    [0, HOLD_END, 1],
    ['0vw', '0vw', `-${finalTranslateVw}vw`],
  )

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{
        backgroundColor: '#002E6D',
        height: `${sectionVH}vh`,
      }}
      aria-label="Cuadro de Honor"
    >
      <div
        className="sticky top-0 left-0 w-full overflow-hidden"
        style={{ height: '100vh' }}
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

        <motion.div
          className="relative z-10 flex h-full items-stretch will-change-transform"
          style={{
            width: `${(total + 1) * 50}vw`,
            x: trackTranslate,
          }}
        >
          <div
            className="flex flex-col justify-center shrink-0"
            style={{
              width: '50vw',
              height: '100%',
              paddingLeft: 'clamp(24px, 5vw, 80px)',
              paddingRight: 'clamp(24px, 4vw, 64px)',
              paddingTop: 'clamp(24px, 4vh, 56px)',
              paddingBottom: 'clamp(24px, 4vh, 56px)',
            }}
          >
            <h2
              className="section-title text-white"
              style={{ fontSize: Type.h2, lineHeight: 1.05, marginBottom: 'clamp(16px, 2.4vh, 32px)' }}
            >
              {titulo}
            </h2>
            <p
              className="text-white"
              style={{ ...DescriptionCSS.base, color: '#FFFFFF', maxWidth: '52ch' }}
            >
              {descripcion}
            </p>
          </div>

          {UNITS.map((unit) => (
            <HonorSlide key={unit.name} unit={unit} widthVw={50} variant="desktop" />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */

export default function HonorBoard(_props: HonorBoardProps) {
  // CMS desconectado temporalmente — usar DEFAULTS hardcodeados
  const { isTablet } = useBreakpoint()
  const t = DEFAULTS.titulo
  const d = DEFAULTS.descripcion

  // `isTablet` from tokens means width < 1024 — true for mobile + tablet.
  return isTablet ? (
    <HonorBoardMobile titulo={t} descripcion={d} />
  ) : (
    <HonorBoardDesktop titulo={t} descripcion={d} />
  )
}
