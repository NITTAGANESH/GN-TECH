import { useEffect, useState } from 'react'
import { adminGet } from '../api'

export default function FeedbackPanel({ token }) {
  const [feedback, setFeedback] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    adminGet('/api/admin/feedback', token).then(setFeedback).catch((e) => setError(e.message))
  }, [token])

  if (error) return <p className="form-error">{error}</p>
  if (!feedback) return <p>Loading feedback...</p>
  if (feedback.length === 0) return <p>No feedback submitted yet.</p>

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Phone</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((f) => (
            <tr key={f.id}>
              <td>{f.phone}</td>
              <td>{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</td>
              <td>{f.comment || '—'}</td>
              <td>{new Date(f.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
