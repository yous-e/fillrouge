import React, { useState } from 'react'
import './TransactionFilter.css'

const TransactionFilter = ({ onFilter, categories }) => {
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    startDate: '',
    endDate: ''
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      type: '',
      category: '',
      startDate: '',
      endDate: ''
    }
    setFilters(clearedFilters)
    onFilter(clearedFilters)
  }

  const transactionTypes = [
    { value: '', label: 'All Types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
    { value: 'dette', label: 'Debt' }
  ]

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <div className="transaction-filter">
      <div className="filter-header">
        <h4>Filter Transactions</h4>
        {hasActiveFilters && (
          <button 
            onClick={handleClearFilters}
            className="clear-filters-button"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="filter-type" className="filter-label">
            Type
          </label>
          <select
            id="filter-type"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="filter-select"
          >
            {transactionTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-category" className="filter-label">
            Category
          </label>
          <select
            id="filter-category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-start-date" className="filter-label">
            From Date
          </label>
          <input
            type="date"
            id="filter-start-date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="filter-end-date" className="filter-label">
            To Date
          </label>
          <input
            type="date"
            id="filter-end-date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            className="filter-input"
          />
        </div>
      </div>
    </div>
  )
}

export default TransactionFilter