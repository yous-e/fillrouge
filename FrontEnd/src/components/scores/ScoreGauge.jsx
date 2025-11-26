import React from 'react'
import './ScoreGauge.css'

const ScoreGauge = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--success-color)'
    if (score >= 60) return 'var(--primary-color)'
    if (score >= 40) return 'var(--warning-color)'
    return 'var(--error-color)'
  }

  const getGradientColor = (score) => {
    if (score >= 80) return 'conic-gradient(var(--success-color) 0% 80%, var(--border-color) 80% 100%)'
    if (score >= 60) return 'conic-gradient(var(--primary-color) 0% 60%, var(--border-color) 60% 100%)'
    if (score >= 40) return 'conic-gradient(var(--warning-color) 0% 40%, var(--border-color) 40% 100%)'
    return 'conic-gradient(var(--error-color) 0% 20%, var(--border-color) 20% 100%)'
  }

  const circumference = 2 * Math.PI * 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="score-gauge">
      <div className="gauge-container">
        <svg className="gauge-svg" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="gauge-background"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--border-color)"
            strokeWidth="8"
          />
          
          {/* Progress circle */}
          <circle
            className="gauge-progress"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getScoreColor(score)}
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        <div className="gauge-content">
          <div className="score-value">{score}</div>
          <div className="score-max">/ 100</div>
          <div className="score-label">Current Score</div>
        </div>
      </div>

      <div className="gauge-legend">
        <div className="legend-item">
          <div className="legend-color poor"></div>
          <span>0-39</span>
        </div>
        <div className="legend-item">
          <div className="legend-color fair"></div>
          <span>40-59</span>
        </div>
        <div className="legend-item">
          <div className="legend-color good"></div>
          <span>60-79</span>
        </div>
        <div className="legend-item">
          <div className="legend-color excellent"></div>
          <span>80-100</span>
        </div>
      </div>
    </div>
  )
}

export default ScoreGauge