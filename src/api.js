const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, options)
  if (!res.ok) {
    let detail = res.statusText
    try {
      const body = await res.json()
      detail = body.detail || detail
    } catch {
      // ignore
    }
    throw new Error(typeof detail === 'string' ? detail : JSON.stringify(detail))
  }
  return res.json()
}

export function postJSON(path, data) {
  return request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function getJSON(path) {
  return request(path)
}

export function uploadFile(path, formData) {
  return request(path, { method: 'POST', body: formData })
}

export function adminRequest(path, token, options = {}) {
  return request(path, {
    ...options,
    headers: { ...(options.headers || {}), 'X-Admin-Token': token },
  })
}

export function adminGet(path, token) {
  return adminRequest(path, token)
}

export function adminPostJSON(path, token, data) {
  return adminRequest(path, token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function adminUpload(path, token, formData) {
  return adminRequest(path, token, { method: 'POST', body: formData })
}

export function adminDelete(path, token) {
  return adminRequest(path, token, { method: 'DELETE' })
}
