const PRODUCTS = [
  { src: 'images/product-adapter.jpg', alt: 'Laptop charger adapter', label: 'Laptop Adapters' },
  { src: 'images/product-battery.jpg', alt: 'Laptop battery', label: 'Laptop Batteries' },
  { src: 'images/product-keyboard-mouse.jpg', alt: 'Keyboard and mouse combo', label: 'Keyboard & Mouse Combos' },
  { src: 'images/product-wireless-mouse.jpg', alt: 'Wireless mouse', label: 'Wireless Mice' },
  { src: 'images/product-mouse.jpg', alt: 'Gaming mouse', label: 'Gaming Mice' },
  { src: 'images/product-coolingpad.jpg', alt: 'Laptop cooling pad', label: 'Cooling Pads' },
]

export default function Products() {
  return (
    <section id="products">
      <div className="section-title">
        <span>In Stock</span>
        <h2>Parts & Accessories We Sell</h2>
        <p>Genuine adapters, batteries, and accessories available at the shop.</p>
      </div>
      <div className="products-grid">
        {PRODUCTS.map((p) => (
          <div className="product-card" key={p.label}>
            <img src={p.src} alt={p.alt} />
            <p>{p.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
