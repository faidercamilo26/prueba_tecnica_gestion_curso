"use client"

import type React from "react"
import type { FormEvent } from "react"
import Spinner from "./Spinner"

interface StudentFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  isSubmitting: boolean
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, isSubmitting }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            id="studentName"
            name="studentName"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="studentEmail"
            name="studentEmail"
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              <span className="ml-2">Añadiendo...</span>
            </>
          ) : (
            "Añadir"
          )}
        </button>
      </div>
    </form>
  )
}

export default StudentForm
