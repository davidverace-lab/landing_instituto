import SectionReveal from '../ui/SectionReveal'
import VideoBox from '../ui/VideoBox'
import { Colors, DescriptionCSS, Section } from '../../tokens'
import { Words, LineGrow } from '../ui/Anim'

/**
 * Recorrido del stand del Instituto en el Congreso de Calidad Total 2026.
 * Fondo: el mismo stand, desenfocado y velado en blanco; al centro, el video.
 */
const COPY = {
  titulo: 'NUESTRA PARTICIPACIÓN EN EL CONGRESO DE CALIDAD TOTAL 2026',
  descripcion:
    'Conoce la participación del Instituto Hutchison Ports en este encuentro dedicado al intercambio de experiencias, la innovación y el fortalecimiento de una cultura de excelencia.',
  videoLabel: 'Recorrido por el stand del Instituto',
}

// 1080p60/1.4 GB → 720p30, WebM (VP9) + MP4 de respaldo.
const VIDEO = {
  poster: '/videos/recorrido-stand-poster.webp',
  sources: [
    { src: '/videos/recorrido-stand.webm', type: 'video/webm' },
    { src: '/videos/recorrido-stand.mp4', type: 'video/mp4' },
  ],
}

export default function RecorridoStand() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: Colors.bgSurface }}>
      <div className="absolute inset-0 z-0">
        <img
          src="/webp/fondo-stand.webp"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          style={{ opacity: 0.35 }}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(248,250,252,0.72)' }} />
      </div>

      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center"
        style={{ paddingTop: 'clamp(56px, 7vw, 112px)', paddingBottom: 'clamp(56px, 7vw, 112px)' }}
      >
        <SectionReveal className="w-full">
          <Words
            text={COPY.titulo}
            className="font-verlag uppercase mx-auto"
            style={{ fontSize: Section.title, lineHeight: 1.06, letterSpacing: '-0.3px', color: Colors.seaBlue100, maxWidth: 960, textWrap: 'balance' as React.CSSProperties['textWrap'] }}
          />
          <LineGrow color={Colors.skyBlue100} className="mx-auto my-5 md:my-6" delay={0.3} />
          <p className="mx-auto" style={{ ...DescriptionCSS.base, fontSize: Section.desc, lineHeight: Section.descLH, color: Colors.seaBlue100, maxWidth: '80ch', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
            {COPY.descripcion}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2} className="w-full mt-8 md:mt-12">
          <VideoBox
            poster={VIDEO.poster}
            sources={VIDEO.sources}
            label={COPY.videoLabel}
            radius={10}
            className="mx-auto"
            style={{ maxWidth: 1000, border: '3px solid #FFFFFF', boxShadow: '0 30px 70px -20px rgba(0,46,109,0.4)' }}
          />
        </SectionReveal>
      </div>
    </section>
  )
}
