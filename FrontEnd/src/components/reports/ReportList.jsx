import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'
import { reportsService } from '../../services/reports'
import { useNotification } from '../../context/NotificationContext'
import ReportItem from './ReportItem'
import ReportGenerator from './ReportGenerator'
import LoadingSpinner from '../common/LoadingSpinner'
import './ReportList.css'

const ReportList = () => {
  const { data: reportsData, loading, error, execute: fetchReports } = useApi(reportsService.getAll)
  const { success, error: notifyError } = useNotification()
  
  const [reports, setReports] = useState([])
  const [showGenerator, setShowGenerator] = useState(false)

  useEffect(() => {
    if (reportsData?.reports) {
      setReports(reportsData.reports)
    }
  }, [reportsData])

  const handleGenerateReport = async () => {
    try {
      const result = await reportsService.generate()
      setReports(prev => [result.report, ...prev])
      setShowGenerator(false)
      success('Report generated successfully!')
    } catch (err) {
      notifyError('Failed to generate report')
    }
  }

  const handleDownload = async (reportId) => {
    try {
      const result = await reportsService.download(reportId)
      // In a real app, this would trigger a file download
      success('Report download started!')
      console.log('Download result:', result)
    } catch (err) {
      notifyError('Failed to download report')
    }
  }

  const handleDelete = async (reportId) => {
    if (!window.confirm('Are you sure you want to delete this report?')) {
      return
    }

    // In a real app, you would call an API to delete the report
    setReports(prev => prev.filter(report => report.id !== reportId))
    success('Report deleted successfully!')
  }

  if (loading) {
    return <LoadingSpinner text="Loading reports..." />
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error loading reports: {error}</p>
        <button onClick={fetchReports} className="retry-button">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="report-list">
      <div className="report-header">
        <div className="header-content">
          <h1>Financial Reports</h1>
          <p>Generate and download your financial reports</p>
        </div>
        <button
          onClick={() => setShowGenerator(true)}
          className="generate-report-button"
        >
          📊 Generate Report
        </button>
      </div>

      {showGenerator && (
        <ReportGenerator
          onGenerate={handleGenerateReport}
          onCancel={() => setShowGenerator(false)}
        />
      )}

      <div className="reports-container">
        {reports.length === 0 ? (
          <div className="no-reports">
            <div className="no-reports-icon">📋</div>
            <h3>No Reports Yet</h3>
            <p>Generate your first financial report to get started</p>
            <button
              onClick={() => setShowGenerator(true)}
              className="generate-first-report"
            >
              Generate First Report
            </button>
          </div>
        ) : (
          <div className="reports-grid">
            {reports.map(report => (
              <ReportItem
                key={report.id}
                report={report}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportList