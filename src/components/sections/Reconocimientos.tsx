import SectionReveal from '../ui/SectionReveal'
import VideoBox from '../ui/VideoBox'
import { Colors, DescriptionCSS, Section } from '../../tokens'

/**
 * CAMBIO 7 — Entrega de reconocimientos del Tronco Común 2026.
 * Composición del arte del cliente: fondo claro, el video de la ceremonia a la
 * izquierda con su portada real, y a la derecha el antetítulo, el título en azul
 * marino y el texto. El video se reproduce en su sitio, sin botón aparte.
 */
const COPY = {
  overline: 'Material audiovisual',
  titulo: 'ENTREGA DE RECONOCIMIENTOS DEL TRONCO COMÚN 2026',
  descripcion: 'Conoce los momentos más destacados de las ceremonias realizadas en nuestras unidades de negocio.',
}

const VIDEO = {
  poster: '/videos/reconocimientos-tng-poster.webp',
  sources: [
    { src: '/videos/reconocimientos-tng.webm', type: 'video/webm' },
    { src: '/videos/reconocimientos-tng.mp4', type: 'video/mp4' },
  ],
}

export default function Reconocimientos() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#F4F6FA' }}>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: 'clamp(56px, 7vw, 104px)', paddingBottom: 'clamp(56px, 7vw, 104px)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-14 items-center">

          <SectionReveal direction="right">
            <VideoBox
              poster={VIDEO.poster}
              sources={VIDEO.sources}
              label="Entrega de reconocimientos"
            />
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="font-montserrat uppercase text-navy" style={{ fontSize: '0.72rem', letterSpacing: '0.22em', fontWeight: 600, margin: 0 }}>
              {COPY.overline}
            </p>
            <h2 className="font-verlag uppercase text-navy mt-3" style={{ fontSize: Section.title, lineHeight: 1.06, letterSpacing: '-0.3px', textWrap: 'balance' as React.CSSProperties['textWrap'] }}>
              {COPY.titulo}
            </h2>
            <p className="mt-5" style={{ ...DescriptionCSS.sm, fontSize: Section.desc, lineHeight: Section.descLH, color: Colors.seaBlue100, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
              {COPY.descripcion}
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
