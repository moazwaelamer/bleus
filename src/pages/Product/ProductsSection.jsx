import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { products } from "./products";
import "./ProductsSection.css";
import toast from "react-hot-toast";

export default function ProductsSection() {

  const [active, setActive] = useState(0);

  const bestSellers = products ? products.slice(0, 3) : [];

  const handleAddToCart = () => {
    const product = bestSellers[active];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      window.dispatchEvent(new Event("openLogin"));
      return;
    }

    const CART_KEY = `cart_${currentUser.username}`;
    const stored = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const found = stored.find(i => i.id === product.id);

    if (found) {
      found.quantity += 1;
    } else {
      stored.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(stored));

    // تحديث الكارت
    window.dispatchEvent(new Event("cartUpdated"));

    // Toast Notification
    toast.success(`${product.title} added to cart 🛒`, {
      style: {
        borderRadius: "12px",
        background: "#2E4A7D",
        color: "#fff",
      },
    });

    window.dispatchEvent(new Event("openCart"));
  };

  if (bestSellers.length === 0) return null;

  return (
    <section id="bestsellers" className="best-sellers-section">

      <div className="inner">
        <div className="section-header">
          <p className="subtitle">OUR PICKS</p>
          <h2 className="section-title">Best Sellers</h2>
        </div>

        <div className="spotlight-grid">

          <div className="image-display">
            <div className="image-container">
              <img
                src={bestSellers[active].image}
                alt={bestSellers[active].title}
                className="main-featured-img"
              />
              <span className="badge">BEST SELLER</span>
            </div>
          </div>

          <div className="details-side">

            <div className="product-list">
              {bestSellers.map((product, index) => (
                <div
                  key={product.id}
                  className={`product-item ${index === active ? "active" : ""}`}
                  onClick={() => setActive(index)}
                >
                  <div className="item-thumb">
                    <img src={product.image} alt={product.title} />
                  </div>

                  <div className="item-info">
                    <h3 className="item-name">{product.title}</h3>
                    <p className="item-sub">Single Origin · Light Roast</p>
                    <p className="item-notes">Blueberry · Jasmine · Citrus</p>
                  </div>

                  <div className="item-price">
                    ${product.price}
                  </div>
                </div>
              ))}
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <ShoppingBag size={18} />
              Add to Cart — ${bestSellers[active].price}
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}