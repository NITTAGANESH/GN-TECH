const STATS = [
  { value: '5.0★', label: 'Google Rating' },
  { value: '24/7', label: 'Open Hours' },
  { value: '100%', label: 'Genuine Parts' },
]

export default function Stats() {
  return (
    <div className="stats">
      {STATS.map((s) => (
        <div className="stat" key={s.label}>
          <h3>{s.value}</h3>
          <p>{s.label}</p>
        </div>
      ))}
    </div>
  )
}
