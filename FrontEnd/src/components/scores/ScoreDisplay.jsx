import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'
import { scoresService } from '../../services/scores'
import { useNotification } from '../../context/NotificationContext'
import ScoreGauge from './ScoreGauge'
import ScoreHistory from './ScoreHistory'
import LoadingSpinner from '../common/LoadingSpinner'
import './ScoreDisplay.css'

const ScoreDisplay = () => {
  const { data: currentScoreData, loading: currentLoading, execute: fetchCurrentScore } = useApi(scoresService.getCurrent)
  const { data: historyData, loading: historyLoading, execute: fetchHistory } = useApi(scoresService.getHistory)
  const { error: notifyError } = useNotification()

  const [currentScore, setCurrentScore] = useState(0)
  const [scoreHistory, setScoreHistory] = useState([])

  useEffect(() => {
    if (currentScoreData?.score !== undefined) {
      setCurrentScore(currentScoreData.score)
    }
  }, [currentScoreData])

  useEffect(() => {
    if (historyData?.scores) {
      setScoreHistory(historyData.scores)
    }
  }, [historyData])

  const handleRefresh = async () => {
    try {
      await Promise.all([fetchCurrentScore(), fetchHistory()])
    } catch (err) {
      notifyError('Failed to refresh scores')
    }
  }

  const getScoreLevel = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Poor'
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'score-excellent'
    if (score >= 60) return 'score-good'
    if (score >= 40) return 'score-fair'
    return 'score-poor'
  }

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent financial health! Keep up the good work.'
    if (score >= 60) return 'Good financial standing. You\'re on the right track.'
    if (score >= 40) return 'Fair financial situation. Room for improvement.'
    return 'Financial health needs attention. Consider reviewing your habits.'
  }

  const getScoreTips = (score) => {
    const tips = {
      excellent: [
        'Maintain your current financial habits',
        'Consider investment opportunities',
        'Continue tracking your expenses'
      ],
      good: [
        'Build an emergency fund',
        'Review your budget regularly',
        'Consider paying down high-interest debt'
      ],
      fair: [
        'Create a detailed budget',
        'Reduce unnecessary expenses',
        'Focus on increasing your income'
      ],
      poor: [
        'Seek financial counseling if needed',
        'Create a debt repayment plan',
        'Track every expense carefully'
      ]
    }

    if (score >= 80) return tips.excellent
    if (score >= 60) return tips.good
    if (score >= 40) return tips.fair
    return tips.poor
  }

  if (currentLoading || historyLoading) {
    return <LoadingSpinner text="Loading your financial score..." />
  }

  return (
    <div className="score-display">
      <div className="score-header">
        <div className="header-content">
          <h1>Financial Score</h1>
          <p>Your personalized financial health assessment</p>
        </div>
        <button
          onClick={handleRefresh}
          className="refresh-button"
          disabled={currentLoading || historyLoading}
        >
          🔄 Refresh
        </button>
      </div>

      <div className="score-overview">
        <div className="score-main">
          <ScoreGauge score={currentScore} />
          
          <div className="score-details">
            <div className="score-level">
              <span className={`level-badge ${getScoreColor(currentScore)}`}>
                {getScoreLevel(currentScore)}
              </span>
            </div>
            
            <div className="score-message">
              {getScoreMessage(currentScore)}
            </div>

            <div className="score-breakdown">
              <h3>Score Breakdown</h3>
              <div className="breakdown-items">
                <div className="breakdown-item">
                  <div className="breakdown-label">Income Management</div>
                  <div className="breakdown-value">85%</div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-label">Expense Control</div>
                  <div className="breakdown-value">72%</div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-label">Savings Rate</div>
                  <div className="breakdown-value">68%</div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-label">Debt Management</div>
                  <div className="breakdown-value">79%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="score-tips">
          <h3>Tips to Improve</h3>
          <ul className="tips-list">
            {getScoreTips(currentScore).map((tip, index) => (
              <li key={index} className="tip-item">
                <span className="tip-icon">💡</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="score-history-section">
        <ScoreHistory scores={scoreHistory} />
      </div>
    </div>
  )
}

export default ScoreDisplay