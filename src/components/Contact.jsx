import CallLink from './CallLink'
import ContactForm from './ContactForm'
import {
  PHONE_PRIMARY,
  PHONE_PRIMARY_DISPLAY,
  PHONE_FALLBACK,
  PHONE_FALLBACK_DISPLAY,
  WHATSAPP_URL,
  ADDRESS,
  MAPS_URL,
} from '../constants'

export default function Contact() {
  return (
    <section id="contact">
      <div className="section-title">
        <span>Get In Touch</span>
        <h2>Visit or Call Us</h2>
      </div>
      <div className="contact-wrap">
        <div className="contact-card">
          <h3>Contact Information</h3>
          <div className="contact-row">
            <div className="icon">📍</div>
            <div>
              <h4>Address</h4>
              <p>{ADDRESS}</p>
              <a href={MAPS_URL} target="_blank" rel="noopener" style={{ fontSize: '.82rem', color: 'var(--blue)', fontWeight: 600 }}>
                Open in Google Maps →
              </a>
            </div>
          </div>
          <div className="contact-row">
            <div className="icon">📞</div>
            <div>
              <h4>Phone</h4>
              <p><CallLink number={PHONE_PRIMARY}>{PHONE_PRIMARY_DISPLAY}</CallLink></p>
              <p style={{ fontSize: '.82rem', marginTop: 2 }}>
                Not reachable? Call <CallLink number={PHONE_FALLBACK}>{PHONE_FALLBACK_DISPLAY}</CallLink>
              </p>
            </div>
          </div>
          <div className="contact-row">
            <div className="icon">🕒</div>
            <div><h4>Hours</h4><p>Open 24 hours</p></div>
          </div>
          <CallLink number={PHONE_PRIMARY} className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 10 }}>
            Call Now
          </CallLink>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 10, background: '#25D366' }}>
            💬 Chat on WhatsApp
          </a>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
