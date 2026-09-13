import CallLink from './CallLink'
import { PHONE_PRIMARY, PHONE_PRIMARY_DISPLAY } from '../constants'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header>
      <div className="nav">
        <div className="logo">
          <img src="images/logo.jpg" alt="GN Tech Solutions logo" />
          GN TECH SOLUTIONS
        </div>
        <ul id="navMenu">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <CallLink number={PHONE_PRIMARY} className="call-btn">
          📞 {PHONE_PRIMARY_DISPLAY}
        </CallLink>
      </div>
    </header>
  )
}
