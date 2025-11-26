import React from 'react'
import './ScoreHistory.css'

const ScoreHistory = ({ scores }) => {
  const maxScore = Math.max(...scores, 100)
  const minScore = Math.min(...scores, 0)

  const getScoreColor = (score) => {
    if (score >= 80) return 'score-excellent'
    if (score >= 60) return 'score-good'
    if (score >= 40) return 'score-fair'
    return 'score-poor'
  }

  const formatDate = (index) => {
    const dates = []
    const today = new Date()
    
    for (let i = scores.length - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - (scores.length - 1 - i))
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
    }
    
    return dates[index] || ''
  }

  const calculateTrend = () => {
    if (scores.length < 2) return 0
    const current = scores[scores.length - 1]
    const previous = scores[scores.length - 2]
    return current - previous
  }

  const trend = calculateTrend()
  const currentScore = scores[scores.length - 1] || 0

  return (
    <div className="score-history">
      <div className="history-header">
        <h3>Score History</h3>
        <div className="trend-indicator">
          {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'}
          <span className={trend > 0 ? 'positive' : trend < 0 ? 'negative' : 'neutral'}>
            {trend > 0 ? '+' : ''}{trend} from last period
          </span>
        </div>
      </div>

      {scores.length === 0 ? (
        <div className="no-history">
          <p>No score history available</p>
          <p className="history-help">
            Your score history will appear here as you add more transactions
          </p>
        </div>
      ) : (
        <>
          <div className="history-chart">
            <div className="chart-grid">
              <div className="grid-line grid-80">80</div>
              <div className="grid-line grid-60">60</div>
              <div className="grid-line grid-40">40</div>
              <div className="grid-line grid-20">20</div>
              <div className="grid-line grid-0">0</div>
            </div>

            <div className="chart-bars">
              {scores.map((score, index) => (
                <div key={index} className="chart-bar-container">
                  <div 
                    className={`chart-bar ${getScoreColor(score)}`}
                    style={{ 
                      height: `${(score / maxScore) * 100}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="bar-value">{score}</div>
                  </div>
                  <div className="bar-label">{formatDate(index)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="history-stats">
            <div className="stat">
              <div className="stat-label">Current Score</div>
              <div className="stat-value">{currentScore}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Highest</div>
              <div className="stat-value">{maxScore}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Lowest</div>
              <div className="stat-value">{minScore}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Average</div>
              <div className="stat-value">
                {scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ScoreHistory