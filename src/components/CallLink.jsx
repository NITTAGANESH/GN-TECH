import { copyNumber } from '../utils/copyNumber'

export default function CallLink({ number, children, ...rest }) {
  return (
    <a href={`tel:${number}`} onClick={() => copyNumber(number)} {...rest}>
      {children}
    </a>
  )
}
