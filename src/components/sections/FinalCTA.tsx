import { motion } from 'framer-motion'
import { Colors } from '../../tokens'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden" style={{ display: 'flex', flexDirection: 'column' }}>

      <div
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: Colors.seaBlue100 }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/webp/fondo-graduados.webp"
            alt=""
            aria-hidden
            className="w-full h-full object-cover kenburns"
            style={{ opacity: 0.35, objectPosition: 'center 70%', filter: 'saturate(0.6)' }}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,46,109,0.55) 0%, rgba(0,46,109,0.85) 60%, rgba(0,46,109,0.98) 100%)' }} />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-8 md:pb-10 flex flex-col items-center" style={{ minHeight: 'min(78dvh, 760px)', paddingTop: 'clamp(64px, 9vw, 140px)' }}>

          <motion.div
            className="w-full flex-1 flex items-center justify-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 28, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 55, damping: 16, delay: 0.15 }}
          >
            {/* Slogan original del Instituto, vectorizado desde el arte de alta
                resolución del cliente (`~/Documents/slogan instituto.png`, 4285 px). */}
            <img
              src="/webp/slogan-navegando-juntos.svg"
              alt="Navegando juntos desde la cultura institucional hasta el liderazgo profesional"
              className="float-slow select-none"
              style={{ width: 'min(560px, 82vw)', height: 'auto', filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.35))' }}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </motion.div>

          <motion.div
            className="w-full flex flex-col lg:flex-row items-center lg:justify-between gap-6 lg:gap-8 border-t border-white/10 pt-6"
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

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-x-6 sm:gap-y-1 flex-wrap justify-center text-center">
              <p className="font-verlag uppercase text-white text-xs tracking-wider">
                Contacto:
              </p>
              <a
                href="mailto:instituto@hutchisonports.com.mx"
                className="font-montserrat text-white text-xs transition-colors whitespace-nowrap"
              >
                instituto@hutchisonports.com.mx
              </a>
              <a
                href="tel:+522299852500,2569"
                className="font-montserrat text-white text-xs transition-colors whitespace-nowrap"
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
