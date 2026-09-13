const GALLERY_ITEMS = [
  { src: 'images/repair-desk.jpg', alt: 'Laptop being serviced on our workbench', caption: 'Laptop Servicing Bench' },
  { src: 'images/repair-screen.jpg', alt: 'Laptop screen replacement in progress', caption: 'Screen Replacement' },
  { src: 'images/motherboard-repair.jpg', alt: 'Motherboard chip-level repair', caption: 'Chip-Level Motherboard Repair' },
  { src: 'images/windows-install.jpg', alt: 'Windows OS installation service', caption: 'Windows Installation Service' },
]

function DataRecoveryTile() {
  return (
    <div className="gallery-item">
      <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="200" height="150" fill="#0b1e3d" />
        <rect x="40" y="45" width="120" height="75" rx="6" fill="#123a6b" stroke="#4fa0ff" strokeWidth="2" />
        <rect x="50" y="55" width="100" height="8" rx="2" fill="#1e6fd9" />
        <rect x="50" y="70" width="70" height="6" rx="2" fill="#4fa0ff" opacity=".7" />
        <rect x="50" y="82" width="85" height="6" rx="2" fill="#4fa0ff" opacity=".5" />
        <circle cx="145" cy="100" r="14" fill="none" stroke="#4fa0ff" strokeWidth="3" />
        <path d="M145 92 v16 M137 100 h16" stroke="#4fa0ff" strokeWidth="3" />
        <path d="M100 20 v18 M92 30 l8 8 8-8" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="gallery-caption">Data Recovery Service</div>
    </div>
  )
}

export default function Gallery() {
  return (
    <section id="gallery">
      <div className="section-title">
        <span>Our Work</span>
        <h2>Inside GN Tech Solutions</h2>
        <p>Real repairs, real workbench — a look at how we work on your devices.</p>
      </div>
      <div className="gallery-grid">
        {GALLERY_ITEMS.map((item) => (
          <div className="gallery-item" key={item.caption}>
            <img src={item.src} alt={item.alt} />
            <div className="gallery-caption">{item.caption}</div>
          </div>
        ))}
        <DataRecoveryTile />
      </div>
    </section>
  )
}
