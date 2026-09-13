import { useEffect, useRef, useState } from 'react'

export default function Toast() {
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false)
  const hideTimer = useRef(null)

  useEffect(() => {
    function handler(e) {
      setMessage(e.detail)
      setShow(true)
      clearTimeout(hideTimer.current)
      hideTimer.current = setTimeout(() => setShow(false), 1800)
    }
    window.addEventListener('show-toast', handler)
    return () => window.removeEventListener('show-toast', handler)
  }, [])

  return (
    <div className={`copy-toast${show ? ' show' : ''}`}>{message}</div>
  )
}
