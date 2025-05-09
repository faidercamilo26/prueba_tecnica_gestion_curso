"use client"

import type React from "react"
import type { FormEvent } from "react"
import Spinner from "./Spinner"
import type { Course } from "../types"

interface CourseFormProps {
  course?: Course | null
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  isSubmitting: boolean
}

const CourseForm: React.FC<CourseFormProps> = ({ course, onSubmit, isSubmitting }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre del Curso
          </label>
          <input
            id="name"
            name="name"
            defaultValue={course?.name}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ej: Desarrollo Web Avanzado"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={course?.description}
            rows={4}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Describe el contenido y objetivos del curso"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="maxStudents" className="block text-sm font-medium text-gray-700">
            Cupo Máximo de Estudiantes
          </label>
          <input
            id="maxStudents"
            name="maxStudents"
            type="number"
            min="1"
            defaultValue={course?.maxStudents}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="30"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSubmitting ? (
            <>
              <Spinner size="sm" />
              <span className="ml-2">Guardando...</span>
            </>
          ) : (
            "Guardar Cambios"
          )}
        </button>
      </div>
    </form>
  )
}

export default CourseForm
