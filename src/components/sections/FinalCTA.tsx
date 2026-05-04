import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import { ArrowRight } from '@phosphor-icons/react'
import { Colors, Type, DescriptionCSS } from '../../tokens'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden" style={{ display: 'flex', flexDirection: 'column' }}>

      {/* ── Sección CTA — sky-blue de fondo ── */}
      <div
        className="relative overflow-hidden"
        style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', backgroundColor: Colors.skyBlue100 }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/webp/fotos-nacho/DJI_20251014051616_0013_D.webp"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.15 }}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-28 text-center">
          <SectionReveal>
            <h2 className="section-title text-white mb-6" style={{ fontSize: Type.h1 }}>
              ¡TERMINAR MIS<br />
              MÓDULOS AHORA!
            </h2>
            <p className="text-white max-w-2xl mx-auto mb-14" style={DescriptionCSS.base}>
              Solo te tomará unos minutos completar lo que empezaste.
              Tu próximo paso hacia el liderazgo portuario está a un clic de distancia.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <a
              href="https://mxhutchisonports.csod.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                fontFamily: 'Verlag Black, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontSize: Type.button,
                background: Colors.seaBlue100,
                padding: '20px 48px',
              }}
            >
              CONTINUAR EN LA PLATAFORMA
              <ArrowRight size={22} weight="bold" />
            </a>
          </SectionReveal>
        </div>
      </div>

      {/* ── Slogan final — navy con logos arriba ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.seaBlue100 }}
      >
        {/* Foto de fondo sutil */}
        <div className="absolute inset-0 z-0">
          <img
            src="/webp/fotos-nacho/DJI_20251103112308_0211_D.webp"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.15 }}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Logos — absolutos arriba, no afectan el centrado del slogan */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-20 pt-10 px-10 md:px-16 lg:px-24 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 65, damping: 18 }}
        >
          <motion.img
            src="/webp/LogoInstitutoHP-color.webp"
            alt="Instituto Hutchison Ports"
            className="h-16 md:h-20 w-auto"
            loading="lazy"
            decoding="async"
            whileHover={{ y: -4, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          <motion.img
            src="/webp/hports.webp"
            alt="Hutchison Ports"
            className="h-10 md:h-14 w-auto"
            loading="lazy"
            decoding="async"
            whileHover={{ y: -4, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        </motion.div>

        {/* Slogan — centrado real respecto al viewport */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.h2
            className="section-title text-white"
            style={{ fontSize: Type.h1 }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 65, damping: 18, delay: 0.15 }}
          >
            NAVEGANDO JUNTOS DESDE LA<br />
            <span className="text-sky-brand">CULTURA ORGANIZACIONAL</span><br />
            HASTA EL <span className="text-sky-brand">LIDERAZGO PROFESIONAL</span>
          </motion.h2>
        </div>
      </div>
    </section>
  )
}
