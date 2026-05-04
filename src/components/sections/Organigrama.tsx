import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { useInView } from '../../hooks/useInView'
import { Users, ChartBar, Buildings } from '@phosphor-icons/react'
import { Colors, Type, DescriptionCSS } from '../../tokens'

const ACCENT = Colors.seaBlue100

const TOP_ITEM = {
  label: 'Consejo Directivo Hutchison Ports',
  desc: 'Actúa como instancia de patrocinio, validación y legitimidad corporativa del Instituto, respaldando, validando y habilitando el proyecto a nivel Grupo.',
}

const LEFT_ITEM = {
  icon: <Users size={32} weight="duotone" color={ACCENT} />,
  title: 'RECURSOS HUMANOS',
  desc: 'Garantiza que la oferta formativa responda a las necesidades reales del negocio y contribuya al desarrollo del talento en todos los niveles.',
}

const RIGHT_ITEM = {
  icon: <ChartBar size={32} weight="duotone" color={ACCENT} />,
  title: 'SIGA-CALIDAD',
  desc: 'Asegura que la formación impartida sea medible, consistente y alineada con los estándares corporativos de excelencia operativa.',
}

const BOTTOM_ITEM = {
  desc: 'Centro corporativo de desarrollo del conocimiento, la formación y la profesionalización del talento dentro del Grupo.',
}

function OrgCard({ icon, title, desc, side }: {
  icon?: React.ReactNode
  title?: string
  desc: string
  side?: 'left' | 'right'
}) {
  const { ref, inView } = useInView()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -28 : side === 'right' ? 28 : 0, y: side ? 0 : 20 }}
      animate={inView ? { opacity: 0.99, x: 0, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 75, damping: 20 }}
      whileHover={{ y: -4 }}
      className="flex flex-col gap-4 p-6 md:p-7"
      style={{
        background: 'rgba(0,46,109,0.60)',
        borderLeft: side === 'left' ? `3px solid ${ACCENT}` : undefined,
        borderRight: side === 'right' ? `3px solid ${ACCENT}` : undefined,
      }}
    >
      {icon && <div>{icon}</div>}
      {title && (
        <h4 className="font-verlag text-white leading-tight" style={{ fontSize: Type.h3Col }}>{title}</h4>
      )}
      <p className="text-white" style={DescriptionCSS.base}>{desc}</p>
    </motion.div>
  )
}

function Connector({ direction, inView: visible }: { direction: 'v' | 'h-left' | 'h-right'; inView: boolean }) {
  if (direction === 'v') return (
    <div className="flex justify-center my-1">
      <motion.div
        className="w-px bg-navy"
        initial={{ height: 0 }}
        animate={visible ? { height: 36 } : { height: 0 }}
        transition={{ duration: 0.45, delay: 0.4 }}
      />
    </div>
  )
  return (
    <div className={`hidden lg:flex mb-1 ${direction === 'h-left' ? 'justify-end' : 'justify-start'}`}>
      <motion.div
        className="h-px bg-navy"
        initial={{ width: 0 }}
        animate={visible ? { width: '100%' } : { width: 0 }}
        transition={{ duration: 0.55, delay: 0.5 }}
      />
    </div>
  )
}

export default function Organigrama() {
  const { ref: imgRef, inView: imgInView } = useInView()

  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{ backgroundColor: Colors.seaBlue100 }}
    >
      {/* Foto de fondo sutil */}
      <div className="absolute inset-0 z-0">
        <img
          src="/webp/fotos-nacho/DSC03386.webp"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.12 }}
          loading="lazy"
          decoding="async"
        />
      </div>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${Colors.seaBlue100} 1px, transparent 1px), linear-gradient(90deg, ${Colors.seaBlue100} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <SectionReveal>
          <div className="text-center mb-14">
            <h2 className="section-title text-white" style={{ fontSize: Type.h2 }}>
              CONOCE CÓMO SE CONFORMA EL<br />
              INSTITUTO HUTCHISON PORTS
            </h2>
          </div>
        </SectionReveal>

        {/* TOP: Consejo Directivo */}
        <SectionReveal delay={0.1}>
          <div className="flex justify-center mb-2">
            <div className="max-w-2xl w-full text-center">
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5 mb-4"
                style={{ background: ACCENT }}
              >
                <Buildings size={18} weight="fill" color="#FFFFFF" />
                <span className="font-verlag text-white uppercase tracking-wider" style={{ fontSize: Type.h3Col }}>
                  {TOP_ITEM.label}
                </span>
              </div>
              <p className="text-white max-w-xl mx-auto" style={DescriptionCSS.base}>
                {TOP_ITEM.desc}
              </p>
            </div>
          </div>
          <Connector direction="v" inView={imgInView} />
        </SectionReveal>

        {/* MIDDLE: Left — Vector — Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px_1fr] gap-4 lg:gap-8 items-center mb-2">

          {/* Left: Recursos Humanos */}
          <div>
            <SectionReveal direction="right" delay={0.22}>
              <OrgCard icon={LEFT_ITEM.icon} title={LEFT_ITEM.title} desc={LEFT_ITEM.desc} side="left" />
            </SectionReveal>
            <Connector direction="h-left" inView={imgInView} />
          </div>

          {/* Center: Vector */}
          <div className="flex justify-center" ref={imgRef}>
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,155,222,0.28) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.75, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.img
                src="/webp/Vector organigrama.webp"
                alt="Organigrama Instituto Hutchison Ports"
                className="relative w-72 md:w-80 lg:w-[380px] h-auto drop-shadow-2xl"
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: 0.82 }}
                animate={imgInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 65, damping: 18, delay: 0.15 }}
                whileHover={{ y: -8, scale: 1.03 }}
              />
            </div>
          </div>

          {/* Right: SIGA-Calidad */}
          <div>
            <Connector direction="h-right" inView={imgInView} />
            <SectionReveal direction="left" delay={0.22}>
              <OrgCard icon={RIGHT_ITEM.icon} title={RIGHT_ITEM.title} desc={RIGHT_ITEM.desc} side="right" />
            </SectionReveal>
          </div>
        </div>

        {/* Vertical connector to bottom */}
        <Connector direction="v" inView={imgInView} />

        {/* BOTTOM: Instituto logo + description */}
        <SectionReveal delay={0.38}>
          <div className="flex justify-center">
            <div
              className="max-w-xl w-full flex flex-col items-center gap-5 px-10 py-10 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,46,109,0.80) 0%, rgba(0,46,109,0.60) 100%)',
                border: `2px solid ${ACCENT}`,
                boxShadow: '0 0 50px rgba(0,155,222,0.12)',
              }}
            >
              <motion.img
                src="/webp/LogoInstitutoHP-blanco.webp"
                alt="Instituto Hutchison Ports"
                className="h-14 w-auto"
                loading="lazy"
                decoding="async"
                animate={{ filter: ['brightness(1)', 'brightness(1.18)', 'brightness(1)'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="h-px w-16 bg-navy" />
              <p className="text-white" style={DescriptionCSS.base}>
                {BOTTOM_ITEM.desc}
              </p>
            </div>
          </div>
        </SectionReveal>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  )
}
