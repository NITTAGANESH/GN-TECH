import CallLink from './CallLink'
import {
  PHONE_PRIMARY,
  PHONE_PRIMARY_DISPLAY,
  PHONE_FALLBACK,
  PHONE_FALLBACK_DISPLAY,
  ADDRESS,
} from '../constants'

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <img src="images/logo.jpg" alt="GN Tech Solutions logo" />
        <strong>GN TECH SOLUTIONS</strong>
      </div>
      <p>&copy; 2026 GN TECH SOLUTIONS Computer Repair Center. All rights reserved.</p>
      <p>
        {ADDRESS} · <CallLink number={PHONE_PRIMARY}>{PHONE_PRIMARY_DISPLAY}</CallLink>{' '}
        / <CallLink number={PHONE_FALLBACK}>{PHONE_FALLBACK_DISPLAY}</CallLink>
      </p>
    </footer>
  )
}
