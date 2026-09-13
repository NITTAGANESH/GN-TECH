import { useEffect, useRef, useState } from 'react'
import { adminGet, adminPostJSON } from '../api'

export default function ChatPanel({ token }) {
  const [conversations, setConversations] = useState(null)
  const [error, setError] = useState('')
  const [selectedPhone, setSelectedPhone] = useState(null)
  const [messages, setMessages] = useState([])
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  function loadConversations() {
    adminGet('/api/admin/chats', token).then(setConversations).catch((e) => setError(e.message))
  }

  useEffect(() => {
    loadConversations()
    const interval = setInterval(loadConversations, 8000)
    return () => clearInterval(interval)
  }, [token])

  useEffect(() => {
    if (!selectedPhone) return
    let cancelled = false

    function loadThread() {
      adminGet(`/api/admin/chats/${encodeURIComponent(selectedPhone)}`, token)
        .then((msgs) => {
          if (!cancelled) setMessages(msgs)
        })
        .catch((e) => setError(e.message))
    }

    loadThread()
    const interval = setInterval(loadThread, 5000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [selectedPhone, token])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleReply(e) {
    e.preventDefault()
    if (!reply.trim() || sending) return
    setSending(true)
    const outgoing = reply.trim()
    setReply('')
    try {
      const saved = await adminPostJSON(`/api/admin/chats/${encodeURIComponent(selectedPhone)}/reply`, token, {
        message: outgoing,
      })
      setMessages((m) => [...m, saved])
      loadConversations()
    } catch (err) {
      setError(err.message)
      setReply(outgoing)
    } finally {
      setSending(false)
    }
  }

  if (error) return <p className="form-error">{error}</p>
  if (!conversations) return <p>Loading conversations...</p>

  return (
    <div className="admin-chat-layout">
      <div className="admin-chat-list">
        {conversations.length === 0 && <p className="chat-empty">No conversations yet.</p>}
        {conversations.map((c) => (
          <button
            key={c.phone}
            className={`admin-chat-list-item${selectedPhone === c.phone ? ' active' : ''}`}
            onClick={() => setSelectedPhone(c.phone)}
          >
            <div className="admin-chat-list-top">
              <strong>{c.name || c.phone}</strong>
              {c.unread_count > 0 && <span className="admin-chat-unread">{c.unread_count}</span>}
            </div>
            <div className="admin-chat-list-phone">{c.phone}</div>
            <div className="admin-chat-list-preview">
              {c.last_sender === 'staff' ? 'You: ' : ''}
              {c.last_message}
            </div>
          </button>
        ))}
      </div>

      <div className="admin-chat-thread">
        {!selectedPhone ? (
          <p className="chat-empty">Select a conversation to view messages.</p>
        ) : (
          <>
            <div className="admin-chat-thread-header">{selectedPhone}</div>
            <div className="chat-messages admin-chat-messages">
              {messages.map((m) => (
                <div key={m.id} className={`chat-bubble ${m.sender}`}>
                  {m.message}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <form className="chat-input-row" onSubmit={handleReply}>
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type a reply..."
              />
              <button type="submit" disabled={sending} aria-label="Send reply">➤</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
