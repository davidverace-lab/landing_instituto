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
      style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0,155,222,0.50)' }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/webp/fotos-nacho/DJI_20250926023427_0054_D.webp"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.15 }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div
        className="absolute bottom-0 left-0 w-80 h-80 opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${Colors.skyBlue100} 0%, transparent 70%)` }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <SectionReveal>
              <h2 className="section-title text-white mb-8" style={{ fontSize: Type.h2 }}>
                {titulo ?? DEFAULTS.titulo}
              </h2>
              <p className="text-white" style={DescriptionCSS.base}>
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

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  )
}
