import { useEffect, useState } from 'react'
import { adminGet, adminPostJSON, adminDelete } from '../api'

export default function FinancialsPanel({ token }) {
  const [transactions, setTransactions] = useState(null)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ type: 'income', description: '', amount: '' })
  const [saving, setSaving] = useState(false)

  function load() {
    adminGet('/api/admin/transactions', token).then(setTransactions).catch((e) => setError(e.message))
  }

  useEffect(load, [token])

  async function handleAdd(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await adminPostJSON('/api/admin/transactions', token, {
        ...form,
        amount: parseFloat(form.amount),
      })
      setForm({ type: 'income', description: '', amount: '' })
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    try {
      await adminDelete(`/api/admin/transactions/${id}`, token)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <form className="admin-inline-form" onSubmit={handleAdd}>
        <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          required
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          required
          min="0.01"
          step="0.01"
          value={form.amount}
          onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
        />
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Adding...' : 'Add Entry'}
        </button>
      </form>

      {error && <p className="form-error">{error}</p>}

      {!transactions ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions recorded yet.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>
                    <span className={`badge-${t.type}`}>{t.type}</span>
                  </td>
                  <td>{t.description}</td>
                  <td>₹{t.amount}</td>
                  <td>{new Date(t.created_at).toLocaleString()}</td>
                  <td>
                    <button className="admin-delete-btn" onClick={() => handleDelete(t.id)}>
                      Delete
                    </button>
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
