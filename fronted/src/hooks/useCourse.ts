"use client"

import { useState, useEffect } from "react"
import type { Course, Student } from "../types"

export const useCourse = () => {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [updatingCourse, setUpdatingCourse] = useState<boolean>(false)
  const [addingStudent, setAddingStudent] = useState<boolean>(false)
  const [deletingStudent, setDeletingStudent] = useState<boolean>(false)

  // Simulación de carga inicial de datos
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Simulación de API call
        setTimeout(() => {
          setCourse({
            id: "1",
            name: "Desarrollo Web Avanzado",
            description:
              "Curso intensivo de desarrollo web con React, Tailwind CSS y APIs RESTful. Aprenderás a crear aplicaciones web modernas y escalables.",
            maxStudents: 30,
            diversityIndex: 80,
            studentCount: 5,
            uniqueDomains: 4,
            students: [
              { id: "1", name: "Ana García", email: "ana@gmail.com" },
              { id: "2", name: "Carlos López", email: "carlos@outlook.com" },
              { id: "3", name: "María Rodríguez", email: "maria@yahoo.com" },
              { id: "4", name: "Juan Pérez", email: "juan@gmail.com" },
              { id: "5", name: "Elena Torres", email: "elena@hotmail.com" },
            ],
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching course:", error)
        setLoading(false)
      }
    }

    fetchCourse()
  }, [])

  const createOrUpdateCourse = async (courseData: Omit<Course, "id">): Promise<boolean> => {
    setUpdatingCourse(true)
    try {
      // Simulación de API call
      return new Promise((resolve) => {
        setTimeout(() => {
          setCourse((prevCourse) => ({
            ...(prevCourse || {}),
            ...courseData,
            id: prevCourse?.id || Date.now().toString(),
          }))
          setUpdatingCourse(false)
          resolve(true)
        }, 1000)
      })
    } catch (error) {
      console.error("Error updating course:", error)
      setUpdatingCourse(false)
      return false
    }
  }

  const deleteCourse = async (): Promise<boolean> => {
    try {
      // Simulación de API call
      return new Promise((resolve) => {
        setTimeout(() => {
          setCourse(null)
          resolve(true)
        }, 1000)
      })
    } catch (error) {
      console.error("Error deleting course:", error)
      return false
    }
  }

  const addStudent = async (studentData: Omit<Student, "id">): Promise<boolean> => {
    setAddingStudent(true)
    try {
      // Simulación de API call
      return new Promise((resolve) => {
        setTimeout(() => {
          setCourse((prevCourse) => {
            if (!prevCourse) return null

            const newStudent: Student = {
              id: Date.now().toString(),
              ...studentData,
            }

            return {
              ...prevCourse,
              studentCount: (prevCourse.studentCount || 0) + 1,
              students: [...(prevCourse.students || []), newStudent],
            }
          })
          setAddingStudent(false)
          resolve(true)
        }, 1000)
      })
    } catch (error) {
      console.error("Error adding student:", error)
      setAddingStudent(false)
      return false
    }
  }

  const deleteStudent = async (studentId: string): Promise<boolean> => {
    setDeletingStudent(true)
    try {
      // Simulación de API call
      return new Promise((resolve) => {
        setTimeout(() => {
          setCourse((prevCourse) => {
            if (!prevCourse) return null

            return {
              ...prevCourse,
              studentCount: (prevCourse.studentCount || 0) - 1,
              students: (prevCourse.students || []).filter((student) => student.id !== studentId),
            }
          })
          setDeletingStudent(false)
          resolve(true)
        }, 1000)
      })
    } catch (error) {
      console.error("Error deleting student:", error)
      setDeletingStudent(false)
      return false
    }
  }

  return {
    course,
    loading,
    updatingCourse,
    addingStudent,
    deletingStudent,
    createOrUpdateCourse,
    deleteCourse,
    addStudent,
    deleteStudent,
  }
}
