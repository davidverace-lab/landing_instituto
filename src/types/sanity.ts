export interface SanityHero {
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
}

export interface SanityChallenge {
  graduadosActuales?: number
  meta?: number
  tituloIzquierda?: string
  descripcionIzquierda?: string
}

export interface SanityUrgency {
  deadline?: string
  titulo?: string
  subtitulo?: string
  panelIzquierdoFecha?: string
  panelIzquierdoTexto?: string
  panelDerechoTitulo?: string
  panelDerechoTexto?: string
}

export interface SanityRanking {
  titulo?: string
  descripcion?: string
  etiquetaGrafica?: string
}

export interface SanityOrganigramaItem {
  label?: string
  desc?: string
}

export interface SanityOrganigramaCard {
  title?: string
  desc?: string
}

export interface SanityOrganigrama {
  titulo?: string
  topItem?: SanityOrganigramaItem
  leftItem?: SanityOrganigramaCard
  rightItem?: SanityOrganigramaCard
  bottomItem?: SanityOrganigramaItem
}

export interface SanityTestimonial {
  _key?: string
  name?: string
  role?: string
  bu?: string
  quote?: string
  poster?: string
  videoSrc?: string
}

export interface SanityTestimonials {
  titulo?: string
  items?: SanityTestimonial[]
}

export interface SanityHonorBoard {
  titulo?: string
  descripcion?: string
  fotos?: string[]
}

export interface SanityCeremony {
  titulo?: string
  descripcion?: string
  etiquetaFecha?: string
  fecha?: string
  videoLabel?: string
  videoSubLabel?: string
  videoBadge?: string
}

export interface SanityFinalCTA {
  ctaTitulo?: string
  ctaDescripcion?: string
  ctaButtonText?: string
  ctaButtonUrl?: string
  sloganLinea1?: string
  sloganHighlight1?: string
  sloganLinea2?: string
  sloganHighlight2?: string
}

export interface SanitySeccion {
  _key?: string
  title?: string
  description?: string
}

export interface SanityLanding {
  titulo?: string
  subtitulo?: string
  cta?: string
  hero?: SanityHero
  challenge?: SanityChallenge
  urgency?: SanityUrgency
  ranking?: SanityRanking
  organigrama?: SanityOrganigrama
  testimonials?: SanityTestimonials
  honorBoard?: SanityHonorBoard
  ceremony?: SanityCeremony
  finalCTA?: SanityFinalCTA
  secciones?: SanitySeccion[]
}
