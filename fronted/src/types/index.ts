export interface Student {
  id: string
  name: string
  email: string
}

export interface Course {
  id?: string
  name: string
  description: string
  maxStudents: number
  diversityIndex?: number
  studentCount?: number
  uniqueDomains?: number
  students?: Student[]
}

export type ToastType = "success" | "error" | "info"

export interface ToastState {
  message: string
  type: ToastType
}
