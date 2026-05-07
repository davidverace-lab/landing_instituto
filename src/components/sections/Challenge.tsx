import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'
import { useInView } from '../../hooks/useInView'
import { Colors, Type, DescriptionCSS } from '../../tokens'

interface ChallengeProps {
  graduadosActuales?: number
  meta?: number
  tituloIzquierda?: string
  descripcionIzquierda?: string
}

const DEFAULTS = {
  graduadosActuales: 940,
  meta: 1510,
  tituloIzquierda: '¡HAGAMOS HISTORIA JUNTOS!',
  descripcionIzquierda: 'En Hutchison Ports, no solo movemos carga, impulsamos talento. Nuestra meta es que {meta} colaboradores completen la etapa de Culturización. Tu avance es el motor que nos llevará a este hito histórico.',
}

export default function Challenge({ graduadosActuales, meta, tituloIzquierda, descripcionIzquierda }: ChallengeProps) {
  const { ref, inView } = useInView()

  const currentGraduados = graduadosActuales ?? DEFAULTS.graduadosActuales
  const target = meta ?? DEFAULTS.meta
  const pct = Math.round((currentGraduados / target) * 100)
  const remaining = target - currentGraduados

  return (
    <section className="relative overflow-hidden">

      {/* Imagen de fondo compartida */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Terminal.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.22 }}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Layout: 1 columna en mobile, 2 columnas full-height en desktop */}
      <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-2 lg:min-h-[100dvh]">

        {/* Mitad izquierda: Hagamos Historia */}
        <div className="relative w-full h-full flex flex-col px-6 md:px-16 lg:px-20 pt-20 pb-16 lg:pt-28 lg:pb-28">
          <div className="absolute inset-0" style={{ backgroundColor: Colors.skyBlue100, opacity: 0.88 }} />
          <div className="relative z-10 max-w-lg mx-auto lg:mx-0 w-full">

            <h2
              className="section-title text-navy"
              style={{ fontSize: Type.h2, lineHeight: 1.05, margin: 0, marginBottom: '1.25rem', minHeight: '1.05em' }}
            >
              {tituloIzquierda ?? DEFAULTS.tituloIzquierda}
            </h2>

            <p className="text-white" style={{ ...DescriptionCSS.base }}>
              {descripcionIzquierda
                ? descripcionIzquierda.replace('{meta}', target.toLocaleString())
                : <>En Hutchison Ports, no solo movemos carga, impulsamos talento. Nuestra meta es que <strong className="text-navy">{target.toLocaleString()} colaboradores</strong> completen la etapa de Culturización. Tu avance es el motor que nos llevará a este hito histórico.</>
              }
            </p>

            <div className="mt-8 overflow-hidden rounded-lg shadow-2xl">
              <img
                src="/webp/fotos-nacho/DJI_20251002151728_0052_D.webp"
                alt="Operaciones portuarias Hutchison Ports"
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

          </div>
        </div>

        {/* Mitad derecha: Graduados */}
        <div className="relative w-full h-full flex flex-col px-6 md:px-16 lg:px-20 pt-20 pb-16 lg:pt-28 lg:pb-28">
          <div className="absolute inset-0" style={{ backgroundColor: Colors.seaBlue100, opacity: 0.92 }} />
          <div className="relative z-10 max-w-lg mx-auto lg:mx-0 w-full">
            <div ref={ref} className="flex flex-col gap-5">

              <h2
                className="section-title text-sky-brand"
                style={{ fontSize: Type.h2, lineHeight: 1.05, margin: 0, letterSpacing: '0.02em', minHeight: '1.05em' }}
              >
                Graduados actuales
              </h2>

              <AnimatedCounter
                target={currentGraduados}
                className="font-verlag leading-none block"
                style={{ fontSize: Type.statLg, letterSpacing: '-2px' }}
                duration={2500}
                color={Colors.sunrayYellow100}
              />

              <div className="flex items-baseline gap-3">
                <span className="font-verlag text-white uppercase" style={{ fontSize: 'clamp(1.2rem, 2vw, 2rem)', letterSpacing: '0.18em' }}>
                  Meta:
                </span>
                <span className="font-verlag font-bold text-white" style={{ fontSize: 'clamp(1.2rem, 2vw, 2rem)' }}>
                  {target.toLocaleString()}
                </span>
              </div>

              <motion.div
                className="cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="h-5 bg-white/10 w-full overflow-hidden rounded-full">
                  <motion.div
                    className="h-full bg-sky-brand rounded-full flex items-center justify-end pr-3"
                    initial={{ width: '0%' }}
                    animate={{ width: inView ? `${pct}%` : '0%' }}
                    transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <span className="font-montserrat font-bold text-white text-sm md:text-base">0</span>
                  <span className="font-montserrat font-bold text-white text-sm md:text-base">{pct}% alcanzado</span>
                  <span className="font-montserrat font-bold text-white text-sm md:text-base">{target.toLocaleString()}</span>
                </div>
              </motion.div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-white whitespace-nowrap" style={DescriptionCSS.base}>
                  Ya somos{' '}
                  <span className="text-sky-brand font-semibold">{currentGraduados.toLocaleString()}</span>.{' '}
                  Faltan{' '}
                  <span className="text-white font-bold">{remaining.toLocaleString()}</span>{' '}
                  para alcanzar los {target.toLocaleString()}.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
