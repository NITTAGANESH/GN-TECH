import { useEffect, useState } from 'react'
import { adminGet } from '../api'

const CARDS = [
  { key: 'total_customers', label: 'Total Customers' },
  { key: 'total_contacts', label: 'Contact Messages' },
  { key: 'total_feedback', label: 'Feedback Received' },
  { key: 'average_rating', label: 'Average Rating', suffix: '★' },
  { key: 'total_chat_messages', label: 'Chat Messages' },
  { key: 'total_uploads', label: 'Customer Uploads' },
]

export default function StatsPanel({ token }) {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    adminGet('/api/admin/stats', token).then(setStats).catch((e) => setError(e.message))
  }, [token])

  if (error) return <p className="form-error">{error}</p>
  if (!stats) return <p>Loading stats...</p>

  return (
    <div>
      <div className="admin-stats-grid">
        {CARDS.map((c) => (
          <div className="admin-stat-card" key={c.key}>
            <div className="admin-stat-value">
              {stats[c.key]}
              {c.suffix || ''}
            </div>
            <div className="admin-stat-label">{c.label}</div>
          </div>
        ))}
      </div>
      <div className="admin-stats-grid" style={{ marginTop: 18 }}>
        <div className="admin-stat-card income">
          <div className="admin-stat-value">₹{stats.total_income}</div>
          <div className="admin-stat-label">Total Income</div>
        </div>
        <div className="admin-stat-card expense">
          <div className="admin-stat-value">₹{stats.total_expense}</div>
          <div className="admin-stat-label">Total Expenses</div>
        </div>
        <div className="admin-stat-card profit">
          <div className="admin-stat-value">₹{stats.net_profit}</div>
          <div className="admin-stat-label">Net Profit</div>
        </div>
      </div>
    </div>
  )
}
