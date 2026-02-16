import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { products } from "../../pages/Product/products";
import "./CartPage.css";

export default function CartPage() {
  const navigate = useNavigate();
  const CART_KEY = "cart_guest";

  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    setItems(stored.map(i => ({ ...i, quantity: i.quantity || 1 })));
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <div className="cart-grid">

        {/* LEFT */}
        <section className="cart-left">
          <h1 className="cart-title">Cart</h1>

          {items.map(item => (
            <div key={item.id} className="cart-row">
              <img src={item.image} alt={item.title} />

              <div className="cart-info">
                <h3>{item.title}</h3>
                <span>{item.quantity} × {item.price} EGP</span>
              </div>

              <div className="cart-price">
                {(item.price * item.quantity).toFixed(0)} EGP
              </div>
            </div>
          ))}

          <section className="cart-like">
            <h3>You may also like</h3>

            {products.slice(0, 2).map(p => (
              <div key={p.id} className="like-row">
                <img src={p.image} alt={p.title} />

                <div>
                  <p>{p.title}</p>
                  <span>{p.price} EGP</span>
                </div>

                <button>ADD TO CART</button>
              </div>
            ))}
          </section>
        </section>

        {/* RIGHT */}
        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="sum-line">
            <span>Subtotal</span>
            <span>{subtotal} EGP</span>
          </div>

          <div className="sum-line muted">
            <span>Shipping</span>
            <span>To be determined</span>
          </div>

          <div className="sum-total">
            <span>Estimated Total</span>
            <strong>{subtotal} EGP</strong>
          </div>

          <button onClick={() => navigate("/checkout")}>
            CONTINUE TO CHECKOUT
          </button>
        </aside>

      </div>
    </main>
  );
}
