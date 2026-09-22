import { motion } from 'framer-motion'
import { DeviceMobile, ArrowRight } from '@phosphor-icons/react'
import SectionReveal from '../ui/SectionReveal'
import { Colors, DescriptionCSS, Section } from '../../tokens'
import { Hi } from '../ui/Texto'
import { ClipReveal } from '../ui/Anim'

/**
 * CAMBIOS 3 y 4 — Juegos con temática Hutchison Ports.
 * PortQuest (fondo claro) y Terminal Rally (fondo oscuro).
 * Los juegos viven en /portquest y /terminalrally; el clip en bucle es gameplay real.
 */

interface StatProps { value: string; label: string; tone: 'light' | 'dark' }
function Stat({ value, label, tone }: StatProps) {
  const c = tone === 'light' ? Colors.seaBlue100 : '#FFFFFF'
  return (
    <div className="flex flex-col items-center text-center px-4 md:px-6">
      <span className="font-verlag" style={{ color: c, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1 }}>{value}</span>
      <span className="font-montserrat uppercase mt-1" style={{ color: c, fontSize: 'clamp(0.65rem, 1vw, 0.8rem)', letterSpacing: '0.14em', fontWeight: 700 }}>{label}</span>
    </div>
  )
}

function QrCard({ text, qr }: { text: string; qr: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className="flex items-center gap-4 md:gap-6 p-4 md:p-5"
      style={{
        background: 'rgba(255,255,255,0.9)',
        borderRadius: 0,
        boxShadow: '0 24px 50px -24px rgba(0,46,109,0.45)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ width: 'clamp(96px, 16vw, 132px)', flexShrink: 0 }}>
        <img src={`/qr/${qr}.svg`} alt={`Código QR para jugar ${qr === 'portquest' ? 'PortQuest' : 'Terminal Rally'} desde el celular`} className="block w-full h-auto" style={{ background: '#FFFFFF', padding: 6, border: '1px solid rgba(0,46,109,0.12)' }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <DeviceMobile size={18} color={Colors.skyBlue100} weight="fill" />
          <span className="font-montserrat uppercase" style={{ color: Colors.skyBlue100, fontSize: '0.68rem', letterSpacing: '0.16em', fontWeight: 700 }}>Desde tu celular</span>
        </div>
        <p className="font-montserrat text-navy" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)', fontWeight: 600, lineHeight: 1.35, margin: 0, textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
          {text}
        </p>
      </div>
    </motion.div>
  )
}

/** Recuadro cuadrado con el gameplay en bucle (video mudo, se ve como un GIF pero nítido) y enlace al juego. */
function GameplayCard({ href, clip, alt, tone }: { href: string; clip: string; alt: string; tone: 'light' | 'dark' }) {
  const light = tone === 'light'
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={alt}
      className="block relative overflow-hidden mx-auto w-full"
      style={{
        maxWidth: 520,
        aspectRatio: '1 / 1',
        borderRadius: 0,
        boxShadow: light ? '0 40px 80px -30px rgba(0,46,109,0.5)' : '0 40px 80px -30px rgba(0,0,0,0.7)',
        background: '#0B1F45',
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={`/juegos/${clip}.mp4`}
        poster={`/juegos/${clip}-poster.jpg`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      <motion.span
        animate={{ boxShadow: ['0 0 0 0 rgba(0,155,222,0.55)', '0 0 0 10px rgba(0,155,222,0)'] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-3 right-3 font-verlag uppercase text-white flex items-center gap-2 px-3 py-2"
        style={{ background: 'rgba(0,46,109,0.85)', borderRadius: 0, fontSize: '0.72rem', letterSpacing: '0.14em', backdropFilter: 'blur(6px)' }}
      >
        Jugar <ArrowRight size={14} weight="bold" />
      </motion.span>
    </motion.a>
  )
}

/* ─────────────────────────── PORTQUEST ─────────────────────────── */
export function PortQuest() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#F4F7FB' }}>
      <div className="absolute inset-0 z-0">
        <img
          src="/webp/fondo-portquest.webp"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.28 }}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(244,247,251,0.95) 0%, rgba(244,247,251,0.75) 50%, rgba(244,247,251,0.6) 100%)' }} />
      </div>

      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center"
        style={{ paddingTop: 'clamp(64px, 8vw, 120px)', paddingBottom: 'clamp(64px, 8vw, 120px)' }}
      >
        <SectionReveal>
          <h2 className="font-verlag uppercase" style={{ fontSize: Section.title, lineHeight: 1.04, letterSpacing: '0.02em' }}>
            <span style={{ color: Colors.seaBlue100 }}>PORT</span><span style={{ color: Colors.skyBlue100 }}>QUEST</span>
          </h2>
          <p className="text-navy mt-5" style={{ ...DescriptionCSS.sm, fontSize: Section.desc, lineHeight: Section.descLH, maxWidth: '52ch', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
            Pon a prueba tus habilidades, <Hi>supera cada desafío</Hi> y descubre <Hi>conceptos clave</Hi> de Hutchison Ports mientras recorres cinco terminales.
          </p>

          <div className="flex items-stretch mt-7 mb-8 -mx-4" style={{ borderTop: '1px solid rgba(0,46,109,0.12)', borderBottom: '1px solid rgba(0,46,109,0.12)', paddingTop: 14, paddingBottom: 14 }}>
            <Stat value="5" label="Terminales" tone="light" />
            <div style={{ width: 1, background: 'rgba(0,155,222,0.5)' }} />
            <div className="flex items-center px-4 md:px-6">
              <span className="font-verlag uppercase text-navy" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)', letterSpacing: '0.08em', lineHeight: 1.25 }}>
                Una gran aventura<br />en el universo HP
              </span>
            </div>
          </div>

          <QrCard qr="portquest" text="Escanea el código QR desde tu celular y comienza el reto." />

          <motion.a
            href="/portquest/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-verlag uppercase inline-flex items-center gap-2 mt-6 text-white"
            style={{ background: Colors.seaBlue100, padding: '14px 26px', borderRadius: 0, fontSize: '0.85rem', letterSpacing: '0.08em', boxShadow: '0 12px 28px -10px rgba(0,46,109,0.55)' }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Jugar en el navegador <ArrowRight size={16} weight="bold" />
          </motion.a>
        </SectionReveal>

        <SectionReveal direction="left" delay={0.15}>
          <ClipReveal from="right"><GameplayCard href="/portquest/" clip="portquest" alt="Gameplay de PortQuest" tone="light" /></ClipReveal>
        </SectionReveal>
      </div>
    </section>
  )
}

/* ───────────────────────── TERMINAL RALLY ───────────────────────── */
export function TerminalRally() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#0B1F45' }}>
      <div className="absolute inset-0 z-0">
        <img
          src="/Terminal.webp"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.35 }}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(11,31,69,0.96) 0%, rgba(11,31,69,0.8) 50%, rgba(0,46,109,0.55) 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(to top, rgba(0,60,140,0.55), transparent)' }} />
      </div>

      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center"
        style={{ paddingTop: 'clamp(64px, 8vw, 120px)', paddingBottom: 'clamp(64px, 8vw, 120px)' }}
      >
        <SectionReveal>
          <h2 className="font-verlag uppercase text-white" style={{ fontSize: Section.title, lineHeight: 1.04, letterSpacing: '0.01em', textShadow: '0 10px 40px rgba(0,0,0,0.4)', textWrap: 'balance' as React.CSSProperties['textWrap'] }}>
            Terminal Rally
          </h2>
          <p className="text-white mt-5" style={{ ...DescriptionCSS.sm, fontSize: Section.desc, lineHeight: Section.descLH, opacity: 0.92, maxWidth: '52ch', textWrap: 'pretty' as React.CSSProperties['textWrap'] }}>
            ¡Acepta el desafío! Recorre las <Hi tone="dark">cinco terminales</Hi>, esquiva obstáculos, salta, rueda y reúne los conceptos que dan vida a nuestra <Hi tone="dark">cultura organizacional</Hi>.
          </p>

          <div className="flex items-stretch mt-7 mb-8 -mx-4" style={{ borderTop: '1px solid rgba(255,255,255,0.15)', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingTop: 14, paddingBottom: 14 }}>
            <Stat value="5" label="Terminales" tone="dark" />
            <div style={{ width: 1, background: 'rgba(0,155,222,0.7)' }} />
            <div className="flex items-center px-4 md:px-6">
              <span className="font-verlag uppercase text-white" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)', letterSpacing: '0.12em', lineHeight: 1.25 }}>
                Esquiva <span style={{ color: Colors.sunrayYellow100 }}>•</span> Salta <span style={{ color: Colors.sunrayYellow100 }}>•</span> Rueda
              </span>
            </div>
          </div>

          <QrCard qr="terminalrally" text="Escanea el código QR desde tu celular y ¡comienza la aventura!" />

          <motion.a
            href="/terminalrally/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 mt-6 !text-[0.8rem] md:!text-base !py-3 !px-6 md:!py-4 md:!px-9 rounded-none"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Jugar en el navegador <ArrowRight size={16} weight="bold" />
          </motion.a>
        </SectionReveal>

        <SectionReveal direction="left" delay={0.15}>
          <ClipReveal from="right"><GameplayCard href="/terminalrally/" clip="terminalrally" alt="Gameplay de Terminal Rally" tone="dark" /></ClipReveal>
        </SectionReveal>
      </div>
    </section>
  )
}
