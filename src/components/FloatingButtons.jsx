import CallLink from './CallLink'
import { PHONE_PRIMARY, WHATSAPP_URL } from '../constants'

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.7 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1.1.5 1.1 1.1V20c0 .6-.5 1.1-1.1 1.1C10.8 21.1 2.9 13.2 2.9 3.1 2.9 2.5 3.4 2 4 2h3.3c.6 0 1.1.5 1.1 1.1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1.1L6.6 10.8Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" width="30" height="30" fill="none" aria-hidden="true">
      <path
        d="M16 3C9.4 3 4 8.4 4 15c0 2.2.6 4.3 1.7 6.1L4 29l8.1-1.7c1.7.9 3.7 1.4 5.9 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3Z"
        fill="currentColor"
      />
      <path
        d="M22.4 19.1c-.3.9-1.5 1.6-2.5 1.8-.7.1-1.6.2-4.6-1-3.6-1.5-6-5.1-6.1-5.4-.2-.2-1.4-1.9-1.4-3.6 0-1.7.9-2.6 1.2-2.9.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .7.6.3.7 1 2.4 1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.5.6c-.2.2-.3.4-.1.7.2.3.9 1.5 1.9 2.4 1.3 1.2 2.4 1.6 2.7 1.7.3.2.5.1.7-.1l.9-1c.2-.3.5-.2.8-.1.3.1 1.9.9 2.2 1.1.3.2.5.3.6.4.1.2.1 1-.2 1.9Z"
        fill="#128C7E"
      />
    </svg>
  )
}

export default function FloatingButtons() {
  return (
    <>
      <CallLink number={PHONE_PRIMARY} className="floating-call" aria-label="Call GN Tech Solutions">
        <PhoneIcon />
      </CallLink>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </>
  )
}
