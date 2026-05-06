import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { useInView } from '../../hooks/useInView'
import { Users, ChartBar, Buildings } from '@phosphor-icons/react'
import { Colors, Type, DescriptionCSS } from '../../tokens'
import type { SanityOrganigramaItem, SanityOrganigramaCard } from '../../types/sanity'

const ACCENT = Colors.seaBlue100

interface OrganigramaProps {
  titulo?: string
  topItem?: SanityOrganigramaItem
  leftItem?: SanityOrganigramaCard
  rightItem?: SanityOrganigramaCard
  bottomItem?: SanityOrganigramaItem
}

const DEFAULTS = {
  titulo: 'CÓMO SE CONFORMA EL INSTITUTO HUTCHISON PORTS',
  topItem: {
    label: 'Consejo Directivo Hutchison Ports',
    desc: 'Actúa como instancia de patrocinio, validación y legitimidad corporativa del Instituto, respaldando, validando y habilitando el proyecto a nivel Grupo.',
  },
  leftItem: {
    title: 'RECURSOS HUMANOS',
    desc: 'Garantiza que la oferta formativa responda a las necesidades reales del negocio y contribuya al desarrollo del talento en todos los niveles.',
  },
  rightItem: {
    title: 'SIGA-CALIDAD',
    desc: 'Asegura que la formación impartida sea medible, consistente y alineada con los estándares corporativos de excelencia operativa.',
  },
  bottomItem: {
    desc: 'Centro corporativo de desarrollo del conocimiento, la formación y la profesionalización del talento dentro del Grupo.',
  },
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
      className="flex flex-col items-center text-center max-w-2xl mx-auto"
    >
      {(icon || title) && (
        <div
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 mb-4"
          style={{ background: ACCENT, minWidth: 'min(100%, 360px)' }}
        >
          {icon && <div className="shrink-0">{icon}</div>}
          {title && (
            <span className="font-verlag text-white uppercase tracking-wider" style={{ fontSize: Type.h3Col }}>
              {title}
            </span>
          )}
        </div>
      )}
      <p className="text-white max-w-xl mx-auto" style={DescriptionCSS.base}>{desc}</p>
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

export default function Organigrama({ topItem, leftItem, rightItem, bottomItem }: OrganigramaProps) {
  const { ref: imgRef, inView: imgInView } = useInView()

  const top = { ...DEFAULTS.topItem, ...topItem }
  const left = { ...DEFAULTS.leftItem, ...leftItem }
  const right = { ...DEFAULTS.rightItem, ...rightItem }
  const bottom = { ...DEFAULTS.bottomItem, ...bottomItem }

  return (
    <section
      className="relative section-padding overflow-hidden"
      style={{ backgroundColor: Colors.seaBlue100 }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/LCT.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.12 }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${Colors.seaBlue100} 1px, transparent 1px), linear-gradient(90deg, ${Colors.seaBlue100} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-14">
            <h2 className="section-title text-white">
              <span style={{ display: 'block' }}>CÓMO SE CONFORMA EL</span>
              <span style={{ display: 'block' }}>INSTITUTO HUTCHISON PORTS</span>
            </h2>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="flex justify-center mb-2">
            <div className="max-w-2xl w-full text-center">
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5 mb-4"
                style={{ background: ACCENT }}
              >
                <Buildings size={18} weight="fill" color="#FFC627" />
                <span className="font-verlag text-white uppercase tracking-wider" style={{ fontSize: Type.h3Col }}>
                  {top.label}
                </span>
              </div>
              <p className="text-white max-w-xl mx-auto" style={DescriptionCSS.base}>
                {top.desc}
              </p>
            </div>
          </div>
          <Connector direction="v" inView={imgInView} />
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px_1fr] gap-4 lg:gap-8 items-center mb-2">

          <div className="flex flex-col justify-center">
            <SectionReveal direction="right" delay={0.22}>
              <OrgCard
                icon={<Users size={18} weight="fill" color="#FFC627" />}
                title={left.title}
                desc={left.desc}
                side="left"
              />
            </SectionReveal>
            <Connector direction="h-left" inView={imgInView} />
          </div>

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

          <div className="flex flex-col justify-center">
            <Connector direction="h-right" inView={imgInView} />
            <SectionReveal direction="left" delay={0.22}>
              <OrgCard
                icon={<ChartBar size={18} weight="fill" color="#FFC627" />}
                title={right.title}
                desc={right.desc}
                side="right"
              />
            </SectionReveal>
          </div>
        </div>

        <Connector direction="v" inView={imgInView} />

        <SectionReveal delay={0.38}>
          <div className="flex justify-center">
            <div
              className="max-w-xl w-full flex flex-col items-center gap-3 px-10 py-8 text-center"
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
                {bottom.desc}
              </p>
            </div>
          </div>
        </SectionReveal>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  )
}
