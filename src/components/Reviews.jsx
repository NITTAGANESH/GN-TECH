export default function Reviews() {
  return (
    <section id="reviews">
      <div className="section-title">
        <span>Testimonials</span>
        <h2>Rated 5.0 on Google</h2>
        <p>Trusted by 31 customers on Google — here's what a few of them said.</p>
      </div>
      <div className="reviews-badge">
        <div className="score">5.0</div>
        <div className="stars">★★★★★</div>
        <p>Based on <strong>31 Google Reviews</strong></p>
      </div>
      <div className="reviewers-grid">
        <div className="reviewer-card">
          <div className="reviewer-head">
            <div className="reviewer-avatar">G</div>
            <div><h4>Google Reviewer</h4><p className="stars">★★★★★</p></div>
          </div>
          <p>"Excellent service strongly recommend this place👍"</p>
        </div>
        <div className="reviewer-card">
          <div className="reviewer-head">
            <div className="reviewer-avatar">G</div>
            <div><h4>Google Reviewer</h4><p className="stars">★★★★★</p></div>
          </div>
          <p>"Very less prices and good quality services"</p>
        </div>
        <div className="reviewer-card">
          <div className="reviewer-head">
            <div className="reviewer-avatar">+29</div>
            <div><h4>More Customers</h4><p className="stars">★★★★★</p></div>
          </div>
          <p>29 more verified customers rated us 5.0★ on Google. Read all reviews on our Google Business profile.</p>
        </div>
      </div>
    </section>
  )
}
