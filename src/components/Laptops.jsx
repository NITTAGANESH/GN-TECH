import { useEffect, useState } from 'react'
import { getJSON } from '../api'
import { WHATSAPP_URL } from '../constants'

export default function Laptops() {
  const [laptops, setLaptops] = useState([])

  useEffect(() => {
    getJSON('/api/gallery?category=laptop')
      .then(setLaptops)
      .catch(() => {})
  }, [])

  // Nothing to show until a laptop has been uploaded from the admin.
  if (laptops.length === 0) return null

  return (
    <section id="laptops">
      <div className="section-title">
        <span>For Sale</span>
        <h2>Laptops Available</h2>
        <p>
          Currently available at the shop. Call or{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" style={{ color: 'var(--blue)', fontWeight: 600 }}>
            WhatsApp us
          </a>{' '}
          for price and details.
        </p>
      </div>
      <div className="products-grid">
        {laptops.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.url} alt={item.title || 'Laptop'} />
            <p>{item.title || 'Laptop'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
