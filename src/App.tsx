import Hero from './components/sections/Hero'
import Challenge from './components/sections/Challenge'
import Urgency from './components/sections/Urgency'
import Ranking from './components/sections/Ranking'
import Organigrama from './components/sections/Organigrama'
import Testimonials from './components/sections/Testimonials'
import HonorBoard from './components/sections/HonorBoard'
import Ceremony from './components/sections/Ceremony'
import FinalCTA from './components/sections/FinalCTA'

export default function App() {
  // CMS desconectado temporalmente — todas las secciones usan sus DEFAULTS
  return (
    <main>
      <Hero />
      <Ceremony />
      <Challenge />
      <Urgency />
      <Ranking />
      <Organigrama />
      <Testimonials />
      <HonorBoard />
      <FinalCTA />
    </main>
  )
}
