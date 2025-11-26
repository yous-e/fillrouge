import React from 'react'
import './ScoreChart.css'

const ScoreChart = ({ scores }) => {
  const currentScore = scores[scores.length - 1] || 0
  const previousScore = scores[scores.length - 2] || 0
  const scoreChange = currentScore - previousScore

  const getScoreColor = (score) => {
    if (score >= 80) return 'score-excellent'
    if (score >= 60) return 'score-good'
    if (score >= 40) return 'score-fair'
    return 'score-poor'
  }

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent! Keep up the good work!'
    if (score >= 60) return 'Good! You\'re on the right track.'
    if (score >= 40) return 'Fair. There\'s room for improvement.'
    return 'Needs attention. Consider reviewing your finances.'
  }

  const getScoreLevel = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Poor'
  }

  return (
    <div className="score-chart">
      <div className="section-header">
        <h3>Financial Score</h3>
        <a href="/scores" className="view-all-link">
          Details →
        </a>
      </div>

      <div className="score-main">
        <div className="score-gauge">
          <div className="gauge-circle">
            <div className="gauge-fill" style={{ '--score': currentScore }}></div>
            <div className="gauge-center">
              <div className="score-value">{currentScore}</div>
              <div className="score-max">/ 100</div>
            </div>
          </div>
        </div>

        <div className="score-info">
          <div className="score-level">
            <span className={`level-badge ${getScoreColor(currentScore)}`}>
              {getScoreLevel(currentScore)}
            </span>
          </div>
          
          <div className="score-message">
            {getScoreMessage(currentScore)}
          </div>

          <div className="score-change">
            {scoreChange > 0 ? '↗' : scoreChange < 0 ? '↘' : '→'} 
            <span className={scoreChange > 0 ? 'positive' : scoreChange < 0 ? 'negative' : 'neutral'}>
              {scoreChange > 0 ? '+' : ''}{scoreChange !== 0 ? scoreChange : 'No change'} from last period
            </span>
          </div>
        </div>
      </div>

      <div className="score-history">
        <h4>Score History</h4>
        <div className="history-bars">
          {scores.map((score, index) => (
            <div key={index} className="history-bar-container">
              <div className="history-bar">
                <div 
                  className={`history-bar-fill ${getScoreColor(score)}`}
                  style={{ height: `${score}%` }}
                ></div>
              </div>
              <div className="history-label">{score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScoreChart