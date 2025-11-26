
import React from 'react'
import './RecentTransactions.css'

const RecentTransactions = ({ transactions }) => {
  const getTypeIcon = (type) => {
    const icons = {
      income: '💰',
      expense: '💸',
      debt: '🏦'
    }
    return icons[type] || '💳'
  }

  const getTypeColor = (type) => {
    const colors = {
      income: 'transaction-income',
      expense: 'transaction-expense',
      debt: 'transaction-debt'
    }
    return colors[type] || 'transaction-default'
  }

  const formatAmount = (amount, type) => {
    const sign = type === 'income' ? '+' : '-'
    return `${sign} $${Math.abs(amount).toLocaleString()}`
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="recent-transactions">
      <div className="section-header">
        <h3>Recent Transactions</h3>
        <a href="/transactions" className="view-all-link">
          View All →
        </a>
      </div>

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <div className="no-transactions">
            <p>No transactions yet</p>
            <a href="/transactions" className="add-transaction-link">
              Add your first transaction
            </a>
          </div>
        ) : (
          transactions.map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-icon">
                {getTypeIcon(transaction.type)}
              </div>
              
              <div className="transaction-details">
                <div className="transaction-category">
                  {transaction.category}
                </div>
                <div className="transaction-date">
                  {formatDate(transaction.date)}
                </div>
              </div>

              <div className={`transaction-amount ${getTypeColor(transaction.type)}`}>
                {formatAmount(transaction.amount, transaction.type)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RecentTransactions