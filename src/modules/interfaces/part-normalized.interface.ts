export interface VideoNormalize {
  id: number
  path: string
  duration: number
  mimeType: string
  size: number
  thumbnailPath?: string
}

export interface PartNormalized {
  id: number
  modulo: string
  moduloIndex: number
  aula: string
  aulaIndex: number
  parte: string
  parteIndex: number
  video: VideoNormalize
}
