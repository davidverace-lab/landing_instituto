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
      {/* Fondo: puerto de noche con el mapamundi digital, velado en azul para que se lea el texto */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/webp/fondo-alaire.webp"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center select-none"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(3,21,58,0.94) 0%, rgba(3,21,58,0.82) 45%, rgba(3,21,58,0.45) 100%)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,21,58,0.85) 0%, transparent 40%)' }} />
      </div>

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
              ratio="16/9"
              radius={14}
              style={{ border: '2px solid rgba(255,255,255,0.25)', boxShadow: '0 40px 80px -30px rgba(0,0,0,0.7)' }}
            />
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
