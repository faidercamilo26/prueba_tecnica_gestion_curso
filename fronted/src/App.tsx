"use client"

import type React from "react"
import { useState, type FormEvent } from "react"
import { HiBookOpen, HiPencilSquare, HiTrash, HiUsers, HiSparkles } from "react-icons/hi2"
import Spinner from "./components/Spinner"
import Toast from "./components/Toast"
import Modal from "./components/Modal"
import CourseForm from "./components/CourseForm"
import StudentForm from "./components/StudentForm"
import StudentList from "./components/StudentList"
import DiversityGauge from "./components/DiversityGauge"
import { useToast } from "./hooks/useToast"
import { useCourse } from "./hooks/useCourse"
import type { Student } from "./types"
import "./index.css"

const App: React.FC = () => {
  const { toast, showToast, hideToast } = useToast()
  const {
    course,
    loading,
    updatingCourse,
    addingStudent,
    deletingStudent,
    createOrUpdateCourse,
    deleteCourse,
    addStudent,
    deleteStudent,
  } = useCourse()

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openStudentModal, setOpenStudentModal] = useState<boolean>(false)

  const handleCreateOrUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const courseData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      maxStudents: Number.parseInt(formData.get("maxStudents") as string),
    }

    const success = await createOrUpdateCourse(courseData)

    if (success) {
      showToast(course ? "Curso actualizado correctamente" : "Curso creado correctamente")
      setOpenModal(false)
    } else {
      showToast("Error al guardar el curso", "error")
    }
  }

  const handleDelete = async () => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar este curso? Esta acción eliminará también todos los estudiantes asociados.",
      )
    ) {
      const success = await deleteCourse()

      if (success) {
        showToast("Curso eliminado correctamente", "error")
      } else {
        showToast("Error al eliminar el curso", "error")
      }
    }
  }

  const handleAddStudent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const studentData = {
      name: formData.get("studentName") as string,
      email: formData.get("studentEmail") as string,
    }

    const success = await addStudent(studentData)

    if (success) {
      showToast(`${studentData.name} ha sido añadido al curso`)
      setOpenStudentModal(false)
      ;(event.target as HTMLFormElement).reset()
    } else {
      showToast("Error al añadir el estudiante", "error")
    }
  }

  const handleDeleteStudent = async (student: Student) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${student.name}?`)) {
      const success = await deleteStudent(student.id)

      if (success) {
        showToast(`${student.name} ha sido eliminado del curso`, "error")
      } else {
        showToast("Error al eliminar el estudiante", "error")
      }
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-500">Cargando información del curso...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
            Gestión de Curso
          </h1>
          <p className="mt-2 text-gray-500">Administra la información y estudiantes de tu curso</p>
        </div>

        {course ? (
          <div className="bg-white rounded-lg shadow-lg border-t-4 border-t-purple-600 overflow-hidden">
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{course.name}</h2>
                  <p className="mt-2 text-gray-500">{course.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                    onClick={() => setOpenModal(true)}
                  >
                    <HiPencilSquare className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    className="p-2 rounded-md bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-colors"
                    onClick={handleDelete}
                  >
                    <HiTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-2">
                    <HiUsers className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-sm text-gray-500">Ocupación</h3>
                  <p className="font-semibold">
                    {course.studentCount} / {course.maxStudents}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center relative group">
                  <div className="bg-purple-100 p-3 rounded-full mb-2">
                    <HiSparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-medium text-sm text-gray-500">Índice de Diversidad</h3>
                  <p className="font-semibold">{course.diversityIndex}%</p>

                  <DiversityGauge
                    diversityIndex={course.diversityIndex || 0}
                    uniqueDomains={course.uniqueDomains || 0}
                    studentCount={course.studentCount || 0}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">Ocupación del Curso</h3>
                  <span className="text-sm text-gray-500">
                    {course.studentCount} / {course.maxStudents} estudiantes
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${((course.studentCount || 0) / course.maxStudents) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Estudiantes</h3>
                  <button
                    className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                    onClick={() => setOpenStudentModal(true)}
                  >
                    <HiUsers className="mr-2 h-4 w-4" />
                    Añadir Estudiante
                  </button>
                </div>

                <StudentList
                  students={course.students || []}
                  onDelete={handleDeleteStudent}
                  isDeleting={deletingStudent}
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t">
              <p className="text-sm text-gray-500 text-center w-full">
                Gestiona tu curso y estudiantes desde esta página
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-300 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900">No hay ningún curso creado</h2>
              <p className="mt-2 text-gray-500">Crea tu primer curso para comenzar a gestionar estudiantes</p>
            </div>
            <div className="flex justify-center py-8">
              <button
                className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors flex items-center"
                onClick={() => setOpenModal(true)}
              >
                <HiBookOpen className="mr-2 h-5 w-5" />
                Crear Nuevo Curso
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal para crear/editar curso */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={course ? "Editar Curso" : "Crear Nuevo Curso"}
        description={
          course ? "Actualiza la información del curso aquí." : "Ingresa la información para crear un nuevo curso."
        }
      >
        <CourseForm course={course} onSubmit={handleCreateOrUpdate} isSubmitting={updatingCourse} />
      </Modal>

      {/* Modal para añadir estudiante */}
      <Modal
        isOpen={openStudentModal}
        onClose={() => setOpenStudentModal(false)}
        title="Añadir Estudiante"
        description="Ingresa los datos del nuevo estudiante."
      >
        <StudentForm onSubmit={handleAddStudent} isSubmitting={addingStudent} />
      </Modal>

      {/* Toast notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  )
}

export default App
