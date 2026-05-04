import { Colors } from '../../tokens'

export default function Footer() {
  return (
    <footer className="relative bg-navy-dark overflow-hidden">
      {/* Diagonal top */}
      <div
        className="absolute top-0 left-0 right-0 h-16"
        style={{ background: Colors.skyBlue100, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
      />

      {/* Main footer content */}
      <div className="relative pt-20 pb-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Banner slogan */}
          <div className="text-center mb-16 py-12 border-y border-sky-brand/20">
            <h2
              className="section-title text-white text-3xl md:text-4xl lg:text-5xl leading-snug"
              style={{ fontFamily: 'Verlag Black, sans-serif', textTransform: 'uppercase' }}
            >
              "NAVEGANDO JUNTOS DESDE LA{' '}
              <span className="text-sky-brand">CULTURA ORGANIZACIONAL</span>
              <br />
              HASTA EL{' '}
              <span className="text-gold">LIDERAZGO PROFESIONAL"</span>
            </h2>
          </div>

          {/* Logos + links row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src="/LogoInstitutoHP-blanco.png"
                alt="Instituto Hutchison Ports"
                className="h-12 w-auto"
              />
              <div className="hidden md:block h-10 w-px bg-white/20" />
              <img
                src="/hutchisonports.png"
                alt="Hutchison Ports"
                className="h-8 w-auto opacity-70"
              />
            </div>

            <a
              href="https://mxhutchisonports.csod.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm px-8 py-3"
            >
              ACCEDER A LA PLATAFORMA
            </a>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-montserrat text-white/40 text-sm text-center md:text-left">
              © 2025 Instituto Hutchison Ports. Todos los derechos reservados.
            </p>
            <p className="font-montserrat text-white/40 text-sm">
              Campaña Última Milla — Culturización 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
