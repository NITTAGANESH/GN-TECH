const SERVICES = [
  { icon: '💻', title: 'Laptop & Desktop Repair', desc: 'Expert diagnosis and repair for all major brands — hardware and software issues fixed fast.' },
  { icon: '🪟', title: 'OS Installation', desc: 'Windows installation with MS Office setup — quick, clean, and fully licensed installs.' },
  { icon: '⚙️', title: 'BIOS Setup & Upgrades', desc: "BIOS configuration, RAM & SSD upgrades to boost your system's speed and performance." },
  { icon: '🔄', title: 'SSD Cloning', desc: 'Seamless data migration from HDD to SSD without losing your files or settings.' },
  { icon: '🛡️', title: 'Data Recovery', desc: 'Recover lost or corrupted data from damaged drives with our professional recovery tools.' },
  { icon: '🖨️', title: 'IT Support & Networking', desc: 'Printer setup, networking, and general IT support for home and office systems.' },
]

export default function Services() {
  return (
    <section id="services">
      <div className="section-title">
        <span>What We Offer</span>
        <h2>Our Services</h2>
        <p>Complete computer and IT services for homes and businesses in Hyderabad.</p>
      </div>
      <div className="services-grid">
        {SERVICES.map((s) => (
          <div className="service-card" key={s.title}>
            <div className="icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
