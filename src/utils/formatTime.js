export function formatChatTime(isoString) {
  const date = new Date(isoString)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  if (isToday) return time
  const day = date.toLocaleDateString([], { day: 'numeric', month: 'short' })
  return `${day}, ${time}`
}
