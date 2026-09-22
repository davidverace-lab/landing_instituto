import Hero from './components/sections/Hero'
import Graduados from './components/sections/Graduados'
import Reconocimientos from './components/sections/Reconocimientos'
import Modulo0 from './components/sections/Modulo0'
import Organigrama from './components/sections/Organigrama'
import { PortQuest, TerminalRally } from './components/sections/Juegos'
import RecorridoStand from './components/sections/RecorridoStand'
import Entrevistas from './components/sections/Entrevistas'
import InstitutoAlAire from './components/sections/InstitutoAlAire'
import FinalCTA from './components/sections/FinalCTA'

export default function App() {
  // CMS desconectado temporalmente — todas las secciones usan sus DEFAULTS
  return (
    <main>
      <Hero />
      <div id="contenido" />
      <Graduados />          {/* Cambio 1: reconocimiento a los graduados (antes: ceremonia de clausura) */}
      <Reconocimientos />    {/* Cambio 7: videos de entrega de reconocimientos */}
      <Modulo0 />            {/* Cambio 5: curso NOM-035 (antes: cuenta regresiva) */}
      <Organigrama />
      <PortQuest />          {/* Cambio 3 */}
      <TerminalRally />      {/* Cambio 4 */}
      <RecorridoStand />     {/* Recorrido del stand en el Congreso de Calidad Total */}
      <Entrevistas />        {/* Cambio 2: entrevistas del congreso (antes: voces de éxito) */}
      <InstitutoAlAire />    {/* Cambio 6: próximamente */}
      <FinalCTA />           {/* Cambio 8: slogan original */}
    </main>
  )
}
