import { useEffect, useState } from 'react'
import { adminGet, adminPostJSON, adminDelete } from '../api'

const EMPTY_ITEM = { description: '', quantity: '1', unit_price: '' }

function money(n) {
  return `₹${Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function BillingPanel({ token }) {
  const [bills, setBills] = useState(null)
  const [error, setError] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [items, setItems] = useState([{ ...EMPTY_ITEM }])
  const [taxPercent, setTaxPercent] = useState('0')
  const [warranty, setWarranty] = useState('')
  const [notes, setNotes] = useState('')
  const [creating, setCreating] = useState(false)
  const [lastBill, setLastBill] = useState(null)

  function loadBills() {
    adminGet('/api/admin/bills', token).then(setBills).catch((e) => setError(e.message))
  }

  useEffect(loadBills, [token])

  function updateItem(index, field, value) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [field]: value } : it)))
  }

  function addItem() {
    setItems((prev) => [...prev, { ...EMPTY_ITEM }])
  }

  function removeItem(index) {
    setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev))
  }

  const subtotal = items.reduce((sum, it) => {
    const qty = parseFloat(it.quantity) || 0
    const price = parseFloat(it.unit_price) || 0
    return sum + qty * price
  }, 0)
  const taxAmount = subtotal * ((parseFloat(taxPercent) || 0) / 100)
  const total = subtotal + taxAmount

  async function handleCreate(e) {
    e.preventDefault()
    setCreating(true)
    setError('')
    try {
      const payload = {
        customer_name: customerName,
        customer_phone: customerPhone,
        items: items
          .filter((it) => it.description.trim())
          .map((it) => ({
            description: it.description,
            quantity: parseFloat(it.quantity) || 0,
            unit_price: parseFloat(it.unit_price) || 0,
          })),
        tax_percent: parseFloat(taxPercent) || 0,
        warranty: warranty || null,
        notes: notes || null,
      }
      const bill = await adminPostJSON('/api/admin/bills', token, payload)
      setLastBill(bill)
      setCustomerName('')
      setCustomerPhone('')
      setItems([{ ...EMPTY_ITEM }])
      setTaxPercent('0')
      setWarranty('')
      setNotes('')
      loadBills()
    } catch (err) {
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id) {
    try {
      await adminDelete(`/api/admin/bills/${id}`, token)
      if (lastBill?.id === id) setLastBill(null)
      loadBills()
    } catch (err) {
      setError(err.message)
    }
  }

  function whatsappShareUrl(bill) {
    const message = `Hi ${bill.customer_name}, here is your invoice ${bill.bill_number} from GN Tech Solutions for ${money(bill.total)}. Download it here: ${bill.pdf_url}`
    const phone = bill.customer_phone.replace(/[^0-9]/g, '')
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  return (
    <div>
      <form className="billing-form" onSubmit={handleCreate}>
        <h3>Create Bill</h3>
        <div className="billing-form-row">
          <div className="form-row">
            <label>Customer Name *</label>
            <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Customer Phone *</label>
            <input type="tel" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
          </div>
        </div>

        <label className="billing-items-label">Items</label>
        <div className="billing-items-table">
          <div className="billing-items-head">
            <span>Description</span>
            <span>Qty</span>
            <span>Unit Price</span>
            <span>Amount</span>
            <span></span>
          </div>
          {items.map((item, i) => {
            const amount = (parseFloat(item.quantity) || 0) * (parseFloat(item.unit_price) || 0)
            return (
              <div className="billing-item-row" key={i}>
                <input
                  type="text"
                  placeholder="e.g. Screen replacement"
                  value={item.description}
                  onChange={(e) => updateItem(i, 'description', e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.quantity}
                  onChange={(e) => updateItem(i, 'quantity', e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unit_price}
                  onChange={(e) => updateItem(i, 'unit_price', e.target.value)}
                />
                <span className="billing-item-amount">{money(amount)}</span>
                <button type="button" className="admin-delete-btn" onClick={() => removeItem(i)}>✕</button>
              </div>
            )
          })}
        </div>
        <button type="button" className="billing-add-item" onClick={addItem}>+ Add Item</button>

        <div className="billing-form-row" style={{ marginTop: 16 }}>
          <div className="form-row">
            <label>Tax %</label>
            <input type="number" min="0" max="100" step="0.01" value={taxPercent} onChange={(e) => setTaxPercent(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Warranty (optional)</label>
            <input
              type="text"
              placeholder="e.g. 3 months on parts and labor"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row" style={{ marginTop: 12 }}>
          <label>Notes (optional)</label>
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div className="billing-totals">
          <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
          <div><span>Tax</span><strong>{money(taxAmount)}</strong></div>
          <div className="billing-total-final"><span>Total</span><strong>{money(total)}</strong></div>
        </div>

        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={creating}>
          {creating ? 'Generating...' : 'Generate Bill (PDF)'}
        </button>
      </form>

      {lastBill && (
        <div className="billing-success">
          <h4>{lastBill.bill_number} created ✅</h4>
          <p>Total: {money(lastBill.total)}</p>
          {lastBill.warranty && <p>Warranty: {lastBill.warranty}</p>}
          <div className="billing-success-actions">
            <a className="btn-primary" href={lastBill.pdf_url} target="_blank" rel="noopener">
              Download PDF
            </a>
            <a className="btn-primary" style={{ background: '#25D366' }} href={whatsappShareUrl(lastBill)} target="_blank" rel="noopener">
              💬 Share via WhatsApp
            </a>
          </div>
        </div>
      )}

      <h3 style={{ marginTop: 32, marginBottom: 14 }}>Past Bills</h3>
      {!bills ? (
        <p>Loading bills...</p>
      ) : bills.length === 0 ? (
        <p>No bills created yet.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Total</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b) => (
                <tr key={b.id}>
                  <td>{b.bill_number}</td>
                  <td>{b.customer_name}</td>
                  <td>{b.customer_phone}</td>
                  <td>{money(b.total)}</td>
                  <td>{new Date(b.created_at).toLocaleDateString()}</td>
                  <td className="billing-row-actions">
                    <a href={b.pdf_url} target="_blank" rel="noopener">PDF</a>
                    <a href={whatsappShareUrl(b)} target="_blank" rel="noopener">Share</a>
                    <button className="admin-delete-btn" onClick={() => handleDelete(b.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
