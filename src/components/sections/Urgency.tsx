import { motion } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'
import CountdownUnit from '../ui/CountdownUnit'
import SectionReveal from '../ui/SectionReveal'
import { Warning } from '@phosphor-icons/react'
import { Colors, Type, DescriptionCSS } from '../../tokens'

interface UrgencyProps {
  deadline?: string
  titulo?: string
  subtitulo?: string
  panelIzquierdoFecha?: string
  panelIzquierdoTexto?: string
  panelDerechoTitulo?: string
  panelDerechoTexto?: string
}

const DEFAULTS = {
  deadline: '2026-06-30T23:59:59',
  titulo: 'EL TIEMPO CORRE:',
  subtitulo: 'LA ETAPA DE CULTURIZACIÓN LLEGA A SU FIN',
  panelIzquierdoFecha: '30 DE JUNIO',
  panelIzquierdoTexto: 'Al cerrar los módulos el 30 de junio, las puertas a la fase de profesionalización se abrirán sólo para quienes hayan completado el Tronco Común.',
  panelDerechoTitulo: '¡NO TE QUEDES SIN PARTE DE ESTE HISTÓRICO MOMENTO!',
  panelDerechoTexto: 'Tu próxima etapa depende de lo que hagas hoy.',
}

export default function Urgency(_props: UrgencyProps) {
  // CMS desconectado temporalmente — usar DEFAULTS hardcodeados
  const titulo = DEFAULTS.titulo
  const subtitulo = DEFAULTS.subtitulo
  const panelIzquierdoFecha = DEFAULTS.panelIzquierdoFecha
  const panelDerechoTitulo = DEFAULTS.panelDerechoTitulo
  const panelDerechoTexto = DEFAULTS.panelDerechoTexto
  const { days, hours, minutes, seconds } = useCountdown(DEFAULTS.deadline)

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', backgroundColor: '#9ACAEB' }}
    >
      {/* Foto de fondo sutil */}
      <div className="absolute inset-0 z-0">
        <img
          src="/fondotiempo.webp"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.18, objectPosition: 'center 90%' }}
          loading="lazy"
          decoding="async"
        />
      </div>
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${Colors.skyBlue100} 0px, ${Colors.skyBlue100} 1px, transparent 1px, transparent 40px)`,
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 md:px-12 lg:px-20 py-14 md:py-20 lg:py-28 text-center">

        <SectionReveal>
          <h2 className="section-title text-navy mb-3" style={{ fontSize: Type.h2 }}>
            {titulo}
          </h2>
          <h3 className="section-subtitle text-navy mb-6 md:mb-8" style={{ fontSize: Type.h3Card }}>
            {subtitulo}
          </h3>
          <p
            className="text-navy mx-auto mb-10 md:mb-14"
            style={{ ...DescriptionCSS.base, maxWidth: '52rem', textAlign: 'center' }}
          >
            El 30 de junio es la fecha límite para <strong className="font-bold">finalizar los 15 módulos</strong> y formar parte de la <strong className="font-bold">1era Gran Generación de Graduados</strong>.
          </p>
        </SectionReveal>

        {/* Contador — 2 cols en mobile, 4 cols en md+ */}
        <SectionReveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 justify-items-center mb-12 md:mb-16 max-w-2xl mx-auto">
            <CountdownUnit value={days} label="Días" labelColor="text-navy" />
            <CountdownUnit value={hours} label="Horas" labelColor="text-navy" />
            <CountdownUnit value={minutes} label="Minutos" labelColor="text-navy" />
            <CountdownUnit value={seconds} label="Segundos" labelColor="text-navy" />
          </div>
        </SectionReveal>

        {/* Dos paneles */}
        <SectionReveal delay={0.35}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">

            {/* Panel izquierdo */}
            <motion.div
              className="flex flex-col items-center justify-center text-center p-7 md:p-10"
              style={{ background: Colors.skyBlue100 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Warning size={24} color={Colors.sunrayYellow100} weight="fill" />
                <span className="font-verlag text-white uppercase" style={{ fontSize: Type.h3Card }}>
                  {panelIzquierdoFecha
                    .split(/(\d+)/)
                    .map((part, i) =>
                      /^\d+$/.test(part) ? (
                        <span
                          key={i}
                          style={{
                            fontSize: '1.3em',
                            lineHeight: 1,
                            verticalAlign: '-0.02em',
                            display: 'inline-block',
                          }}
                        >
                          {part}
                        </span>
                      ) : (
                        part
                      ),
                    )}
                </span>
              </div>
              <p className="text-white" style={{ ...DescriptionCSS.sm, fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)' }}>
                Al cerrar los módulos el <strong className="font-bold">30 de junio</strong>, las puertas a la <strong className="font-bold">fase de profesionalización</strong> se abrirán sólo para quienes hayan completado el Tronco Común.
              </p>
            </motion.div>

            {/* Panel derecho */}
            <motion.div
              className="flex flex-col items-center justify-center text-center p-7 md:p-10"
              style={{ background: Colors.seaBlue100 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <p
                className="font-verlag text-white uppercase leading-tight mb-4"
                style={{ fontSize: Type.h3Card }}
              >
                {panelDerechoTitulo}
              </p>
              <p className="text-white" style={{ ...DescriptionCSS.sm, fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)' }}>
                {panelDerechoTexto}
              </p>
            </motion.div>

          </div>
        </SectionReveal>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  )
}
