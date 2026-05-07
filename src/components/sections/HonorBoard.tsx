import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Type, DescriptionCSS } from '../../tokens'

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
    'El Cuadro de Honor es el reconocimiento más alto del Instituto Hutchison Ports. Los colaboradores que completan todos sus módulos con excelencia tienen un lugar reservado en esta distinción nacional.',
}

function HonorSlide({ unit }: { unit: HonorUnit }) {
  const isDouble = unit.logos.length > 1

  return (
    <div
      className="shrink-0 flex items-center justify-center"
      style={{
        width: '50vw',
        height: '100%',
        paddingLeft: 'clamp(16px, 2.5vw, 48px)',
        paddingRight: 'clamp(24px, 5vw, 80px)',
        paddingTop: 'clamp(24px, 4vh, 56px)',
        paddingBottom: 'clamp(24px, 4vh, 56px)',
      }}
    >
      <div
        className="flex flex-col items-stretch"
        style={{
          width: '100%',
          maxWidth: 720,
          height: '100%',
          gap: 'clamp(14px, 2vh, 28px)',
        }}
      >
        <div
          className="grid grid-cols-3 w-full"
          style={{
            gap: 'clamp(8px, 1vw, 16px)',
            flex: '1 1 auto',
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
                height: '100%',
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
            paddingTop: 'clamp(8px, 1.4vh, 18px)',
            paddingBottom: 'clamp(8px, 1.4vh, 18px)',
            gap: isDouble ? 'clamp(28px, 4vw, 56px)' : 0,
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
                // Raster logos (e.g. hports.webp) carry transparent padding inside the bitmap,
                // so we bump their height to match the visible footprint of the inline SVGs.
                height: unit.preserveColor ? 'clamp(60px, 8vh, 110px)' : 'clamp(34px, 4.6vh, 64px)',
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

export default function HonorBoard({ titulo, descripcion }: HonorBoardProps) {
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

  // Layout in scroll space:
  //   panel 0: text (50vw)
  //   panels 1..total: each unit slide (50vw each)
  // Final state centers the LAST unit (TNG) in the viewport.
  const finalTranslateVw = total * 50 - 25

  // We split the pinned scroll distance into two phases:
  //   1) Hold phase (1 viewport of vertical scroll, no horizontal motion) — gives the user
  //      time to read text + CCI before the carousel kicks in.
  //   2) Horizontal phase ((finalTranslateVw / 50) viewports of vertical scroll) — track moves
  //      through all panels, ending with TNG centered.
  // The pinned content sits inside a section whose height = viewport + holdVH + horizontalVH.
  const holdVH = 100 // 1 viewport hold
  const horizontalVH = (finalTranslateVw / 50) * 100
  const pinnedDistanceVH = holdVH + horizontalVH
  const sectionVH = 100 + pinnedDistanceVH

  // scrollYProgress maps [0..1] across `pinnedDistanceVH` of vertical scroll.
  // Hold phase ends at holdVH / pinnedDistanceVH.
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
              {titulo ?? DEFAULTS.titulo}
            </h2>
            <p
              className="text-white"
              style={{ ...DescriptionCSS.base, color: '#FFFFFF', maxWidth: '52ch' }}
            >
              {descripcion ?? DEFAULTS.descripcion}
            </p>
          </div>

          {UNITS.map((unit) => (
            <HonorSlide key={unit.name} unit={unit} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
