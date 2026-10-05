import { useEffect, useState } from 'react'
import { getJSON } from '../api'
import FeedbackForm from './FeedbackForm'

function Stars({ value }) {
  const n = Math.round(value || 0)
  return <>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</>
}

export default function Reviews() {
  const [live, setLive] = useState(null)

  useEffect(() => {
    getJSON('/api/reviews')
      .then((d) => d.configured && setLive(d))
      .catch(() => {})
  }, [])

  const rating = live?.rating ?? 5.0
  const total = live?.total ?? 31

  return (
    <section id="reviews">
      <div className="section-title">
        <span>Testimonials</span>
        <h2>Rated {Number(rating).toFixed(1)} on Google</h2>
        <p>Trusted by {total} customers on Google — here's what a few of them said.</p>
      </div>
      <div className="reviews-badge">
        <div className="score">{Number(rating).toFixed(1)}</div>
        <div className="stars"><Stars value={rating} /></div>
        <p>Based on <strong>{total} Google Reviews</strong></p>
        {(live?.write_url || live?.maps_url) && (
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 14 }}>
            {live.write_url && (
              <a className="btn-primary" href={live.write_url} target="_blank" rel="noopener" style={{ padding: '10px 20px', fontSize: '.88rem' }}>
                ★ Write a Google review
              </a>
            )}
            {live.maps_url && (
              <a className="btn-secondary" href={live.maps_url} target="_blank" rel="noopener" style={{ padding: '10px 20px', fontSize: '.88rem', border: '1px solid var(--border)' }}>
                See all reviews on Google
              </a>
            )}
          </div>
        )}
      </div>

      <div className="reviewers-grid">
        {live && live.reviews.length > 0 ? (
          live.reviews.map((r, i) => (
            <div className="reviewer-card" key={i}>
              <div className="reviewer-head">
                {r.photo ? (
                  <img className="reviewer-avatar" src={r.photo} alt="" referrerPolicy="no-referrer" />
                ) : (
                  <div className="reviewer-avatar">{(r.author || 'G')[0]}</div>
                )}
                <div>
                  <h4>{r.author}</h4>
                  <p className="stars"><Stars value={r.rating} /></p>
                </div>
              </div>
              {r.text && <p>"{r.text}"</p>}
              {r.when && <p style={{ fontStyle: 'normal', fontSize: '.78rem', marginTop: 6 }}>{r.when}</p>}
            </div>
          ))
        ) : (
          <>
            <div className="reviewer-card">
              <div className="reviewer-head">
                <div className="reviewer-avatar">G</div>
                <div><h4>Google Reviewer</h4><p className="stars">★★★★★</p></div>
              </div>
              <p>"Excellent service strongly recommend this place👍"</p>
            </div>
            <div className="reviewer-card">
              <div className="reviewer-head">
                <div className="reviewer-avatar">G</div>
                <div><h4>Google Reviewer</h4><p className="stars">★★★★★</p></div>
              </div>
              <p>"Very less prices and good quality services"</p>
            </div>
          </>
        )}
      </div>

      <div style={{ maxWidth: 480, margin: '48px auto 0' }}>
        <FeedbackForm />
      </div>
    </section>
  )
}
