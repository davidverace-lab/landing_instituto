import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { Colors } from '../../tokens'

interface FinalCTAProps {
  ctaTitulo?: string
  ctaDescripcion?: string
  ctaButtonText?: string
  ctaButtonUrl?: string
  sloganLinea1?: string
  sloganHighlight1?: string
  sloganLinea2?: string
  sloganHighlight2?: string
}

const DEFAULTS = {
  ctaTitulo: '¡TERMINAR MIS MÓDULOS AHORA!',
  ctaDescripcion: 'Solo te tomará unos minutos completar lo que empezaste.',
  ctaButtonText: 'CONTINUAR EN LA PLATAFORMA',
  ctaButtonUrl: 'https://mxhutchisonports.csod.com/',
  sloganLinea1: 'NAVEGANDO JUNTOS DESDE LA',
  sloganHighlight1: 'CULTURA ORGANIZACIONAL',
  sloganLinea2: 'HASTA EL',
  sloganHighlight2: 'LIDERAZGO PROFESIONAL',
}

export default function FinalCTA(_props: FinalCTAProps) {
  // CMS desconectado temporalmente — usar DEFAULTS hardcodeados
  const ctaDescripcion = DEFAULTS.ctaDescripcion
  const ctaButtonUrl = DEFAULTS.ctaButtonUrl
  const sloganLinea1 = DEFAULTS.sloganLinea1
  const sloganHighlight1 = DEFAULTS.sloganHighlight1
  const sloganLinea2 = DEFAULTS.sloganLinea2
  const sloganHighlight2 = DEFAULTS.sloganHighlight2
  return (
    <section className="relative overflow-hidden" style={{ display: 'flex', flexDirection: 'column' }}>

      <div
        className="relative"
        style={{ backgroundColor: Colors.skyBlue100 }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/fondocompleta.jpeg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.15 }}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-[0.9fr_1.4fr] gap-6 md:gap-12 items-center"
          style={{ paddingTop: 'clamp(72px, 10vw, 140px)', paddingBottom: 'clamp(56px, 6vw, 96px)' }}
        >
          {/* Columna izquierda: laptop con efecto 3D que sobresale hacia arriba */}
          <div className="relative flex justify-center md:justify-start">
            <motion.img
              src="/lap.png"
              alt=""
              aria-hidden
              className="pointer-events-none select-none"
              style={{
                width: 'clamp(280px, 70vw, 760px)',
                height: 'auto',
                maxWidth: '100%',
                transform: 'translateY(-12%) perspective(1200px) rotateX(8deg)',
                filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.45))',
              }}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.1 }}
              draggable={false}
            />
          </div>

          {/* Columna derecha: texto + botón */}
          <div className="text-center md:text-left">
            <SectionReveal>
              <h2 className="section-title text-white mb-8">
                {ctaDescripcion}
              </h2>
              <a
                href={ctaButtonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-verlag uppercase inline-block transition-all duration-300 hover:scale-[1.04] active:scale-[0.97]"
                aria-label="Terminar mis módulos ahora"
                style={{
                  background: Colors.seaBlue100,
                  padding: 'clamp(12px, 1.4vw, 18px) clamp(20px, 2.6vw, 36px)',
                  borderRadius: '4px',
                  boxShadow: '0 8px 24px rgba(0,46,109,0.35)',
                  fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                  letterSpacing: '0.06em',
                }}
              >
                <span style={{ color: '#FFFFFF' }}>¡</span>
                <span style={{ color: '#FFC627' }}>TERMINAR </span>
                <span style={{ color: '#FFFFFF' }}>MIS MÓDULOS </span>
                <span style={{ color: '#FFC627' }}>AHORA</span>
                <span style={{ color: '#FFFFFF' }}>!</span>
              </a>
            </SectionReveal>
          </div>
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: Colors.seaBlue100 }}
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-12 md:pt-20 pb-8 md:pb-10 flex flex-col items-center">

          <motion.h2
            className="section-title text-white text-center mb-10 md:mb-14"
            style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)', lineHeight: 1.25 }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 65, damping: 18, delay: 0.15 }}
          >
            {sloganLinea1}<br />
            <span className="text-sky-brand">{sloganHighlight1}</span><br />
            {sloganLinea2} <span className="text-sky-brand">{sloganHighlight2}</span>
          </motion.h2>

          <motion.div
            className="w-full flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-8 border-t border-white/10 pt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 65, damping: 18 }}
          >
            <motion.img
              src="/webp/LogoInstitutoHP-blanco.webp"
              alt="Instituto Hutchison Ports"
              style={{ height: 'clamp(28px, 2.6vw, 36px)', width: 'auto' }}
              loading="lazy"
              decoding="async"
              whileHover={{ y: -4, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />

            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 text-center">
              <p className="font-verlag uppercase text-white text-xs tracking-wider">
                Contacto:
              </p>
              <a
                href="mailto:instituto@hutchisonports.com.mx"
                className="font-montserrat text-white text-xs transition-colors"
              >
                instituto@hutchisonports.com.mx
              </a>
              <a
                href="tel:+522299852500,2569"
                className="font-montserrat text-white text-xs transition-colors"
              >
                229 985 2500 ext. 2569
              </a>
            </div>

            <motion.img
              src="/webp/hports.webp"
              alt="Hutchison Ports"
              style={{ height: 'clamp(28px, 2.6vw, 36px)', width: 'auto' }}
              loading="lazy"
              decoding="async"
              whileHover={{ y: -4, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
