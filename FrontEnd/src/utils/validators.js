// Email validation
export const validateEmail = (email) => {
  if (!email) return 'Email is required'
  if (!/^\S+@\S+\.\S+$/.test(email)) return 'Email is invalid'
  return null
}

// Password validation
export const validatePassword = (password) => {
  if (!password) return 'Password is required'
  if (password.length < 6) return 'Password must be at least 6 characters'
  return null
}

// Name validation
export const validateName = (name) => {
  if (!name) return 'Name is required'
  if (name.length < 2) return 'Name must be at least 2 characters'
  if (name.length > 50) return 'Name must be less than 50 characters'
  return null
}

// Amount validation
export const validateAmount = (amount) => {
  if (!amount && amount !== 0) return 'Amount is required'
  if (isNaN(amount)) return 'Amount must be a number'
  if (parseFloat(amount) <= 0) return 'Amount must be greater than 0'
  return null
}

// Category validation
export const validateCategory = (category) => {
  if (!category) return 'Category is required'
  if (category.length < 2) return 'Category must be at least 2 characters'
  return null
}

// Date validation
export const validateDate = (date) => {
  if (!date) return 'Date is required'
  if (isNaN(new Date(date).getTime())) return 'Date is invalid'
  return null
}

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password'
  if (password !== confirmPassword) return 'Passwords do not match'
  return null
}

// Transaction type validation
export const validateTransactionType = (type) => {
  const validTypes = ['income', 'expense', 'dette']
  if (!type) return 'Type is required'
  if (!validTypes.includes(type)) return 'Type is invalid'
  return null
}

// Role validation
export const validateRole = (role) => {
  const validRoles = ['admin', 'user']
  if (!role) return 'Role is required'
  if (!validRoles.includes(role)) return 'Role is invalid'
  return null
}

// Form validator
export const createValidator = (rules) => {
  return (values) => {
    const errors = {}
    Object.keys(rules).forEach(field => {
      const rule = rules[field]
      const value = values[field]
      const error = rule(value, values)
      if (error) {
        errors[field] = error
      }
    })
    return errors
  }
}