import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import AnimatedCounter from '../ui/AnimatedCounter'
import { useInView } from '../../hooks/useInView'
import { Colors, Type, DescriptionCSS } from '../../tokens'

const CURRENT_GRADUADOS = 940
const TARGET = 1510

export default function Challenge() {
  const { ref, inView } = useInView()
  const pct = Math.round((CURRENT_GRADUADOS / TARGET) * 100)
  const remaining = TARGET - CURRENT_GRADUADOS

  return (
    <section className="relative overflow-hidden">

      {/* Imagen de fondo compartida */}
      <div className="absolute inset-0 z-0">
        <img
          src="/webp/fotos-nacho/DSC03413.webp"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.22 }}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Layout: 1 columna en mobile, 2 columnas en desktop */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:min-h-[100dvh]">

        {/* Mitad izquierda: Hagamos Historia */}
        <div className="relative w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-20 py-20 lg:py-28">
          <div className="absolute inset-0" style={{ backgroundColor: Colors.skyBlue100, opacity: 0.88 }} />
          <div className="relative z-10 flex flex-col gap-6 max-w-lg mx-auto lg:mx-0">

            <SectionReveal>
              <h2 className="section-title text-navy leading-tight" style={{ fontSize: Type.h2 }}>
                ¡HAGAMOS <span className="text-white">HISTORIA</span><br />
                JUNTOS!
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <p className="text-white" style={DescriptionCSS.base}>
                En Hutchison Ports, no solo movemos carga, impulsamos talento.
                Nuestra meta es que{' '}
                <strong className="text-navy">{TARGET.toLocaleString()} colaboradores</strong> completen
                la etapa de Culturización. Tu avance es el motor que nos llevará
                a este hito histórico.
              </p>
            </SectionReveal>

          </div>
        </div>

        {/* Mitad derecha: Graduados */}
        <div className="relative w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-20 py-16 lg:py-28">
          <div className="absolute inset-0" style={{ backgroundColor: Colors.seaBlue100, opacity: 0.92 }} />
          <div className="relative z-10 max-w-lg mx-auto lg:mx-0 w-full">
            <SectionReveal direction="left" delay={0.2}>
              <div ref={ref} className="flex flex-col gap-5">

                {/* Label */}
                <p
                  className="font-verlag text-sky-brand uppercase leading-tight"
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 3.2rem)', letterSpacing: '0.02em' }}
                >
                  Graduados actuales
                </p>

                {/* Número principal */}
                <AnimatedCounter
                  target={CURRENT_GRADUADOS}
                  className="font-verlag leading-none block"
                  style={{ fontSize: Type.statLg, letterSpacing: '-2px' }}
                  duration={2500}
                  color={Colors.sunrayYellow100}
                />

                {/* Meta */}
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-verlag text-white uppercase"
                    style={{ fontSize: 'clamp(1.2rem, 2vw, 2rem)', letterSpacing: '0.18em' }}
                  >
                    Meta:
                  </span>
                  <span className="font-verlag font-bold text-white" style={{ fontSize: 'clamp(1.2rem, 2vw, 2rem)' }}>
                    {TARGET.toLocaleString()}
                  </span>
                </div>

                {/* Barra de progreso */}
                <div>
                  <div className="h-3 bg-white/10 w-full overflow-hidden rounded-full">
                    <motion.div
                      className="h-full bg-sky-brand rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: inView ? `${pct}%` : '0%' }}
                      transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-montserrat text-white text-xs md:text-sm">0</span>
                    <span className="font-montserrat font-bold text-white text-xs md:text-sm">{pct}% alcanzado</span>
                    <span className="font-montserrat text-white text-xs md:text-sm">{TARGET.toLocaleString()}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white" style={DescriptionCSS.base}>
                    Ya somos{' '}
                    <span className="text-sky-brand font-semibold">{CURRENT_GRADUADOS.toLocaleString()}</span>.{' '}
                    Faltan{' '}
                    <span className="text-white font-bold">{remaining.toLocaleString()}</span>{' '}
                    para alcanzar los {TARGET.toLocaleString()}.
                  </p>
                </div>

              </div>
            </SectionReveal>
          </div>
        </div>

      </div>
    </section>
  )
}
