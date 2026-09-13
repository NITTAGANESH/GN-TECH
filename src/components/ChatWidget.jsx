import { useEffect, useRef, useState } from 'react'
import { getJSON, postJSON } from '../api'

const STORAGE_KEY = 'gn-tech-chat-identity'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [identity, setIdentity] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    } catch {
      return null
    }
  })
  const [nameInput, setNameInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (!open || !identity) return
    let cancelled = false

    async function poll() {
      try {
        const history = await getJSON(`/api/chat/${encodeURIComponent(identity.phone)}`)
        if (!cancelled) setMessages(history)
      } catch {
        // no history yet, or backend unreachable - ignore
      }
    }

    poll()
    const interval = setInterval(poll, 5000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [open, identity])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function startChat(e) {
    e.preventDefault()
    if (!phoneInput.trim()) return
    const id = { phone: phoneInput.trim(), name: nameInput.trim() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(id))
    setIdentity(id)
  }

  async function sendMessage(e) {
    e.preventDefault()
    if (!text.trim() || sending) return
    setSending(true)
    const outgoing = text.trim()
    setText('')
    try {
      const saved = await postJSON('/api/chat', {
        phone: identity.phone,
        name: identity.name,
        sender: 'customer',
        message: outgoing,
      })
      setMessages((m) => [...m, saved])
    } catch {
      setText(outgoing)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <button
        className="chat-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? '✕' : '💭'}
      </button>

      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <strong>GN Tech Solutions</strong>
            <span>We usually reply within a few hours</span>
          </div>

          {!identity ? (
            <form className="chat-identity-form" onSubmit={startChat}>
              <p>Start a conversation with us</p>
              <input
                type="text"
                placeholder="Your name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <input
                type="tel"
                required
                placeholder="Your phone number"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
              />
              <button type="submit" className="btn-primary">Start Chat</button>
            </form>
          ) : (
            <>
              <div className="chat-messages">
                {messages.length === 0 && (
                  <p className="chat-empty">Send us a message and we'll get back to you here.</p>
                )}
                {messages.map((m) => (
                  <div key={m.id} className={`chat-bubble ${m.sender}`}>
                    {m.message}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <form className="chat-input-row" onSubmit={sendMessage}>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit" disabled={sending} aria-label="Send">➤</button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}
