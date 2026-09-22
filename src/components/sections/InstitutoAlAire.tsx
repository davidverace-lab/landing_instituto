import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import VideoBox from '../ui/VideoBox'
import { Colors, DescriptionCSS, Section } from '../../tokens'
import { Hi } from '../ui/Texto'

/**
 * CAMBIO 6 — Próximamente: Instituto al Aire, el nuevo noticiero del sistema portuario.
 * El texto a la izquierda y a la derecha la entrevista al Ing. Lecona grabada en el
 * set del Congreso de Calidad Total, separados por el chevron azul del arte.
 */
const COPY = {
  chip: 'Próximamente',
  claimLinea1: 'EL NUEVO NOTICIERO',
  claimLinea2: 'DEL SISTEMA PORTUARIO',
  marca: 'Hutchison Ports.',
  pilares: ['Información', 'Actualidad', 'Conexión'],
  videoLabel: 'Entrevista al Ing. Lecona',
  videoSub: 'Instituto HP al Aire',
}

// 1080p60/1.1 GB → 720p30, WebM (VP9) + MP4 de respaldo.
const VIDEO = {
  poster: '/videos/entrevista-lecona-poster.webp',
  sources: [
    { src: '/videos/entrevista-lecona.webm', type: 'video/webm' },
    { src: '/videos/entrevista-lecona.mp4', type: 'video/mp4' },
  ],
}

/** Chevron "<" que marca el corte entre el texto y el recuadro. */
const CHEVRON = 'polygon(18% 0, 100% 0, 100% 100%, 18% 100%, 0 50%)'

export default function InstitutoAlAire() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#03153A' }}>
      {/* Puntos de red sutiles en toda la sección */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ opacity: 0.12, backgroundImage: `radial-gradient(${Colors.skyBlue100} 1px, transparent 1px)`, backgroundSize: '26px 26px' }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]" style={{ minHeight: 'min(88dvh, 820px)' }}>

        {/* ── Texto, todo centrado ── */}
        <div className="relative flex items-center justify-center px-6 md:px-12 lg:px-10 py-16 md:py-20 lg:py-24 order-2 lg:order-1">
          <SectionReveal className="w-full flex flex-col items-center text-center" style={{ maxWidth: 700 }}>
            <motion.span
              className="font-verlag uppercase inline-block"
              style={{ background: Colors.skyBlue100, color: '#FFFFFF', fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)', letterSpacing: '0.2em', padding: '8px 18px', borderRadius: 4 }}
              animate={{ boxShadow: ['0 0 0 0 rgba(0,155,222,0.5)', '0 0 0 12px rgba(0,155,222,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {COPY.chip}
            </motion.span>

            <img
              src="/webp/logo-instituto-al-aire.png"
              alt="Instituto HP al Aire"
              className="select-none mt-8"
              style={{ width: 'min(340px, 70vw)', height: 'auto' }}
              draggable={false}
              decoding="async"
            />

            <h2 className="font-verlag uppercase mt-8" style={{ fontSize: Section.title, lineHeight: 1.06, textWrap: 'balance' as React.CSSProperties['textWrap'] }}>
              <span className="block text-white">{COPY.claimLinea1}</span>
              <span className="block" style={{ color: Colors.skyBlue100 }}>{COPY.claimLinea2}</span>
            </h2>

            <p className="text-white mt-4" style={{ ...DescriptionCSS.sm, fontSize: Section.desc, lineHeight: Section.descLH, opacity: 0.92, maxWidth: '48ch', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
              Un espacio para compartir información, actualidad y <Hi tone="dark">las voces que impulsan</Hi> a <strong className="font-bold" style={{ color: Colors.skyBlue100 }}>{COPY.marca}</strong>
            </p>

            <div className="mt-8 pt-4 w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-2" style={{ borderTop: '1px solid rgba(0,155,222,0.45)' }}>
              {COPY.pilares.map((p, i) => (
                <span key={p} className="flex items-center gap-4">
                  <span className="font-verlag uppercase" style={{ color: Colors.skyBlue100, fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)', letterSpacing: '0.16em' }}>{p}</span>
                  {i < COPY.pilares.length - 1 && <span aria-hidden style={{ width: 4, height: 4, borderRadius: 2, background: Colors.skyBlue100 }} />}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>

        {/* ── Recuadro del video ── */}
        <div className="relative flex items-center justify-center order-1 lg:order-2 px-6 md:px-12 lg:px-0 pt-16 lg:pt-0 pb-4 lg:pb-0">
          {/* Chevron del arte, sólo en escritorio */}
          <div
            aria-hidden
            className="absolute inset-0 -left-6 hidden lg:block"
            style={{ clipPath: CHEVRON, background: 'linear-gradient(180deg, rgba(0,155,222,0.16), rgba(27,111,214,0.10))' }}
          />
          <SectionReveal direction="left" className="relative w-full lg:pr-16" style={{ maxWidth: 620 }}>
            <VideoBox
              poster={VIDEO.poster}
              sources={VIDEO.sources}
              label={COPY.videoLabel}
              sublabel={COPY.videoSub}
              ratio="16/9"
              radius={14}
              hideCaption
              style={{ border: '2px solid rgba(255,255,255,0.25)', boxShadow: '0 40px 80px -30px rgba(0,0,0,0.7)' }}
            />
            {/* Rótulo fuera del video para no encimarse con los logos que trae grabados */}
            <p className="font-verlag uppercase text-white text-center mt-4" style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', letterSpacing: '0.16em' }}>
              {COPY.videoLabel}
            </p>
            <p className="font-montserrat text-center" style={{ color: Colors.skyBlue100, fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)', marginTop: 2 }}>
              {COPY.videoSub}
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
