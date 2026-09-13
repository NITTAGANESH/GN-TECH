import CallLink from './CallLink'
import { PHONE_PRIMARY } from '../constants'

export default function TopOffer() {
  return (
    <div className="top-offer">
      <span className="pill">🎉 SPECIAL OFFER</span>
      <span>Windows Installation + MS Office Installation — Every Sunday, ₹500 Only!</span>
      <CallLink number={PHONE_PRIMARY}>Call Now →</CallLink>
    </div>
  )
}
