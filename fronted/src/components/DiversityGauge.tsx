import type React from "react"

interface DiversityGaugeProps {
  diversityIndex: number
  uniqueDomains: number
  studentCount: number
}

const DiversityGauge: React.FC<DiversityGaugeProps> = ({ diversityIndex, uniqueDomains, studentCount }) => {
  // Determinar el color basado en el porcentaje
  const getColor = (percentage: number): string => {
    if (percentage < 50) return "#ef4444" // Rojo
    if (percentage < 75) return "#f59e0b" // Amarillo
    return "#22c55e" // Verde
  }

  return (
    <div className="relative group">
      <div className="diversity-gauge">
        <div
          className="diversity-gauge-fill"
          style={{
            transform: `rotate(${(diversityIndex / 100) * 180 - 90}deg)`,
            backgroundColor: getColor(diversityIndex),
          }}
        ></div>
        <div className="diversity-gauge-center"></div>
      </div>

      <div className="diversity-tooltip">
        <div className="tooltip-title">Índice de Diversidad</div>
        <div className="tooltip-content">
          <div className="tooltip-row">
            <span className="tooltip-label">Dominios únicos:</span>
            <span className="tooltip-value">{uniqueDomains}</span>
          </div>
          <div className="tooltip-row">
            <span className="tooltip-label">Total de estudiantes:</span>
            <span className="tooltip-value">{studentCount}</span>
          </div>
          <div className="tooltip-formula">
            ({uniqueDomains} / {studentCount}) * 100 = {diversityIndex}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiversityGauge
