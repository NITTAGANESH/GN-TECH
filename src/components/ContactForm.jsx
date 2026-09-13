import { useState } from 'react'
import { postJSON, uploadFile } from '../api'

const MAX_PHOTO_BYTES = 8 * 1024 * 1024 // 8MB, matches backend limit

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [photo, setPhoto] = useState(null)
  const [photoError, setPhotoError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const [photoWarning, setPhotoWarning] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0] || null
    if (file && file.size > MAX_PHOTO_BYTES) {
      setPhotoError('That photo is too large (max 8MB). Please choose a smaller one.')
      setPhoto(null)
      e.target.value = ''
      return
    }
    setPhotoError('')
    setPhoto(file)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    setPhotoWarning('')

    // The contact message and the optional photo are sent as two separate
    // requests. If the photo upload fails (slow connection, backend still
    // waking up from Render's free-tier sleep, etc.) the message itself
    // has still gone through - so that failure must not blank out the
    // "message sent" confirmation, it should only surface as a soft warning.
    try {
      await postJSON('/api/contacts', form)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Could not send your message. Please try calling us instead.')
      return
    }

    if (photo) {
      try {
        const formData = new FormData()
        formData.append('file', photo)
        formData.append('phone', form.phone)
        formData.append('name', form.name)
        await uploadFile('/api/uploads', formData)
      } catch {
        setPhotoWarning('Your message was sent, but the photo failed to upload. You can send it again via WhatsApp.')
      }
    }

    setStatus('sent')
    setForm({ name: '', phone: '', message: '' })
    setPhoto(null)
  }

  if (status === 'sent') {
    return (
      <div className="contact-card">
        <h3>Message Sent ✅</h3>
        <p style={{ color: 'var(--muted)' }}>
          Thanks for reaching out! We'll get back to you on your phone number shortly.
        </p>
        {photoWarning && <p className="form-error" style={{ marginTop: 12 }}>{photoWarning}</p>}
        <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => setStatus('idle')}>
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form className="contact-card" onSubmit={handleSubmit}>
      <h3>Send Us a Message</h3>
      <div className="form-row">
        <label htmlFor="cf-name">Name</label>
        <input
          id="cf-name"
          type="text"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="Your name"
        />
      </div>
      <div className="form-row">
        <label htmlFor="cf-phone">Phone *</label>
        <input
          id="cf-phone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="10-digit mobile number"
        />
      </div>
      <div className="form-row">
        <label htmlFor="cf-message">What do you need help with? *</label>
        <textarea
          id="cf-message"
          required
          rows={4}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Describe the issue with your device..."
        />
      </div>
      <div className="form-row">
        <label htmlFor="cf-photo">Attach a photo (optional)</label>
        <input
          id="cf-photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handlePhotoChange}
        />
        {photoError && <p className="form-error" style={{ marginTop: 6 }}>{photoError}</p>}
      </div>
      {status === 'error' && <p className="form-error">{error}</p>}
      <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
