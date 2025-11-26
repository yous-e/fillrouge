import React, { useEffect } from 'react'
import { useForm } from '../../hooks/useForm'
import LoadingSpinner from '../common/LoadingSpinner'
import './TransactionForm.css'

const TransactionForm = ({ transaction, onSubmit, onCancel }) => {
  const isEditing = !!transaction

  const { values, errors, touched, handleChange, handleBlur, validateForm, reset } = useForm(
    {
      type: transaction?.type || 'expense',
      amount: transaction?.montant || '',
      category: transaction?.categorie || '',
      date: transaction?.date ? new Date(transaction.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    },
    (values) => {
      const errors = {}
      
      if (!values.type) {
        errors.type = 'Type is required'
      }
      
      if (!values.amount) {
        errors.amount = 'Amount is required'
      } else if (parseFloat(values.amount) <= 0) {
        errors.amount = 'Amount must be greater than 0'
      }
      
      if (!values.category) {
        errors.category = 'Category is required'
      } else if (values.category.length < 2) {
        errors.category = 'Category must be at least 2 characters'
      }
      
      if (!values.date) {
        errors.date = 'Date is required'
      }
      
      return errors
    }
  )

  useEffect(() => {
    if (transaction) {
      reset({
        type: transaction.type,
        amount: transaction.montant,
        category: transaction.categorie,
        date: new Date(transaction.date).toISOString().split('T')[0],
      })
    }
  }, [transaction, reset])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const transactionData = {
      type: values.type,
      amount: parseFloat(values.amount),
      category: values.category,
      date: values.date,
    }

    if (isEditing) {
      await onSubmit(transaction.id, transactionData)
    } else {
      await onSubmit(transactionData)
    }
  }

  const transactionTypes = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
    { value: 'dette', label: 'Debt' }
  ]

  const commonCategories = {
    income: ['Salary', 'Freelance', 'Investment', 'Bonus', 'Other Income'],
    expense: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Healthcare', 'Education', 'Other Expense'],
    dette: ['Loan', 'Credit Card', 'Mortgage', 'Other Debt']
  }

  return (
    <div className="transaction-form-overlay">
      <div className="transaction-form-container">
        <div className="form-header">
          <h3>{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</h3>
          <button 
            onClick={onCancel}
            className="close-button"
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        <form className="transaction-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="type" className="form-label">
                Type *
              </label>
              <select
                id="type"
                name="type"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-select ${errors.type && touched.type ? 'error' : ''}`}
              >
                {transactionTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.type && touched.type && (
                <div className="form-error">{errors.type}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="amount" className="form-label">
                Amount *
              </label>
              <div className="amount-input-container">
                <span className="currency-symbol">$</span>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.amount && touched.amount ? 'error' : ''}`}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              {errors.amount && touched.amount && (
                <div className="form-error">{errors.amount}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category *
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.category && touched.category ? 'error' : ''}`}
              placeholder="Enter category"
              list="category-suggestions"
            />
            <datalist id="category-suggestions">
              {commonCategories[values.type]?.map(category => (
                <option key={category} value={category} />
              ))}
            </datalist>
            {errors.category && touched.category && (
              <div className="form-error">{errors.category}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.date && touched.date ? 'error' : ''}`}
            />
            {errors.date && touched.date && (
              <div className="form-error">{errors.date}</div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
            >
              {isEditing ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionForm