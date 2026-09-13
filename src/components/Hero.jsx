import CallLink from './CallLink'
import { PHONE_PRIMARY } from '../constants'

export default function Hero() {
  return (
    <div id="home" className="hero">
      <span className="badge">⭐ 5.0 Rated · Open 24 Hours</span>
      <h1>Trusted Computer & Laptop Repair Center in Boduppal, Hyderabad</h1>
      <p>
        System upgrades, OS installation, BIOS setup, SSD cloning, data recovery and
        complete IT solutions for desktops and laptops — fast, affordable, and reliable.
      </p>
      <div className="hero-buttons">
        <CallLink number={PHONE_PRIMARY} className="btn-primary">Call Now</CallLink>
        <a href="#contact" className="btn-secondary">Get Directions</a>
      </div>
    </div>
  )
}
