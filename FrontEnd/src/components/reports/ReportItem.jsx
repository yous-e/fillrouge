import React from 'react'
import './ReportItem.css'

const ReportItem = ({ report, onDownload, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFileSize = () => {
    // Mock file size - in real app this would come from the API
    const sizes = ['2.1 MB', '1.8 MB', '2.5 MB', '3.2 MB']
    return sizes[Math.floor(Math.random() * sizes.length)]
  }

  const getReportType = (fileName) => {
    if (fileName.includes('monthly')) return 'Monthly Report'
    if (fileName.includes('quarterly')) return 'Quarterly Report'
    if (fileName.includes('annual')) return 'Annual Report'
    return 'Financial Report'
  }

  const handleDownload = () => {
    onDownload(report.id)
  }

  const handleDelete = () => {
    onDelete(report.id)
  }

  return (
    <div className="report-item">
      <div className="report-icon">
        📊
      </div>

      <div className="report-details">
        <div className="report-title">
          {getReportType(report.fichier_pdf)}
        </div>
        <div className="report-meta">
          <span className="report-filename">{report.fichier_pdf}</span>
          <span className="report-size">{getFileSize()}</span>
          <span className="report-date">{formatDate(report.date_export)}</span>
        </div>
      </div>

      <div className="report-actions">
        <button
          onClick={handleDownload}
          className="action-button download-button"
          aria-label="Download report"
          title="Download Report"
        >
          ⬇️ Download
        </button>
        <button
          onClick={handleDelete}
          className="action-button delete-button"
          aria-label="Delete report"
          title="Delete Report"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default ReportItem