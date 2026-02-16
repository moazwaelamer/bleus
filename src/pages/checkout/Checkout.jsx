import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const CART_KEY = user ? `cart_${user.username}` : "cart_guest";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ===== LOAD CART ===== */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    setItems(stored.map(i => ({ ...i, quantity: i.quantity || 1 })));
  }, [CART_KEY]);

  /* ===== TOTALS ===== */
  const FREE_SHIPPING_LIMIT = 300;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const remaining = Math.max(0, FREE_SHIPPING_LIMIT - subtotal);

  const shipping =
    items.length === 0
      ? 0
      : remaining === 0
      ? 0
      : 60;

  const total = subtotal + shipping;

  return (
    <div className="checkout-page">

      {/* HEADER */}
      <header className="checkout-header">
        <h1>Checkout</h1>
        <button className="back-btn" onClick={() => navigate("/CartPage")}>
          ← Back to Cart
        </button>
      </header>

      {/* CONTENT */}
      <div className="checkout-layout">

        {/* LEFT – SUMMARY */}
        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {items.map(item => (
            <div key={item.id} className="summary-item">
              <img src={item.image} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <span>{item.quantity} × {item.price} EGP</span>
              </div>
            </div>
          ))}

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{subtotal} EGP</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `${shipping} EGP`}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>{total} EGP</strong>
          </div>
        </aside>

        <section className="checkout-form">
          <h2>Shipping information</h2>

          <input placeholder="Email" />
          <input placeholder="Full name" />
          <input placeholder="Address line 1" />

          <div className="row">
            <input placeholder="City" />
            <input placeholder="ZIP" />
          </div>

          <input placeholder="Phone" />

          <h2>Payment</h2>

          <div className="payment-box">
            <input placeholder="1234 1234 1234 1234" />
            <div className="row">
              <input placeholder="MM / YY" />
              <input placeholder="CVC" />
            </div>
            <input placeholder="Name on card" />
          </div>

          <button
            className="pay-btn"
            disabled={loading}
            onClick={() => setLoading(true)}
          >
            {loading ? "Processing..." : `Pay ${total} EGP`}
          </button>

          <p className="stripe-note">
            Powered by Stripe · UI only
          </p>
        </section>

      </div>
    </div>
  );
}
