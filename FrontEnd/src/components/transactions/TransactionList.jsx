import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'
import { transactionsService } from '../../services/transactions'
import { useNotification } from '../../context/NotificationContext'
import TransactionItem from './TransactionItem'
import TransactionForm from './TransactionForm'
import TransactionFilter from './TransactionFilter'
import LoadingSpinner from '../common/LoadingSpinner'
import './TransactionList.css'

const TransactionList = () => {
  const { data: transactionsData, loading, error, execute: fetchTransactions } = useApi(transactionsService.getAll)
  const { success, error: notifyError } = useNotification()
  
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  useEffect(() => {
    if (transactionsData?.transactions) {
      setTransactions(transactionsData.transactions)
      setFilteredTransactions(transactionsData.transactions)
    }
  }, [transactionsData])

  const handleCreate = async (transactionData) => {
    try {
      const result = await transactionsService.create(transactionData)
      setTransactions(prev => [result, ...prev])
      setFilteredTransactions(prev => [result, ...prev])
      setShowForm(false)
      success('Transaction created successfully!')
    } catch (err) {
      notifyError('Failed to create transaction')
    }
  }

  const handleUpdate = async (id, transactionData) => {
    try {
      const result = await transactionsService.update(id, transactionData)
      setTransactions(prev => prev.map(t => t.id === id ? result : t))
      setFilteredTransactions(prev => prev.map(t => t.id === id ? result : t))
      setEditingTransaction(null)
      success('Transaction updated successfully!')
    } catch (err) {
      notifyError('Failed to update transaction')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return
    }

    try {
      await transactionsService.delete(id)
      setTransactions(prev => prev.filter(t => t.id !== id))
      setFilteredTransactions(prev => prev.filter(t => t.id !== id))
      success('Transaction deleted successfully!')
    } catch (err) {
      notifyError('Failed to delete transaction')
    }
  }

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setShowForm(true)
  }

  const handleFilter = (filters) => {
    let filtered = transactions

    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type)
    }

    if (filters.category) {
      filtered = filtered.filter(t => t.categorie === filters.category)
    }

    if (filters.startDate) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.startDate))
    }

    if (filters.endDate) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.endDate))
    }

    setFilteredTransactions(filtered)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingTransaction(null)
  }

  const categories = [...new Set(transactions.map(t => t.categorie))].filter(Boolean)

  if (loading) {
    return <LoadingSpinner text="Loading transactions..." />
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error loading transactions: {error}</p>
        <button onClick={fetchTransactions} className="retry-button">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="transaction-list">
      <div className="transaction-header">
        <div className="header-content">
          <h1>Transactions</h1>
          <p>Manage your income and expenses</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="add-transaction-button"
        >
          + Add Transaction
        </button>
      </div>

      <TransactionFilter 
        onFilter={handleFilter}
        categories={categories}
      />

      {showForm && (
        <TransactionForm
          transaction={editingTransaction}
          onSubmit={editingTransaction ? handleUpdate : handleCreate}
          onCancel={handleCancel}
        />
      )}

      <div className="transactions-summary">
        <div className="summary-card">
          <div className="summary-label">Total Transactions</div>
          <div className="summary-value">{filteredTransactions.length}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Total Income</div>
          <div className="summary-value income">
            ${filteredTransactions
              .filter(t => t.type === 'income')
              .reduce((sum, t) => sum + parseFloat(t.montant), 0)
              .toLocaleString()}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Total Expenses</div>
          <div className="summary-value expense">
            ${filteredTransactions
              .filter(t => t.type === 'expense')
              .reduce((sum, t) => sum + parseFloat(t.montant), 0)
              .toLocaleString()}
          </div>
        </div>
      </div>

      <div className="transactions-container">
        {filteredTransactions.length === 0 ? (
          <div className="no-transactions">
            <p>No transactions found</p>
            {transactions.length > 0 ? (
              <p>Try adjusting your filters</p>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="add-first-transaction"
              >
                Add Your First Transaction
              </button>
            )}
          </div>
        ) : (
          <div className="transactions-grid">
            {filteredTransactions.map(transaction => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionList