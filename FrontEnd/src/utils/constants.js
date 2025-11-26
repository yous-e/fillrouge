// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout',
    PROFILE: '/profile'
  },
  TRANSACTIONS: '/transactions',
  SCORES: {
    CURRENT: '/score',
    HISTORY: '/score/history',
    LATEST: '/score/latest'
  },
  REPORTS: {
    GENERATE: '/reports/generate',
    LIST: '/reports',
    DOWNLOAD: '/reports/:id/download'
  },
  ADMIN: {
    USERS: '/admin/users',
    USER_ROLE: '/admin/users/:id/role',
    STATS: '/admin/stats'
  }
}

// Transaction Types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
  DEBT: 'dette'
}

// Transaction Categories
export const TRANSACTION_CATEGORIES = {
  INCOME: ['Salary', 'Freelance', 'Investment', 'Bonus', 'Other Income'],
  EXPENSE: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Healthcare', 'Education', 'Other Expense'],
  DEBT: ['Loan', 'Credit Card', 'Mortgage', 'Other Debt']
}

// Score Levels
export const SCORE_LEVELS = {
  EXCELLENT: { min: 80, label: 'Excellent', color: 'success' },
  GOOD: { min: 60, label: 'Good', color: 'primary' },
  FAIR: { min: 40, label: 'Fair', color: 'warning' },
  POOR: { min: 0, label: 'Poor', color: 'error' }
}

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
}

// Report Types
export const REPORT_TYPES = {
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  CUSTOM: 'custom'
}

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'token',
  USER_DATA: 'user_data',
  THEME: 'theme'
}

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
  TIME: 'hh:mm a'
}

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [10, 25, 50, 100]
}