export interface BusinessUnit {
  name: string
  progress: number
  graduados: number
  total: number
  rank: number
}

export interface Testimonial {
  name: string
  role: string
  bu: string
  quote: string
  photo: string
}
