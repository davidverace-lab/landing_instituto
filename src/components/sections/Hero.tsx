import { motion } from 'framer-motion'
import { Type } from '../../tokens'

interface HeroProps {
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
}

const DEFAULTS = {
  title: 'TU EVOLUCIÓN PROFESIONAL NO SE DETIENE. ¡EL PRÓXIMO LÍDER PORTUARIO PUEDES SER TÚ!',
  subtitle: 'En el Instituto Hutchison Ports, navegamos juntos desde la cultura institucional hasta el liderazgo profesional.',
  buttonText: 'CONTINUAR MI FORMACIÓN AQUÍ',
  buttonUrl: 'https://mxhutchisonports.csod.com/',
}

export default function Hero(_props: HeroProps) {
  // CMS desconectado temporalmente — usar DEFAULTS hardcodeados
  const t = DEFAULTS.title
  const s = DEFAULTS.subtitle
  const b = DEFAULTS.buttonText
  const url = DEFAULTS.buttonUrl

  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-navy-dark">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/webp/fotofondo.webp"
          alt=""
          className="w-full h-full object-cover object-center"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,46,109,0.92) 0%, rgba(0,46,109,0.55) 45%, rgba(0,46,109,0.10) 100%)',
          }}
        />
      </div>

      {/* Logos */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 pt-6 px-5 md:pt-12 md:px-16 lg:pt-14 lg:px-24 flex items-center justify-between gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <img
          src="/webp/LogoInstitutoHP-blanco.webp"
          alt="Instituto Hutchison Ports"
          style={{ height: 'clamp(32px, 5vw, 60px)', width: 'auto', maxWidth: '40%' }}
          decoding="async"
        />
        <img
          src="/webp/hports.webp"
          alt="Hutchison Ports"
          style={{ height: 'clamp(32px, 5vw, 60px)', width: 'auto', maxWidth: '40%' }}
          decoding="async"
        />
      </motion.div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 md:px-10 pt-24 md:pt-28 pb-12">
        <div className="w-full max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.35 }}
            className="font-verlag uppercase mb-4 md:mb-5"
            style={{ fontSize: Type.h2, lineHeight: 1.05, letterSpacing: '-0.01em', color: '#FFFFFF', textWrap: 'balance' as React.CSSProperties['textWrap'] }}
          >
            {t}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.55 }}
            className="mb-10"
          >
            <p
              className="text-white mx-auto"
              style={{ fontSize: 'clamp(1.2rem, 1.6vw, 1.55rem)', lineHeight: 1.65, letterSpacing: '0.01em', fontFamily: '"Montserrat", sans-serif', fontWeight: 400, maxWidth: '52ch', textWrap: 'balance' }}
            >
              {s}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="flex justify-center"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-block text-sm md:text-base lg:text-lg py-3 px-8 md:py-4 md:px-12"
            >
              {b}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
