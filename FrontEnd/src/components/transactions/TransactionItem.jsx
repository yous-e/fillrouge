import React from 'react'
import './TransactionItem.css'

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const getTypeIcon = (type) => {
    const icons = {
      income: '💰',
      expense: '💸',
      dette: '🏦'
    }
    return icons[type] || '💳'
  }

  const getTypeColor = (type) => {
    const colors = {
      income: 'type-income',
      expense: 'type-expense',
      dette: 'type-debt'
    }
    return colors[type] || 'type-default'
  }

  const getTypeLabel = (type) => {
    const labels = {
      income: 'Income',
      expense: 'Expense',
      dette: 'Debt'
    }
    return labels[type] || type
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

  const handleEdit = () => {
    onEdit(transaction)
  }

  const handleDelete = () => {
    onDelete(transaction.id)
  }

  return (
    <div className="transaction-item">
      <div className="transaction-main">
        <div className="transaction-icon">
          {getTypeIcon(transaction.type)}
        </div>
        
        <div className="transaction-details">
          <div className="transaction-category">
            {transaction.categorie}
          </div>
          <div className="transaction-meta">
            <span className={`transaction-type ${getTypeColor(transaction.type)}`}>
              {getTypeLabel(transaction.type)}
            </span>
            <span className="transaction-date">
              {formatDate(transaction.date)}
            </span>
          </div>
        </div>

        <div className="transaction-amount-container">
          <div className={`transaction-amount ${getTypeColor(transaction.type)}`}>
            {formatAmount(transaction.montant, transaction.type)}
          </div>
        </div>
      </div>

      <div className="transaction-actions">
        <button
          onClick={handleEdit}
          className="action-button edit-button"
          aria-label="Edit transaction"
        >
          ✏️
        </button>
        <button
          onClick={handleDelete}
          className="action-button delete-button"
          aria-label="Delete transaction"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default TransactionItem