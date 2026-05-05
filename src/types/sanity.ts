export interface SanityLanding {
  titulo: string
  subtitulo: string
  cta: string
  hero: {
    title: string
    subtitle: string
    description: string
    buttonText: string
  }
  challenge: {
    graduadosActuales: number
    meta: number
    tituloIzquierda: string
    descripcionIzquierda: string
  }
  urgency: {
    deadline: string
    titulo: string
    subtitulo: string
    panelIzquierdoFecha: string
    panelIzquierdoTexto: string
    panelDerechoTitulo: string
    panelDerechoTexto: string
  }
  secciones: Array<{
    _key: string
    title: string
    description: string
  }>
}
