import SectionReveal from '../ui/SectionReveal'
import { ClipReveal, ShapeIn } from '../ui/Anim'
import { Colors, DescriptionCSS, Section } from '../../tokens'

/**
 * CAMBIO 5 — Curso NOM-035-STPS-2018, Módulo 0.
 * Composición del arte del cliente: panel azul marino con canto inclinado a la
 * izquierda (texto en blanco), foto principal a la derecha y una tira de fotos
 * chicas que remata el borde inferior. Detrás, una terminal velada en blanco.
 */
const COPY = {
  overline: 'Módulo 0',
  titulo: 'CURSO NOM-035',
}

const FOTOS = {
  principal: { src: '/webp/modulo0-principal.webp', alt: 'Sesión del Módulo 0 con colaboradores operativos' },
  chicas: [
    { src: '/webp/modulo0-3.webp', alt: 'Equipo de una unidad de negocio' },
    { src: '/webp/modulo0-1.webp', alt: 'Colaboradores en el curso NOM-035' },
    { src: '/webp/modulo0-2.webp', alt: 'Colaboradores operativos con cascos en sala de capacitación' },
    { src: '/webp/modulo0-4.webp', alt: 'Sesión del curso en la sala de juntas' },
  ],
}

// Canto inclinado del panel: arriba llega al 56 % del ancho, abajo al 42 %.
const PANEL = 'polygon(0 0, 56% 0, 42% 100%, 0 100%)'

function Texto() {
  const p = { ...DescriptionCSS.sm, fontSize: Section.desc, lineHeight: Section.descLH, textWrap: 'pretty' as React.CSSProperties['textWrap'] }
  return (
    <SectionReveal>
      <p className="font-verlag uppercase flex items-center gap-3" style={{ color: Colors.skyBlue100, fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)', letterSpacing: '0.12em', margin: 0 }}>
        <span aria-hidden style={{ display: 'inline-block', width: 3, height: '1.1em', background: Colors.skyBlue100 }} />
        {COPY.overline}
      </p>
      <h2 className="font-verlag uppercase text-white mt-3" style={{ fontSize: Section.title, lineHeight: 1.04, letterSpacing: '-0.3px' }}>
        {COPY.titulo}
      </h2>
      <p className="text-white mt-6" style={p}>
        Con la participación de nuestros colaboradores operativos, iniciamos el bloque <strong className="font-bold">“Fundamentos de la Cultura Organizacional Hutchison Ports”</strong>, orientado a fortalecer el bienestar laboral, la comunicación efectiva, el trabajo en equipo y la prevención de riesgos psicosociales, en cumplimiento de la NOM-035-STPS-2018.
      </p>
      <p className="text-white mt-4" style={p}>
        A través de este programa formativo, reafirmamos nuestro compromiso con el desarrollo de nuestra gente y promovemos una cultura organizacional sólida, segura y alineada con nuestros valores.
      </p>
    </SectionReveal>
  )
}

export default function Modulo0() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#E9EEF5' }}>
      {/* Terminal velada al fondo */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <img src="/webp/fondo-portquest.webp" alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center 30%', opacity: 0.35 }} loading="lazy" decoding="async" draggable={false} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(233,238,245,0.5) 0%, rgba(233,238,245,0.85) 100%)' }} />
      </div>

      {/* ── Escritorio: composición en proporción 16:9, con alto tope de 900 px ──
          Alto explícito en vez de aspect-ratio + maxHeight: esa combinación también
          limita el ANCHO a 1600 px y en pantallas grandes dejaba un hueco a la derecha. */}
      <div className="relative z-10 hidden lg:block" style={{ height: 'min(56.25vw, 900px)' }}>
        {/* Foto principal, detrás del panel */}
        <ClipReveal from="right" className="absolute z-0" style={{ left: '40%', top: 0, right: 0, height: '66%' }}>
          <img src={FOTOS.principal.src} alt={FOTOS.principal.alt} className="w-full h-full object-cover block" loading="lazy" decoding="async" />
        </ClipReveal>

        {/* Panel azul marino con canto inclinado, por delante de la foto */}
        <ShapeIn from="left" className="z-10">
          <div className="absolute inset-0" style={{ clipPath: PANEL, background: Colors.seaBlue100 }} />
        </ShapeIn>

        <div className="absolute inset-y-0 left-0 z-20 flex items-center" style={{ width: '44%', paddingLeft: 'clamp(40px, 5.5vw, 96px)', paddingRight: '2%' }}>
          <Texto />
        </div>

        {/* Tira de cuatro fotos que llena el resto hasta el borde inferior.
            Va DETRÁS del panel (z-[5]): el canto inclinado la recorta y la primera foto
            no se ve como un elemento suelto montado sobre el azul. */}
        <div className="absolute z-[5] grid grid-cols-4 gap-2" style={{ left: '40%', right: 0, top: '67%', bottom: 0 }}>
          {FOTOS.chicas.map((f, i) => (
            <ClipReveal key={f.src} from="bottom" delay={0.3 + i * 0.1} className="h-full">
              <img src={f.src} alt={f.alt} className="w-full h-full object-cover block" loading="lazy" decoding="async" />
            </ClipReveal>
          ))}
        </div>
      </div>

      {/* ── Móvil y tablet: apilado ── */}
      <div className="relative z-10 lg:hidden">
        <div className="px-6 md:px-12 pt-14 pb-16" style={{ background: Colors.seaBlue100, clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}>
          <Texto />
        </div>
        <ClipReveal from="right">
          <img src={FOTOS.principal.src} alt={FOTOS.principal.alt} className="w-full object-cover block" style={{ aspectRatio: '16 / 10' }} loading="lazy" decoding="async" />
        </ClipReveal>
        <div>
          <div className="grid grid-cols-2 gap-2">
            {FOTOS.chicas.map((f, i) => (
              <ClipReveal key={f.src} from="bottom" delay={0.2 + i * 0.1}>
                <img src={f.src} alt={f.alt} className="w-full object-cover block" style={{ aspectRatio: '16 / 9' }} loading="lazy" decoding="async" />
              </ClipReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
