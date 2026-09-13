import CallLink from './CallLink'
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
            <div><h4>Address</h4><p>{ADDRESS}</p></div>
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
        <div className="contact-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div className="icon" style={{ width: 60, height: 60, fontSize: '1.8rem', marginBottom: 16 }}>🗺️</div>
          <h3>Find Us on the Map</h3>
          <p style={{ color: 'var(--muted)', marginBottom: 20 }}>Penta Reddy Colony, West Hanuman Nagar, Boduppal, Hyderabad</p>
          <a className="btn-primary" target="_blank" rel="noopener" href={MAPS_URL}>
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
