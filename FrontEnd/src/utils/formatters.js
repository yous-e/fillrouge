// Format transaction amount with sign
export const formatTransactionAmount = (amount, type) => {
  const sign = type === 'income' ? '+' : '-'
  return `${sign} $${Math.abs(amount).toLocaleString()}`
}

// Format score for display
export const formatScore = (score) => {
  return `${Math.round(score)}/100`
}

// Format percentage
export const formatPercentage = (value, total) => {
  if (total === 0) return '0%'
  const percentage = (value / total) * 100
  return `${percentage.toFixed(1)}%`
}

// Format date range
export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  if (start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
  }
  
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
}

// Format file name
export const formatFileName = (filename) => {
  return filename.replace(/_/g, ' ').replace(/\.[^/.]+$/, '')
}

// Format user role
export const formatUserRole = (role) => {
  return role.charAt(0).toUpperCase() + role.slice(1)
}

// Format transaction type
export const formatTransactionType = (type) => {
  const types = {
    income: 'Income',
    expense: 'Expense',
    dette: 'Debt'
  }
  return types[type] || type
}

// Format large numbers
export const formatLargeNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Format duration
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}