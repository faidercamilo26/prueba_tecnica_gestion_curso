"use client"

import type React from "react"
import { useEffect } from "react"
import { HiX } from "react-icons/hi"
import type { ToastType } from "../types"

interface ToastProps {
  message: string
  type?: ToastType
  onClose: () => void
  autoClose?: boolean
  duration?: number
}

const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose, autoClose = true, duration = 3000 }) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, onClose])

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center p-4 mb-4 rounded-lg shadow-lg ${
        type === "success"
          ? "bg-green-50 text-green-800"
          : type === "error"
            ? "bg-red-50 text-red-800"
            : "bg-blue-50 text-blue-800"
      }`}
    >
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 ${
          type === "success"
            ? "bg-green-100 text-green-500 hover:bg-green-200"
            : type === "error"
              ? "bg-red-100 text-red-500 hover:bg-red-200"
              : "bg-blue-100 text-blue-500 hover:bg-blue-200"
        }`}
        onClick={onClose}
      >
        <span className="sr-only">Cerrar</span>
        <HiX className="w-5 h-5" />
      </button>
    </div>
  )
}

export default Toast
