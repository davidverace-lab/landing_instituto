import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import ProgressChart, { type ProgressChartItem } from '../ui/ProgressChart'
import { Colors, DescriptionCSS } from '../../tokens'

interface RankingProps {
  titulo?: string
  descripcion?: string
  etiquetaGrafica?: string
  data?: ProgressChartItem[]
}

const DEFAULT_DATA: ProgressChartItem[] = [
  { name: 'CCI',           value: 21, color: Colors.skyBlue80 },
  { name: 'EIT + ECV',     value: 63, color: Colors.aquaGreen100 },
  { name: 'HP LOGISTICS',  value: 67, color: Colors.seaBlue80 },
  { name: 'HP MÉXICO',     value: 66, color: Colors.sunrayYellow100 },
  { name: 'ICAVE',         value: 90, color: Colors.sunsetOrange100 },
  { name: 'LCMT + LCT',    value: 66, color: Colors.seaBlue100 },
  { name: 'TILH',          value: 66, color: Colors.aquaGreen100 },
  { name: 'TIMSA',         value: 33, color: Colors.sunsetOrange100 },
  { name: 'TNG',           value: 94, color: Colors.skyBlue100 },
]

const DEFAULTS = {
  titulo: 'EL PODER DE TU UNIDAD DE NEGOCIO',
  descripcion: '¿Tu Unidad de Negocio está liderando el camino? Tu participación decide la posición de tu equipo en el ranking nacional. Cada módulo completado suma para llevar a tu terminal al primer lugar.',
  etiquetaGrafica: 'Avance por Unidad de Negocio',
}

export default function Ranking({ titulo: _titulo, descripcion, etiquetaGrafica, data }: RankingProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: Colors.bgSurface }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

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
              className="overflow-hidden p-5 md:p-7"
              style={{
                background: Colors.white,
                boxShadow: '0 24px 60px -10px rgba(0,46,109,0.25)',
              }}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            >
              <p
                className="font-verlag uppercase tracking-wider mb-6"
                style={{ fontSize: 'clamp(1rem, 1.4vw, 1.4rem)', color: '#002E6D', letterSpacing: '0.04em' }}
              >
                {etiquetaGrafica ?? DEFAULTS.etiquetaGrafica}
              </p>
              <ProgressChart data={data ?? DEFAULT_DATA} />
            </motion.div>
          </SectionReveal>

        </div>
      </div>

    </section>
  )
}
