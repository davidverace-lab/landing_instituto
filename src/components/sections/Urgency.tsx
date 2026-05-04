import { motion } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'
import CountdownUnit from '../ui/CountdownUnit'
import SectionReveal from '../ui/SectionReveal'
import { Warning } from '@phosphor-icons/react'
import { Colors, Type, DescriptionCSS } from '../../tokens'

const DEADLINE = '2026-06-30T23:59:59'

export default function Urgency() {
  const { days, hours, minutes, seconds } = useCountdown(DEADLINE)

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', backgroundColor: '#9ACAEB' }}
    >
      {/* Foto de fondo sutil */}
      <div className="absolute inset-0 z-0">
        <img
          src="/webp/fotos-nacho/DJI_20251010153734_0002_D.webp"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.18 }}
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 text-center">
        <SectionReveal>
          <h2 className="section-title text-white mb-4" style={{ fontSize: Type.h2 }}>
            EL TIEMPO CORRE:
          </h2>
          <h3 className="section-subtitle text-navy mb-14" style={{ fontSize: Type.h3Card }}>
            LA ETAPA DE CULTURIZACIÓN LLEGA A SU FIN
          </h3>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-16">
            <CountdownUnit value={days} label="Días" labelColor="text-navy" />
            <span className="font-verlag text-4xl text-navy mb-8">:</span>
            <CountdownUnit value={hours} label="Horas" labelColor="text-navy" />
            <span className="font-verlag text-4xl text-navy mb-8">:</span>
            <CountdownUnit value={minutes} label="Minutos" labelColor="text-navy" />
            <span className="font-verlag text-4xl text-navy mb-8">:</span>
            <CountdownUnit value={seconds} label="Segundos" labelColor="text-navy" />
          </div>
        </SectionReveal>

        {/* Dos paneles — colores divididos */}
        <SectionReveal delay={0.35}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">

            {/* Panel izquierdo: sky-brand */}
            <motion.div
              className="flex flex-col items-center justify-center text-center p-8 md:p-10"
              style={{ background: Colors.skyBlue100 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Warning size={24} color={Colors.sunrayYellow100} weight="fill" />
                <span className="font-verlag text-white uppercase" style={{ fontSize: Type.h3Card }}>
                  30 DE JUNIO
                </span>
              </div>
              <p className="text-white" style={DescriptionCSS.sm}>
                Al cerrar la plataforma, las puertas a la fase de{' '}
                <strong>profesionalización</strong> se abrirán solo para quienes
                hayan completado el <strong>Tronco Común</strong>.
              </p>
            </motion.div>

            {/* Panel derecho: navy */}
            <motion.div
              className="flex flex-col items-center justify-center text-center p-8 md:p-10"
              style={{ background: Colors.seaBlue100 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <motion.p
                className="font-verlag text-sky-light leading-tight mb-4"
                style={{ fontSize: Type.h3Card }}
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                ¡NO TE QUEDES ATRÁS!
              </motion.p>
              <p className="text-white" style={DescriptionCSS.sm}>
                Tu próxima etapa depende de lo que hagas hoy.
              </p>
            </motion.div>

          </div>
        </SectionReveal>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  )
}
