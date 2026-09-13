import { useState } from 'react'
import { postJSON } from '../api'

export default function FeedbackForm() {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (rating === 0) {
      setError('Please select a star rating.')
      return
    }
    setStatus('sending')
    setError('')
    try {
      await postJSON('/api/feedback', { phone, name, rating, comment })
      setStatus('sent')
      setPhone('')
      setName('')
      setRating(0)
      setComment('')
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Could not submit feedback. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="feedback-card">
        <h3>Thank You! 🙏</h3>
        <p style={{ color: 'var(--muted)' }}>Your feedback helps us improve our service.</p>
        <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => setStatus('idle')}>
          Submit Another
        </button>
      </div>
    )
  }

  return (
    <form className="feedback-card" onSubmit={handleSubmit}>
      <h3>Rate Your Experience</h3>
      <div className="star-picker" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={`star-btn${n <= (hoverRating || rating) ? ' filled' : ''}`}
            onMouseEnter={() => setHoverRating(n)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(n)}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
          >
            ★
          </button>
        ))}
      </div>
      <div className="form-row">
        <label htmlFor="fb-phone">Phone *</label>
        <input
          id="fb-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="10-digit mobile number"
        />
      </div>
      <div className="form-row">
        <label htmlFor="fb-name">Name</label>
        <input
          id="fb-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>
      <div className="form-row">
        <label htmlFor="fb-comment">Comments</label>
        <textarea
          id="fb-comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about your experience..."
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  )
}
