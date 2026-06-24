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
  { name: 'CCI',           value: 38,  completados: 30,  total: 78,  color: Colors.skyBlue80,    logos: ['/logos/cci.svg'] },
  { name: 'EIT + ECV',     value: 93,  completados: 276, total: 298, color: Colors.aquaGreen100, logos: ['/logos/eit.svg', '/logos/ecv.svg'] },
  { name: 'HP LOGISTICS',  value: 90,  completados: 9,   total: 10,  color: Colors.seaBlue80,    logos: ['/logos/hp-logistics.svg'] },
  { name: 'HP MÉXICO',     value: 89,  completados: 142, total: 159, color: Colors.sunrayYellow100, logos: ['/logos/hutchisonports.webp'] },
  { name: 'ICAVE',         value: 98,  completados: 339, total: 346, color: Colors.sunsetOrange100, logos: ['/logos/icave.svg'] },
  { name: 'LCMT + LCT',    value: 91,  completados: 204, total: 223, color: Colors.seaBlue100,   logos: ['/logos/lcmt.svg', '/logos/lct.svg'] },
  { name: 'TILH',          value: 84,  completados: 56,  total: 67,  color: Colors.aquaGreen100, logos: ['/logos/tilh.svg'] },
  { name: 'TIMSA',         value: 98,  completados: 184, total: 187, color: Colors.sunsetOrange100, logos: ['/logos/timsa.svg'] },
  { name: 'TNG',           value: 100, completados: 131, total: 131, color: Colors.skyBlue100,   logos: ['/logos/tng.svg'] },
]

const DEFAULTS = {
  titulo: 'EL PODER DE TU UNIDAD DE NEGOCIO',
  etiquetaGrafica: 'Avance por Unidad de Negocio',
}

export default function Ranking(_props: RankingProps) {
  // CMS desconectado temporalmente — usar DEFAULTS hardcodeados
  const etiquetaGrafica = DEFAULTS.etiquetaGrafica
  const data = DEFAULT_DATA
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: Colors.bgSurface }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:pl-8 lg:pr-12 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 md:gap-12 items-center">

          <div className="lg:pr-2">
            <SectionReveal>
              <h2 className="section-title mb-6 md:mb-8" style={{ lineHeight: 1.1, color: '#002E6D', textWrap: 'balance' as React.CSSProperties['textWrap'] }}>
                <span className="block">EL PODER DE TU</span>
                <span className="block">UNIDAD DE NEGOCIO</span>
              </h2>
              <p style={{ ...DescriptionCSS.base, color: '#002E6D', textAlign: 'left', textWrap: 'pretty' as React.CSSProperties['textWrap'], margin: 0 }}>
                Estamos en la recta final y el verdadero triunfo es <strong className="font-bold">llegar juntos a la meta.</strong> ¿Tu Unidad de Negocio está liderando el camino?
              </p>
              <p style={{ ...DescriptionCSS.base, color: '#002E6D', textAlign: 'left', textWrap: 'pretty' as React.CSSProperties['textWrap'], margin: 0 }}>
                Tu compromiso individual es la fuerza que decide el avance de tu Unidad de Negocios. ¡Cada módulo finalizado aporta al liderazgo del Grupo Hutchison Ports! Acompaña a tus compañeros en esta experiencia y lleguemos juntos a esta primera etapa.
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
                {etiquetaGrafica}
              </p>
              <ProgressChart data={data} />
            </motion.div>
          </SectionReveal>

        </div>
      </div>

    </section>
  )
}
