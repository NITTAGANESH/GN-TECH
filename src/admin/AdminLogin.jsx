import { useState } from 'react'
import { adminGet } from '../api'

export default function AdminLogin({ onLogin }) {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setChecking(true)
    setError('')
    try {
      await adminGet('/api/admin/stats', token)
      sessionStorage.setItem('gn-tech-admin-token', token)
      onLogin(token)
    } catch {
      setError('Incorrect admin password.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="admin-login-wrap">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <p>GN Tech Solutions — Business Dashboard</p>
        <input
          type="password"
          placeholder="Admin password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          autoFocus
        />
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={checking}>
          {checking ? 'Checking...' : 'Log In'}
        </button>
      </form>
    </div>
  )
}
