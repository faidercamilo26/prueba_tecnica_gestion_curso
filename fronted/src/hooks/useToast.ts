"use client"

import { useState } from "react"
import type { ToastState, ToastType } from "../types"

export const useToast = () => {
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type })
  }

  const hideToast = () => {
    setToast(null)
  }

  return {
    toast,
    showToast,
    hideToast,
  }
}
