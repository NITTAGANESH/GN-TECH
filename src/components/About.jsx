export default function About() {
  return (
    <>
      <section id="about">
        <div className="about-wrap">
          <div className="about-text">
            <h2>About GN TECH SOLUTIONS</h2>
            <p>
              GN Tech Solutions is your trusted destination for complete computer and IT
              services in Boduppal, Hyderabad. We specialize in system upgrades, OS
              installation, BIOS setup, and hardware repair for desktops and laptops.
            </p>
            <p>
              Our team provides expert solutions for SSD cloning, data recovery, and much
              more — combining quality service with honest, affordable pricing.
            </p>
            <ul className="about-list">
              <li>Open 24 hours, every day</li>
              <li>Very less prices, good quality service</li>
              <li>Experienced and friendly technicians</li>
              <li>Doorstep support available on request</li>
            </ul>
          </div>
          <div className="about-photo">
            <img src="images/repair-desk.jpg" alt="GN Tech Solutions laptop servicing workstation" />
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="about-card" style={{ maxWidth: 900, margin: '0 auto' }}>
          <h3>What Our Customers Say</h3>
          <div className="review">
            "Excellent service strongly recommend this place👍"
            <span>— Google Review</span>
          </div>
          <div className="review">
            "Very less prices and good quality services"
            <span>— Google Review</span>
          </div>
        </div>
      </section>
    </>
  )
}
