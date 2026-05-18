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
  graduadosActuales: 1284,
  meta: 1507,
  tituloIzquierda: 'NAVEGANDO HACIA LA EXCELENCIA',
}

export default function Challenge(_props: ChallengeProps) {
  // CMS desconectado temporalmente — usar DEFAULTS hardcodeados
  const { ref, inView } = useInView()

  const currentGraduados = DEFAULTS.graduadosActuales
  const target = DEFAULTS.meta
  const tituloIzquierda = DEFAULTS.tituloIzquierda
  const pct = Math.round((currentGraduados / target) * 100)

  return (
    <section className="relative overflow-hidden">

      {/* Imagen de fondo compartida */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Terminal.webp"
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
        <div className="relative w-full h-full flex flex-col items-center justify-center px-5 md:px-12 lg:px-20 pt-14 md:pt-20 pb-12 md:pb-16 lg:pt-28 lg:pb-28">
          <div className="absolute inset-0" style={{ backgroundColor: Colors.skyBlue100, opacity: 0.88 }} />
          <div className="relative z-10 max-w-2xl mx-auto w-full text-center">

            <h2
              className="section-title text-navy"
              style={{ fontSize: Type.h2, lineHeight: 1.05, margin: 0, marginBottom: '1.25rem', textWrap: 'balance' as React.CSSProperties['textWrap'] }}
            >
              {tituloIzquierda}
            </h2>

            <p className="text-white" style={{ ...DescriptionCSS.base, textWrap: 'wrap' as React.CSSProperties['textWrap'] }}>
              El Instituto Hutchison Ports <strong className="text-navy font-bold">impulsa el desarrollo integral de sus colaboradores</strong> mediante programas de aprendizaje digital. Nuestra meta es consolidar una comunidad de conocimiento que fortalezca sus competencias en todos los niveles, impulsando la competitividad y el liderazgo de Hutchison Ports en el sector portuario.
            </p>

          </div>
        </div>

        {/* Mitad derecha: Graduados */}
        <div className="relative w-full h-full flex flex-col items-center justify-center px-5 md:px-12 lg:px-20 pt-14 md:pt-20 pb-12 md:pb-16 lg:pt-28 lg:pb-28">
          <div className="absolute inset-0" style={{ backgroundColor: Colors.seaBlue100, opacity: 0.92 }} />
          <div className="relative z-10 max-w-lg mx-auto w-full text-center">
            <div ref={ref} className="flex flex-col items-center gap-5">

              <h2
                className="section-title text-sky-brand"
                style={{ fontSize: Type.h2, lineHeight: 1.05, margin: 0, letterSpacing: '0.02em', textWrap: 'balance' as React.CSSProperties['textWrap'] }}
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

              <div className="flex items-baseline justify-center gap-3">
                <span className="font-verlag text-white uppercase" style={{ fontSize: 'clamp(1.2rem, 2vw, 2rem)', letterSpacing: '0.18em' }}>
                  Objetivo:
                </span>
                <span className="font-verlag font-bold text-white" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', lineHeight: 1 }}>
                  {target.toLocaleString()}
                </span>
              </div>

              <motion.div
                className="cursor-pointer w-full"
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
                <div className="flex justify-between mt-3 w-full">
                  <span className="font-montserrat font-bold text-white text-sm md:text-base">0</span>
                  <span className="font-montserrat font-bold text-white text-sm md:text-base">{pct}% alcanzado</span>
                  <span className="font-montserrat font-bold text-white text-sm md:text-base">{target.toLocaleString()}</span>
                </div>
              </motion.div>

              <div className="pt-3 border-t border-white/10 w-full">
                <p className="text-white w-full" style={DescriptionCSS.base}>
                  Ya somos{' '}
                  <span className="text-sky-brand font-semibold">{currentGraduados.toLocaleString()}</span>{' '}
                  graduados.
                  <br />
                  Tu avance es el motor que nos llevará a este hito histórico.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
