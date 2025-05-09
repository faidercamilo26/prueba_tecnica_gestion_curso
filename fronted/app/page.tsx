"use client";  
import React from "react"
import { useState, useEffect } from "react"
import { Trash2, Edit, BookOpen, Users, Sparkles } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Progress } from "../components/ui/progress"
import { useToast } from "../components/ui/use-toast"
import "./styles.css"

// Componente de Spinner reutilizable
const Spinner = ({ overlay = false }) => {
  if (overlay) {
    return (
      <div className="spinner-overlay">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  )
}

interface Course {
  id?: string
  name: string
  description: string
  maxStudents: number
  diversityIndex?: number
  studentCount?: number
  uniqueDomains?: number
}

export default function CoursePage() {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [addingStudent, setAddingStudent] = useState(false)
  const [deletingStudent, setDeletingStudent] = useState(false)
  const [updatingCourse, setUpdatingCourse] = useState(false)
  const { toast } = useToast()

  // Simulación de datos para la demostración
  useEffect(() => {
    // En una implementación real, esto sería un fetch a la API
    setTimeout(() => {
      setCourse({
        id: "1",
        name: "Desarrollo Web Avanzado",
        description:
          "Curso intensivo de desarrollo web con React, Next.js y APIs RESTful. Aprenderás a crear aplicaciones web modernas y escalables.",
        maxStudents: 30,
        diversityIndex: 80,
        studentCount: 5,
        uniqueDomains: 4,
      })
      setLoading(false)
    }, 1000)
  }, [])

  const handleCreateOrUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUpdatingCourse(true)

    const formData = new FormData(event.currentTarget)
    const courseData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      maxStudents: Number.parseInt(formData.get("maxStudents") as string),
    }

    // Simulación de actualización con retraso para mostrar el spinner
    setTimeout(() => {
      setCourse({
        ...course,
        ...courseData,
      })

      toast({
        title: course ? "Curso actualizado" : "Curso creado",
        description: "Los cambios se han guardado correctamente",
      })

      setUpdatingCourse(false)
      setOpenModal(false)
    }, 1000)
  }

  const handleDelete = async () => {
    // Simulación de eliminación
    if (
      confirm(
        "¿Estás seguro de que deseas eliminar este curso? Esta acción eliminará también todos los estudiantes asociados.",
      )
    ) {
      setCourse(null)
      toast({
        title: "Curso eliminado",
        description: "El curso y todos sus estudiantes han sido eliminados",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando información del curso...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
            Gestión de Curso
          </h1>
          <p className="text-muted-foreground mt-2">Administra la información y estudiantes de tu curso</p>
        </div>

        {course ? (
          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{course.name}</CardTitle>
                  <CardDescription className="mt-2">{course.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog open={openModal} onOpenChange={setOpenModal}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Curso</DialogTitle>
                        <DialogDescription>Actualiza la información del curso aquí.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleCreateOrUpdate}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Nombre del Curso</Label>
                            <Input id="name" name="name" defaultValue={course.name} required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                              id="description"
                              name="description"
                              defaultValue={course.description}
                              rows={4}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="maxStudents">Cupo Máximo de Estudiantes</Label>
                            <Input
                              id="maxStudents"
                              name="maxStudents"
                              type="number"
                              min="1"
                              defaultValue={course.maxStudents.toString()}
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" disabled={updatingCourse}>
                            {updatingCourse ? (
                              <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                                Guardando...
                              </>
                            ) : (
                              "Guardar Cambios"
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" size="icon" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 flex flex-col items-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-sm text-muted-foreground">Ocupación</h3>
                  <p className="font-semibold">
                    {course.studentCount} / {course.maxStudents}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 flex flex-col items-center relative group">
                  <div className="bg-primary/10 p-3 rounded-full mb-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-sm text-muted-foreground">Índice de Diversidad</h3>
                  <p className="font-semibold">{course.diversityIndex}%</p>

                  <div className="diversity-gauge mt-2">
                    <div
                      className="diversity-gauge-fill"
                      style={{
                        transform: `rotate(${(course.diversityIndex! / 100) * 180}deg)`,
                        backgroundColor:
                          course.diversityIndex! < 50 ? "#ef4444" : course.diversityIndex! < 75 ? "#f59e0b" : "#22c55e",
                      }}
                    ></div>
                    <div className="diversity-gauge-center"></div>
                  </div>

                  <div className="diversity-tooltip">
                    <div className="tooltip-title">Índice de Diversidad</div>
                    <div className="tooltip-content">
                      <div className="tooltip-row">
                        <span className="tooltip-label">Dominios únicos:</span>
                        <span className="tooltip-value">{course.uniqueDomains || 4}</span>
                      </div>
                      <div className="tooltip-row">
                        <span className="tooltip-label">Total de estudiantes:</span>
                        <span className="tooltip-value">{course.studentCount}</span>
                      </div>
                      <div className="tooltip-formula">
                        ({course.uniqueDomains || 4} / {course.studentCount}) * 100 = {course.diversityIndex}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">Ocupación del Curso</h3>
                  <span className="text-sm text-muted-foreground">
                    {course.studentCount} / {course.maxStudents} estudiantes
                  </span>
                </div>
                <Progress value={(course.studentCount! / course.maxStudents) * 100} className="h-2" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Estudiantes</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Users className="mr-2 h-4 w-4" />
                        Añadir Estudiante
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Añadir Estudiante</DialogTitle>
                        <DialogDescription>Ingresa los datos del nuevo estudiante.</DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          setAddingStudent(true)

                          const formData = new FormData(e.currentTarget)
                          const studentData = {
                            id: Date.now().toString(),
                            name: formData.get("studentName") as string,
                            email: formData.get("studentEmail") as string,
                          }

                          // Simulación de añadir estudiante con retraso para mostrar el spinner
                          setTimeout(() => {
                            setCourse({
                              ...course!,
                              studentCount: (course!.studentCount || 0) + 1,
                            })

                            toast({
                              title: "Estudiante añadido",
                              description: `${studentData.name} ha sido añadido al curso`,
                            })

                            setAddingStudent(false)
                            ;(e.target as HTMLFormElement).reset()
                            ;(document.activeElement as HTMLElement).blur()
                          }, 1000)
                        }}
                      >
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="studentName">Nombre</Label>
                            <Input id="studentName" name="studentName" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="studentEmail">Email</Label>
                            <Input id="studentEmail" name="studentEmail" type="email" required />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" disabled={addingStudent}>
                            {addingStudent ? (
                              <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                                Añadiendo...
                              </>
                            ) : (
                              "Añadir"
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="border rounded-md">
                  <div className="grid grid-cols-3 p-3 bg-muted/50 font-medium text-sm">
                    <div>Nombre</div>
                    <div className="col-span-1">Email</div>
                    <div className="text-right">Acciones</div>
                  </div>
                  <div className="divide-y">
                    {[
                      { id: "1", name: "Ana García", email: "ana@gmail.com" },
                      { id: "2", name: "Carlos López", email: "carlos@outlook.com" },
                      { id: "3", name: "María Rodríguez", email: "maria@yahoo.com" },
                      { id: "4", name: "Juan Pérez", email: "juan@gmail.com" },
                      { id: "5", name: "Elena Torres", email: "elena@hotmail.com" },
                    ].map((student) => (
                      <div key={student.id} className="grid grid-cols-3 p-3 items-center">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-muted-foreground">{student.email}</div>
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            disabled={deletingStudent}
                            onClick={() => {
                              if (confirm(`¿Estás seguro de que deseas eliminar a ${student.name}?`)) {
                                setDeletingStudent(true)

                                // Simulación de eliminación con retraso para mostrar el spinner
                                setTimeout(() => {
                                  setCourse({
                                    ...course!,
                                    studentCount: (course!.studentCount || 0) - 1,
                                  })

                                  toast({
                                    title: "Estudiante eliminado",
                                    description: `${student.name} ha sido eliminado del curso`,
                                    variant: "destructive",
                                  })

                                  setDeletingStudent(false)
                                }, 1000)
                              }
                            }}
                          >
                            {deletingStudent ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-destructive border-t-transparent"></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground text-center w-full">
                Gestiona tu curso y estudiantes desde esta página
              </p>
            </CardFooter>
          </Card>
        ) : (
          <Card className="shadow-lg border-dashed border-2 border-muted">
            <CardHeader>
              <CardTitle>No hay ningún curso creado</CardTitle>
              <CardDescription>Crea tu primer curso para comenzar a gestionar estudiantes</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-8">
              <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Crear Nuevo Curso
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Curso</DialogTitle>
                    <DialogDescription>Ingresa la información para crear un nuevo curso.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateOrUpdate}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nombre del Curso</Label>
                        <Input id="name" name="name" placeholder="Ej: Desarrollo Web Avanzado" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Describe el contenido y objetivos del curso"
                          rows={4}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="maxStudents">Cupo Máximo de Estudiantes</Label>
                        <Input id="maxStudents" name="maxStudents" type="number" min="1" placeholder="30" required />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={updatingCourse}>
                        {updatingCourse ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                            Guardando...
                          </>
                        ) : (
                          "Crear Curso"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
