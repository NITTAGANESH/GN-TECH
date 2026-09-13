import { useEffect, useState } from 'react'
import { adminGet, adminUpload, adminDelete } from '../api'

export default function GalleryPanel({ token }) {
  const [images, setImages] = useState(null)
  const [error, setError] = useState('')
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('gallery')
  const [uploading, setUploading] = useState(false)

  function load() {
    adminGet('/api/admin/gallery', token).then(setImages).catch((e) => setError(e.message))
  }

  useEffect(load, [token])

  async function handleUpload(e) {
    e.preventDefault()
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('category', category)
      await adminUpload('/api/admin/gallery', token, formData)
      setFile(null)
      setTitle('')
      document.getElementById('admin-gallery-file').value = ''
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id) {
    try {
      await adminDelete(`/api/admin/gallery/${id}`, token)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <form className="admin-inline-form" onSubmit={handleUpload}>
        <input
          id="admin-gallery-file"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="gallery">Gallery (Our Work)</option>
          <option value="product">Product</option>
        </select>
        <button type="submit" className="btn-primary" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {error && <p className="form-error">{error}</p>}

      {!images ? (
        <p>Loading images...</p>
      ) : images.length === 0 ? (
        <p>No images added yet.</p>
      ) : (
        <div className="admin-gallery-grid">
          {images.map((img) => (
            <div className="admin-gallery-item" key={img.id}>
              <img src={img.url} alt={img.title || 'Gallery image'} />
              <div className="admin-gallery-meta">
                <span>{img.title || '(no title)'}</span>
                <span className="admin-gallery-category">{img.category}</span>
              </div>
              <button className="admin-delete-btn" onClick={() => handleDelete(img.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
