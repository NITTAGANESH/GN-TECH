export function copyNumber(number) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(number).catch(() => {})
  } else {
    const t = document.createElement('textarea')
    t.value = number
    t.style.position = 'fixed'
    t.style.opacity = '0'
    document.body.appendChild(t)
    t.select()
    try {
      document.execCommand('copy')
    } catch {
      // ignore
    }
    document.body.removeChild(t)
  }
  window.dispatchEvent(new CustomEvent('show-toast', { detail: '📋 Number copied!' }))
}
