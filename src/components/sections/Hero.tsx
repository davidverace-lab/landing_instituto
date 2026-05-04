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

      {/* Logos — posición absoluta, no afectan el centrado del texto */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 pt-8 px-10 md:px-16 lg:px-24 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <img
          src="/webp/LogoInstitutoHP-blanco.webp"
          alt="Instituto Hutchison Ports"
          className="h-12 md:h-14 w-auto"
          decoding="async"
        />
        <img
          src="/webp/hports.webp"
          alt="Hutchison Ports"
          className="h-12 md:h-14 w-auto"
          decoding="async"
        />
      </motion.div>

      {/* Contenido — centrado real respecto al viewport */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="w-full max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.35 }}
            className="section-title text-white mb-5"
            style={{ fontSize: Type.h1 }}
          >
            <span className="whitespace-nowrap">TU EVOLUCIÓN <span className="text-sky-brand">PROFESIONAL</span></span><br />
            <span className="whitespace-nowrap">NO SE DETIENE.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.55 }}
            className="mb-6"
          >
            <p className="text-white font-verlag md:whitespace-nowrap" style={{ fontSize: 'clamp(11px, 1.15vw, 17px)', lineHeight: 1.75, textTransform: 'uppercase', letterSpacing: '0.02em' }}>¡EL PRÓXIMO LÍDER PORTUARIO PUEDES SER TÚ!</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="text-white mb-12"
            style={DescriptionCSS.base}
          >
            En el Instituto Hutchison Ports, navegamos juntos desde la cultura
            hasta el liderazgo de clase mundial.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
          >
            <a
              href="https://mxhutchisonports.csod.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-base md:text-lg"
            >
              CONTINUAR MI FORMACIÓN AQUÍ
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
