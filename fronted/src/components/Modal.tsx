"use client"

import type React from "react"
import type { ReactNode } from "react"
import { HiX } from "react-icons/hi"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
          </div>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
