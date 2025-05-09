import type React from "react"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
}

const Spinner: React.FC<SpinnerProps> = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  }

  return <div className={`spinner ${sizeClasses[size]} border-gray-200 border-t-purple-600`}></div>
}

export default Spinner
