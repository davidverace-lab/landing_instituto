import { motion } from 'framer-motion'
import { Type, DescriptionCSS } from '../../tokens'

export default function Hero() {
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
            background: 'linear-gradient(105deg, rgba(0,46,109,0.93) 0%, rgba(0,46,109,0.86) 45%, rgba(0,46,109,0.52) 100%)',
          }}
        />
      </div>

      {/* Logos */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 pt-8 px-6 md:pt-12 md:px-16 lg:pt-14 lg:px-24 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <img
          src="/webp/LogoInstitutoHP-blanco.webp"
          alt="Instituto Hutchison Ports"
          style={{ height: 'clamp(40px, 5vw, 60px)', width: 'auto' }}
          decoding="async"
        />
        <img
          src="/webp/hports.webp"
          alt="Hutchison Ports"
          style={{ height: 'clamp(40px, 5vw, 60px)', width: 'auto' }}
          decoding="async"
        />
      </motion.div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 md:px-10">
        <div className="w-full max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.35 }}
            className="section-title text-white mb-4 md:mb-5"
            style={{ fontSize: Type.h1 }}
          >
            <span className="block">TU EVOLUCIÓN <span className="text-sky-brand">PROFESIONAL</span></span>
            <span className="block">NO SE DETIENE.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.55 }}
            className="mb-5 md:mb-6"
          >
            <p
              className="text-white font-verlag font-bold uppercase"
              style={{ fontSize: 'clamp(13px, 2.2vw, 20px)', lineHeight: 1.6, letterSpacing: '0.06em' }}
            >
              ¡EL PRÓXIMO LÍDER PORTUARIO PUEDES SER TÚ!
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="text-white mb-10 mx-auto max-w-lg"
            style={DescriptionCSS.base}
          >
            En el Instituto Hutchison Ports, navegamos juntos desde la cultura
            hasta el liderazgo de clase mundial.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="flex justify-center"
          >
            <a
              href="https://mxhutchisonports.csod.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full max-w-xs text-sm md:text-base lg:text-lg py-3 md:py-4 px-6"
            >
              CONTINUAR MI FORMACIÓN AQUÍ
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
