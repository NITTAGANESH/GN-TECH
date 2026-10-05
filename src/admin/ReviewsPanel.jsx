import { useEffect, useState } from 'react'
import { adminGet, adminDelete, adminRequest } from '../api'

export default function ReviewsPanel({ token }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [summary, setSummary] = useState({ rating: '', total: '', maps_url: '', write_url: '' })
  const [review, setReview] = useState({ author: '', rating: '5', text: '', when: '' })

  function apply(d) {
    setData(d)
    setSummary({
      rating: d.rating ?? '',
      total: d.total ?? '',
      maps_url: d.maps_url ?? '',
      write_url: d.write_url ?? '',
    })
  }

  useEffect(() => {
    adminGet('/api/admin/reviews', token).then(apply).catch((e) => setError(e.message))
  }, [token])

  async function saveSummary(e) {
    e.preventDefault()
    setError('')
    setSaved(false)
    try {
      const d = await adminRequest('/api/admin/reviews/summary', token, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: summary.rating === '' ? null : parseFloat(summary.rating),
          total: summary.total === '' ? null : parseInt(summary.total, 10),
          maps_url: summary.maps_url || null,
          write_url: summary.write_url || null,
        }),
      })
      apply(d)
      setSaved(true)
    } catch (err) {
      setError(err.message)
    }
  }

  async function addReview(e) {
    e.preventDefault()
    setError('')
    try {
      const d = await adminRequest('/api/admin/reviews/items', token, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...review, rating: parseInt(review.rating, 10) }),
      })
      apply(d)
      setReview({ author: '', rating: '5', text: '', when: '' })
    } catch (err) {
      setError(err.message)
    }
  }

  async function remove(id) {
    try {
      apply(await adminDelete(`/api/admin/reviews/items/${id}`, token))
    } catch (err) {
      setError(err.message)
    }
  }

  if (!data) return error ? <p className="form-error">{error}</p> : <p>Loading...</p>

  return (
    <div>
      <p style={{ color: 'var(--muted)', marginBottom: 16, fontSize: '.9rem' }}>
        Copy your rating, review count and best reviews from your Google Business Profile. The website
        shows them in the Reviews section. Leave everything empty to show the default content.
      </p>

      <form className="billing-form" onSubmit={saveSummary}>
        <h3>Google Rating &amp; Links</h3>
        <div className="billing-form-row">
          <div className="form-row">
            <label>Rating (0–5)</label>
            <input type="number" step="0.1" min="0" max="5" value={summary.rating} onChange={(e) => setSummary({ ...summary, rating: e.target.value })} />
          </div>
          <div className="form-row">
            <label>Total reviews</label>
            <input type="number" min="0" value={summary.total} onChange={(e) => setSummary({ ...summary, total: e.target.value })} />
          </div>
        </div>
        <div className="form-row">
          <label>"See all reviews" link (your Google Maps profile URL)</label>
          <input type="url" placeholder="https://www.google.com/maps/place/..." value={summary.maps_url} onChange={(e) => setSummary({ ...summary, maps_url: e.target.value })} />
        </div>
        <div className="form-row">
          <label>"Write a review" link (Google Business Profile → Ask for reviews)</label>
          <input type="url" placeholder="https://g.page/r/.../review" value={summary.write_url} onChange={(e) => setSummary({ ...summary, write_url: e.target.value })} />
        </div>
        {error && <p className="form-error">{error}</p>}
        {saved && <p style={{ color: '#1b8a3c', fontSize: '.85rem' }}>Saved ✓</p>}
        <button type="submit" className="btn-primary">Save</button>
      </form>

      <form className="billing-form" onSubmit={addReview}>
        <h3>Add a Review</h3>
        <div className="billing-form-row">
          <div className="form-row">
            <label>Reviewer name *</label>
            <input type="text" required value={review.author} onChange={(e) => setReview({ ...review, author: e.target.value })} />
          </div>
          <div className="form-row">
            <label>Stars</label>
            <select value={review.rating} onChange={(e) => setReview({ ...review, rating: e.target.value })}>
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}
            </select>
          </div>
        </div>
        <div className="form-row">
          <label>Review text</label>
          <textarea rows={3} value={review.text} onChange={(e) => setReview({ ...review, text: e.target.value })} />
        </div>
        <div className="form-row">
          <label>When (optional, e.g. "2 weeks ago")</label>
          <input type="text" value={review.when} onChange={(e) => setReview({ ...review, when: e.target.value })} />
        </div>
        <button type="submit" className="btn-primary">Add Review</button>
      </form>

      <h3 style={{ margin: '24px 0 12px' }}>Shown on the site</h3>
      {data.reviews.length === 0 ? (
        <p>No reviews added yet.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Stars</th><th>Review</th><th></th></tr></thead>
            <tbody>
              {data.reviews.map((r) => (
                <tr key={r.id}>
                  <td>{r.author}</td>
                  <td>{'★'.repeat(r.rating)}</td>
                  <td style={{ whiteSpace: 'normal', maxWidth: 360 }}>{r.text || '—'}</td>
                  <td><button className="admin-delete-btn" onClick={() => remove(r.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
