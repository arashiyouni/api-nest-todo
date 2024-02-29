export interface Tarea {
  _id?: number
  nombre: string
  descripcion?: string
  estado: 'pendiente' | 'completado'
}
