import React, { useState } from 'react'
import LoadingSpinner from '../common/LoadingSpinner'
import './ReportGenerator.css'

const ReportGenerator = ({ onGenerate, onCancel }) => {
  const [reportType, setReportType] = useState('monthly')
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })
  const [includeCharts, setIncludeCharts] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)

  const reportTypes = [
    { value: 'monthly', label: 'Monthly Summary', description: 'Overview of the current month' },
    { value: 'quarterly', label: 'Quarterly Report', description: 'Last 3 months analysis' },
    { value: 'yearly', label: 'Annual Report', description: 'Complete year overview' },
    { value: 'custom', label: 'Custom Range', description: 'Specific date range' }
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      await onGenerate({
        type: reportType,
        dateRange: reportType === 'custom' ? dateRange : undefined,
        includeCharts
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="report-generator-overlay">
      <div className="report-generator-container">
        <div className="generator-header">
          <h3>Generate Financial Report</h3>
          <button 
            onClick={onCancel}
            className="close-button"
            aria-label="Close generator"
            disabled={isGenerating}
          >
            ✕
          </button>
        </div>

        <div className="generator-content">
          <div className="form-section">
            <h4>Report Type</h4>
            <div className="report-type-grid">
              {reportTypes.map(type => (
                <div key={type.value} className="report-type-card">
                  <input
                    type="radio"
                    id={`type-${type.value}`}
                    name="reportType"
                    value={type.value}
                    checked={reportType === type.value}
                    onChange={(e) => setReportType(e.target.value)}
                    className="type-radio"
                    disabled={isGenerating}
                  />
                  <label htmlFor={`type-${type.value}`} className="type-label">
                    <div className="type-title">{type.label}</div>
                    <div className="type-description">{type.description}</div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {reportType === 'custom' && (
            <div className="form-section">
              <h4>Date Range</h4>
              <div className="date-range-inputs">
                <div className="input-group">
                  <label htmlFor="startDate" className="input-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={dateRange.startDate}
                    onChange={(e) => handleDateChange('startDate', e.target.value)}
                    className="date-input"
                    disabled={isGenerating}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="endDate" className="input-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={dateRange.endDate}
                    onChange={(e) => handleDateChange('endDate', e.target.value)}
                    className="date-input"
                    disabled={isGenerating}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="form-section">
            <h4>Report Options</h4>
            <div className="options-list">
              <label className="option-checkbox">
                <input
                  type="checkbox"
                  checked={includeCharts}
                  onChange={(e) => setIncludeCharts(e.target.checked)}
                  disabled={isGenerating}
                />
                <span className="checkmark"></span>
                Include Charts and Graphs
              </label>
              <label className="option-checkbox">
                <input
                  type="checkbox"
                  defaultChecked
                  disabled={isGenerating}
                />
                <span className="checkmark"></span>
                Include Transaction Details
              </label>
              <label className="option-checkbox">
                <input
                  type="checkbox"
                  defaultChecked
                  disabled={isGenerating}
                />
                <span className="checkmark"></span>
                Include Financial Score Analysis
              </label>
            </div>
          </div>

          <div className="preview-section">
            <h4>Report Preview</h4>
            <div className="preview-card">
              <div className="preview-content">
                <div className="preview-header">
                  <div className="preview-title">
                    {reportTypes.find(t => t.value === reportType)?.label} Report
                  </div>
                  <div className="preview-date">
                    {reportType === 'custom' 
                      ? `${new Date(dateRange.startDate).toLocaleDateString()} - ${new Date(dateRange.endDate).toLocaleDateString()}`
                      : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                    }
                  </div>
                </div>
                <div className="preview-stats">
                  <div className="preview-stat">
                    <div className="stat-label">Transactions</div>
                    <div className="stat-value">24</div>
                  </div>
                  <div className="preview-stat">
                    <div className="stat-label">Total Income</div>
                    <div className="stat-value">$12,500</div>
                  </div>
                  <div className="preview-stat">
                    <div className="stat-label">Total Expenses</div>
                    <div className="stat-value">$8,400</div>
                  </div>
                  <div className="preview-stat">
                    <div className="stat-label">Financial Score</div>
                    <div className="stat-value">76/100</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="generator-actions">
          <button
            type="button"
            onClick={onCancel}
            className="cancel-button"
            disabled={isGenerating}
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            className="generate-button"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <LoadingSpinner size="small" text="Generating..." />
            ) : (
              'Generate Report'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportGenerator