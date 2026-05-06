import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { Star } from '@phosphor-icons/react'
import { useInView } from '../../hooks/useInView'
import { Type, DescriptionCSS } from '../../tokens'

interface HonorBoardProps {
  titulo?: string
  descripcion?: string
  fotos?: string[]
}

const DEFAULT_PHOTOS = [
  '/webp/fotos-nacho/4J4B8787.webp',
  '/webp/fotos-nacho/4J4B8793.webp',
  '/webp/fotos-nacho/4J4B8798.webp',
  '/webp/fotos-nacho/DSC09930.webp',
  '/webp/fotos-nacho/DSC02858.webp',
  '/webp/fotos-nacho/DSC07077.webp',
]

const DEFAULTS = {
  titulo: 'RECONOCEMOS TU EXCELENCIA',
  descripcion: 'El Cuadro de Honor es el reconocimiento más alto del Instituto Hutchison Ports. Los colaboradores que completan todos sus módulos con excelencia tienen un lugar reservado en esta distinción nacional.',
}

function PhotoGrid({ photos }: { photos: string[] }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {photos.map((src, i) => (
        <motion.div
          key={`${src}-${i}`}
          className="relative overflow-hidden aspect-[4/3]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: i * 0.08 }}
          whileHover={{ y: -6, scale: 1.02 }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-navy-dark/20" />
          {i === 0 && (
            <motion.div
              className="absolute top-3 left-3"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Star size={22} weight="fill" color="#F5A800" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default function HonorBoard({ titulo, descripcion, fotos }: HonorBoardProps) {
  const photos = fotos && fotos.length > 0 ? fotos : DEFAULT_PHOTOS

  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{ backgroundColor: '#002E6D', minHeight: '100dvh', display: 'flex', alignItems: 'center' }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/tilh_noche_ok.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.14 }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <SectionReveal>
            <PhotoGrid photos={photos} />
          </SectionReveal>

          <div>
            <SectionReveal direction="left">
              <h2 className="section-title text-white mb-8" style={{ fontSize: Type.h2 }}>
                {titulo ?? DEFAULTS.titulo}
              </h2>

              <p className="text-white mb-10" style={DescriptionCSS.base}>
                {descripcion ?? DEFAULTS.descripcion}
              </p>
            </SectionReveal>

          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/20" />
    </section>
  )
}
