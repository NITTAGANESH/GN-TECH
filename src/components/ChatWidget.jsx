import { useEffect, useRef, useState } from 'react'
import { getJSON, postJSON } from '../api'

const STORAGE_KEY = 'gn-tech-chat-identity'
const IDLE_TIMEOUT_MS = 10 * 60 * 1000 // 10 minutes

function loadIdentity() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (!stored) return null
    if (Date.now() - stored.lastActivityAt > IDLE_TIMEOUT_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return stored
  } catch {
    return null
  }
}

function saveIdentity(identity) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(identity))
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [identity, setIdentity] = useState(loadIdentity)
  const [justExpired, setJustExpired] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const bottomRef = useRef(null)

  function endChat() {
    localStorage.removeItem(STORAGE_KEY)
    setIdentity(null)
    setMessages([])
    setJustExpired(true)
  }

  // While the widget is open, periodically check whether the customer has
  // gone quiet for 10 minutes and, if so, end the local session. Nothing on
  // the server is touched - the full conversation (keyed by phone number)
  // stays intact for the admin side; this only resets what the customer
  // sees so a new visit starts fresh.
  useEffect(() => {
    if (!open || !identity) return
    const interval = setInterval(() => {
      if (Date.now() - identity.lastActivityAt > IDLE_TIMEOUT_MS) {
        endChat()
      }
    }, 15000)
    return () => clearInterval(interval)
  }, [open, identity])

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
    const id = { phone: phoneInput.trim(), name: nameInput.trim(), lastActivityAt: Date.now() }
    saveIdentity(id)
    setIdentity(id)
    setJustExpired(false)
  }

  async function sendMessage(e) {
    e.preventDefault()
    if (!text.trim() || sending) return
    setSending(true)
    setSendError('')
    const outgoing = text.trim()
    setText('')
    try {
      const saved = await postJSON('/api/chat', {
        phone: identity.phone,
        name: identity.name,
        message: outgoing,
      })
      setMessages((m) => [...m, saved])
      const refreshed = { ...identity, lastActivityAt: Date.now() }
      saveIdentity(refreshed)
      setIdentity(refreshed)
    } catch {
      setText(outgoing)
      setSendError("Couldn't send — check your connection and try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <button
        className="chat-toggle"
        onClick={() => {
          if (!open && identity && Date.now() - identity.lastActivityAt > IDLE_TIMEOUT_MS) {
            endChat()
          }
          setOpen((o) => !o)
        }}
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
              <p>{justExpired ? 'Chat ended after inactivity — start a new one' : 'Start a conversation with us'}</p>
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
              {sendError && <p className="chat-send-error">{sendError}</p>}
              <form className="chat-input-row" onSubmit={sendMessage}>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value)
                    if (sendError) setSendError('')
                  }}
                  placeholder="Type a message..."
                  disabled={sending}
                />
                <button type="submit" disabled={sending} aria-label="Send">
                  {sending ? '…' : '➤'}
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}
