"use client"

import type React from "react"
import { HiTrash } from "react-icons/hi"
import Spinner from "./Spinner"
import type { Student } from "../types"

interface StudentListProps {
  students: Student[]
  onDelete: (student: Student) => void
  isDeleting: boolean
}

const StudentList: React.FC<StudentListProps> = ({ students, onDelete, isDeleting }) => {
  return (
    <div className="border rounded-md">
      <div className="grid grid-cols-3 p-3 bg-gray-50 font-medium text-sm">
        <div>Nombre</div>
        <div className="col-span-1">Email</div>
        <div className="text-right">Acciones</div>
      </div>
      <div className="divide-y">
        {students.map((student) => (
          <div key={student.id} className="grid grid-cols-3 p-3 items-center">
            <div className="font-medium">{student.name}</div>
            <div className="text-gray-500">{student.email}</div>
            <div className="flex justify-end">
              <button
                className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                disabled={isDeleting}
                onClick={() => onDelete(student)}
              >
                {isDeleting ? <Spinner size="sm" /> : <HiTrash className="h-4 w-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentList
