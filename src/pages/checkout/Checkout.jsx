import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const CART_KEY = user ? `cart_${user.username}` : "cart_guest";
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    setItems(stored.map(i => ({ ...i, quantity: i.quantity || 1 })));
  }, [CART_KEY]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 300 || items.length === 0 ? 0 : 60;
  const total = subtotal + shipping;

  return (
    <div className="stripe-checkout-container">
      {/* الجزء الأيسر: ملخص الطلب */}
      <aside className="order-summary-side">
        <div className="summary-sticky-content">
          {/* الزرار فوق خالص */}
          <div className="brand-header-checkout"> 
            <button className="cp-nav-back-button" onClick={() => navigate("/CartPage")}>
              <svg className="nav-back-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <div className="text-container">
                <span className="default-text">
                  <img src="/assest/blue.jpg" alt="logo" className="nav-logo-small" />
                  BLEUS
                </span>
                <span className="hover-text">BACK</span>
              </div>
            </button>
          </div>

          <div className="amount-section">
            <p className="pay-label">Pay Blue Bottle Coffee, LLC</p>
            <h1 className="total-amount">{total.toFixed(2)} EGP</h1>
          </div>

          <div className="items-review-list">
            {items.map((item) => (
              <div key={item.id} className="review-item">
                <div className="item-img-wrapper">
                  <img src={item.image} alt={item.title} />
                  <span className="item-badge">{item.quantity}</span>
                </div>
                <div className="item-info">
                  <p className="item-title">{item.title}</p>
                  <p className="item-desc">Size: One Size</p>
                </div>
                <span className="item-price">{(item.price * item.quantity).toFixed(2)} EGP</span>
              </div>
            ))}
          </div>

          <div className="pricing-footer">
            <div className="price-row"><span>Subtotal</span><span>{subtotal.toFixed(2)} EGP</span></div>
            <div className="price-row"><span>Shipping</span><span>{shipping === 0 ? "Free" : `${shipping.toFixed(2)} EGP`}</span></div>
            <div className="price-row total-row">
              <span>Total due</span>
              <span>{total.toFixed(2)} EGP</span>
            </div>
          </div>
        </div>
      </aside>

      {/* الجزء الأيمن: استمارة الدفع */}
      <main className="checkout-form-side">
        <div className="form-wrapper">
          <button className="express-checkout-btn">
            Pay with <span className="link-logo">link</span>
          </button>
          <div className="divider"><span>Or pay with card</span></div>
          {/* ... بقية الـ Sections زي ما هي ... */}
            <section className="form-group">

            <h3>Shipping address</h3>

            <div className="stacked-inputs">

              <input type="text" placeholder="Full name" />

              <select className="country-select"><option>Egypt</option></select>

              <input type="text" placeholder="Address line 1" />

              <input type="text" placeholder="Address line 2 (Optional)" />

              <div className="input-row">

                <input type="text" placeholder="City" />

                <input type="text" placeholder="Postal code" />

              </div>

            </div>

          </section>
          <button className="main-submit-btn">Pay {total.toFixed(2)} EGP</button>
        </div>
      </main>
    </div>
  );
}