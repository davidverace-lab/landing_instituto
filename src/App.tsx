import { useEffect, useState } from 'react'
import Hero from './components/sections/Hero'
import Challenge from './components/sections/Challenge'
import Urgency from './components/sections/Urgency'
import Ranking from './components/sections/Ranking'
import Organigrama from './components/sections/Organigrama'
import Testimonials from './components/sections/Testimonials'
import HonorBoard from './components/sections/HonorBoard'
import Ceremony from './components/sections/Ceremony'
import FinalCTA from './components/sections/FinalCTA'
import { sanityClient } from './lib/sanityClient'
import { LANDING_QUERY } from './lib/queries'
import type { SanityLanding } from './types/sanity'

export default function App() {
  const [data, setData] = useState<SanityLanding | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<SanityLanding>(LANDING_QUERY)
      .then(setData)
      .catch(() => setData(null))
  }, [])

  return (
    <main>
      <Hero
        title={data?.hero?.title}
        subtitle={data?.hero?.subtitle}
        description={data?.hero?.description}
        buttonText={data?.hero?.buttonText}
        buttonUrl={data?.hero?.buttonUrl}
      />
      <Challenge
        graduadosActuales={data?.challenge?.graduadosActuales}
        meta={data?.challenge?.meta}
        tituloIzquierda={data?.challenge?.tituloIzquierda}
        descripcionIzquierda={data?.challenge?.descripcionIzquierda}
      />
      <Urgency
        deadline={data?.urgency?.deadline}
        titulo={data?.urgency?.titulo}
        subtitulo={data?.urgency?.subtitulo}
        panelIzquierdoFecha={data?.urgency?.panelIzquierdoFecha}
        panelIzquierdoTexto={data?.urgency?.panelIzquierdoTexto}
        panelDerechoTitulo={data?.urgency?.panelDerechoTitulo}
        panelDerechoTexto={data?.urgency?.panelDerechoTexto}
      />
      <Ranking
        titulo={data?.ranking?.titulo}
        descripcion={data?.ranking?.descripcion}
        etiquetaGrafica={data?.ranking?.etiquetaGrafica}
      />
      <Organigrama
        titulo={data?.organigrama?.titulo}
        topItem={data?.organigrama?.topItem}
        leftItem={data?.organigrama?.leftItem}
        rightItem={data?.organigrama?.rightItem}
        bottomItem={data?.organigrama?.bottomItem}
      />
      <Testimonials
        titulo={data?.testimonials?.titulo}
        items={data?.testimonials?.items}
      />
      <HonorBoard
        titulo={data?.honorBoard?.titulo}
        descripcion={data?.honorBoard?.descripcion}
        fotos={data?.honorBoard?.fotos}
      />
      <Ceremony
        titulo={data?.ceremony?.titulo}
        descripcion={data?.ceremony?.descripcion}
        etiquetaFecha={data?.ceremony?.etiquetaFecha}
        fecha={data?.ceremony?.fecha}
        videoLabel={data?.ceremony?.videoLabel}
        videoSubLabel={data?.ceremony?.videoSubLabel}
        videoBadge={data?.ceremony?.videoBadge}
      />
      <FinalCTA
        ctaTitulo={data?.finalCTA?.ctaTitulo}
        ctaDescripcion={data?.finalCTA?.ctaDescripcion}
        ctaButtonText={data?.finalCTA?.ctaButtonText}
        ctaButtonUrl={data?.finalCTA?.ctaButtonUrl}
        sloganLinea1={data?.finalCTA?.sloganLinea1}
        sloganHighlight1={data?.finalCTA?.sloganHighlight1}
        sloganLinea2={data?.finalCTA?.sloganLinea2}
        sloganHighlight2={data?.finalCTA?.sloganHighlight2}
      />
    </main>
  )
}
