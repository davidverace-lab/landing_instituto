import { Colors } from '../../tokens'

export default function Footer() {
  return (
    <footer className="relative bg-navy-dark overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-16"
        style={{ background: Colors.skyBlue100, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
      />

      <div className="relative pt-20 pb-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <img
                src="/webp/hports.webp"
                alt="Hutchison Ports"
                className="h-10 w-auto mb-3"
              />
              <img
                src="/webp/LogoInstitutoHP-blanco.webp"
                alt="Instituto Hutchison Ports"
                className="h-12 w-auto mb-5"
              />
              <p className="font-montserrat text-white/70 text-sm max-w-xs">
                Hub digital para colaboradores de Hutchison Ports.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end text-center md:text-right gap-2">
              <p className="font-verlag uppercase text-white text-sm tracking-wider mb-1">
                Contacto
              </p>
              <a
                href="mailto:instituto@hutchisonports.com.mx"
                className="font-montserrat text-white/80 hover:text-white text-sm transition-colors"
              >
                instituto@hutchisonports.com.mx
              </a>
              <a
                href="tel:+522299852500,2569"
                className="font-montserrat text-white/80 hover:text-white text-sm transition-colors"
              >
                229 985 2500 ext. 2569
              </a>
            </div>

          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="font-montserrat text-white/40 text-sm text-center">
              © 2026 Hutchison Ports. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
