import SectionReveal from '../ui/SectionReveal'
import VideoBox from '../ui/VideoBox'
import { Colors, DescriptionCSS, Section } from '../../tokens'
import { Hi, Frase } from '../ui/Texto'
import { Words, LineGrow } from '../ui/Anim'

/**
 * CAMBIO 1 — Reconocimiento a los graduados del Tronco Común 2026.
 * Reemplaza a la antigua sección "¡Nos vemos en la ceremonia de clausura!".
 */
const COPY = {
  tituloLinea1: 'RECONOCIMIENTO A LOS GRADUADOS',
  tituloLinea2: 'DEL TRONCO COMÚN 2026',
  videoLabel: 'Video de graduados',
  videoSub: 'Todas las personas graduadas de las unidades de negocio',
}

// Video comprimido para web: 1080p/428 MB → 720p H.264/48 MB, con carátula .webp.
// Se descartó la versión WebM: con este material (fotos fijas) VP9 salía más pesada.
const VIDEO = {
  poster: '/videos/graduados-poster.webp',
  sources: [{ src: '/videos/graduados-tronco-comun-2026.mp4', type: 'video/mp4' }],
}

export default function Graduados() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: Colors.bgSurface }}>
      {/* Fondo: puerto de noche, muy atenuado */}
      <div className="absolute inset-0 z-0">
        <img
          src="/webp/fondo-graduados.webp"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center pointer-events-none select-none kenburns"
          style={{ opacity: 0.22, filter: 'saturate(0.7)' }}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(248,250,252,0.55) 0%, rgba(248,250,252,0.15) 50%, rgba(248,250,252,0.7) 100%)' }}
        />
      </div>

      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center"
        style={{ paddingTop: 'clamp(56px, 7vw, 112px)', paddingBottom: 'clamp(56px, 7vw, 112px)' }}
      >
        <SectionReveal className="w-full">
          <Words
            text={`${COPY.tituloLinea1} ${COPY.tituloLinea2}`}
            className="font-verlag uppercase text-navy"
            style={{ fontSize: Section.title, lineHeight: 1.06, letterSpacing: '-0.4px', color: Colors.seaBlue100, textWrap: 'balance' as React.CSSProperties['textWrap'] }}
          />

          <LineGrow color={Colors.sunrayYellow100} className="mx-auto my-5 md:my-6" delay={0.3} />

          <p className="mx-auto" style={{ ...DescriptionCSS.base, fontSize: Section.desc, lineHeight: Section.descLH, color: Colors.seaBlue100, maxWidth: '72ch', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
            El Instituto Hutchison Ports felicita a quienes concluyeron el <Hi>Tronco Común 2026</Hi>.
          </p>
          <p className="mx-auto mt-5" style={{ ...DescriptionCSS.base, fontSize: Section.desc, lineHeight: Section.descLH, color: Colors.seaBlue100, maxWidth: '72ch', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
            Este logro fortalece nuestra <Hi>comunidad de aprendizaje</Hi>, donde la experiencia se comparte, el <Hi>conocimiento se transforma en valor</Hi> y el talento de nuestra gente impulsa el futuro de la organización.
          </p>
          <Frase className="mt-8 mx-auto frase-lg">
            ¡Felicidades por seguir <span style={{ color: Colors.skyBlue100 }}>aprendiendo, compartiendo y creciendo juntos</span>!
          </Frase>
        </SectionReveal>

        {/* Video sin marco, igual que el resto de los videos de la página */}
        <SectionReveal delay={0.2} className="w-full mt-10 md:mt-14">
          <VideoBox
            poster={VIDEO.poster}
            sources={VIDEO.sources}
            label={COPY.videoLabel}
            sublabel={COPY.videoSub}
            radius={10}
            className="mx-auto"
            style={{ maxWidth: 1000, border: '3px solid #FFFFFF', boxShadow: '0 30px 70px -20px rgba(0,46,109,0.4)' }}
          />
        </SectionReveal>
      </div>
    </section>
  )
}
