import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { useInView } from '../../hooks/useInView'
import { Colors, Type, DescriptionCSS } from '../../tokens'

interface RankingProps {
  titulo?: string
  descripcion?: string
  etiquetaGrafica?: string
}

const DEFAULTS = {
  titulo: 'EL PODER DE TU UNIDAD DE NEGOCIO',
  descripcion: '¿Tu Unidad de Negocio está liderando el camino? Tu participación decide la posición de tu equipo en el ranking nacional. Cada módulo completado suma para llevar a tu terminal al primer lugar.',
  etiquetaGrafica: 'Avance por Unidad de Negocio',
}

export default function Ranking({ titulo, descripcion, etiquetaGrafica }: RankingProps) {
  const { ref: imgRef, inView: imgInView } = useInView()

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: Colors.bgSurface }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <SectionReveal>
              <h2 className="section-title mb-8" style={{ lineHeight: 1.1, color: '#002E6D' }}>
                <span style={{ display: 'block', whiteSpace: 'nowrap' }}>EL PODER DE TU</span>
                <span style={{ display: 'block', whiteSpace: 'nowrap' }}>UNIDAD DE NEGOCIO</span>
              </h2>
              <p style={{ ...DescriptionCSS.base, color: '#002E6D' }}>
                {descripcion ?? DEFAULTS.descripcion}
              </p>
            </SectionReveal>
          </div>

          <SectionReveal direction="left" delay={0.18}>
            <motion.div
              ref={imgRef}
              className="overflow-hidden"
              style={{
                background: Colors.white,
                boxShadow: '0 24px 60px -10px rgba(0,46,109,0.25)',
              }}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            >
              <motion.div
                className="p-5 md:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={imgInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.15 }}
              >
                <p className="font-verlag text-navy uppercase tracking-wider mb-4" style={{ fontSize: Type.overline }}>
                  {etiquetaGrafica ?? DEFAULTS.etiquetaGrafica}
                </p>
                <img
                  src="/webp/grafica comparativa.webp"
                  alt="Gráfica comparativa de avance por Unidad de Negocio"
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </motion.div>
          </SectionReveal>

        </div>
      </div>

    </section>
  )
}
