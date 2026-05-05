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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sanityClient
      .fetch<SanityLanding>(LANDING_QUERY)
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main>
      <Hero
        title={data?.hero?.title}
        subtitle={data?.hero?.subtitle}
        description={data?.hero?.description}
        buttonText={data?.hero?.buttonText}
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
      <Ranking />
      <Organigrama />
      <Testimonials />
      <HonorBoard />
      <Ceremony />
      <FinalCTA />
    </main>
  )
}
