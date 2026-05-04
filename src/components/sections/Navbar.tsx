import { motion, useScroll, useTransform } from 'framer-motion'

export default function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
      style={{
        backgroundColor: `rgba(0,46,109,${bgOpacity.get()})`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <motion.div
        style={{ backgroundColor: `rgba(0,46,109,${bgOpacity})` }}
        className="absolute inset-0 -z-10"
      />
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <img
          src="/webp/LogoInstitutoHP-blanco.webp"
          alt="Instituto Hutchison Ports"
          className="h-10 md:h-12 w-auto"
          loading="lazy"
          decoding="async"
        />
        <a
          href="https://mxhutchisonports.csod.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm px-6 py-3"
        >
          CONTINUAR MI FORMACIÓN
        </a>
      </div>
    </motion.nav>
  )
}
