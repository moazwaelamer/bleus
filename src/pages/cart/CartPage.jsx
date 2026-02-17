import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../../pages/Product/products"; 
import "./CartPage.css";

export default function CartPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const CART_KEY = user ? `cart_${user.username}` : "cart_guest";
  const [items, setItems] = useState([]);
  const [likeIndex, setLikeIndex] = useState(0);
  const VISIBLE = 3; 
  const FREE_SHIPPING_LIMIT = 300;

  // --- الحل القاطع لإخفاء زرار الكارت من الناف الرئيسي ---
  useEffect(() => {
    // بنحاول نمسك الزرار بأكثر من طريقة عشان نضمن الوصول ليه
    const selectors = ['.cart-btn', '.icon-btn.cart-btn', '[className*="cart-btn"]'];
    
    const hideCart = () => {
      selectors.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
          el.style.setProperty('pointer-events', 'none', 'important');
        }
      });
    };

    hideCart();
    // بنعمل تأكيد بعد نص ثانية لو الموقع لسه بيعمل Render
    const timeout = setTimeout(hideCart, 500);

    return () => {
      clearTimeout(timeout);
      selectors.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
          el.style.display = 'flex'; // أو 'block' حسب تصميمك
          el.style.visibility = 'visible';
          el.style.setProperty('pointer-events', 'auto');
        }
      });
    };
  }, []);

  // تحميل الكارت
  useEffect(() => {
    const load = () => {
      const stored = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      setItems(stored.map(i => ({ ...i, quantity: i.quantity || 1 })));
    };
    load();
    window.addEventListener("cartUpdated", load);
    return () => window.removeEventListener("cartUpdated", load);
  }, [CART_KEY]);

  const update = (next) => {
    setItems(next);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const related = products.slice(0, 6); 
  const nextLike = () => setLikeIndex(prev => prev + 1);
  const prevLike = () => setLikeIndex(prev => prev - 1);

  const addSuggested = (product) => {
    const exists = items.find(i => i.id === product.id);
    if (exists) {
      update(items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      update([...items, { ...product, quantity: 1 }]);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remaining = Math.max(0, FREE_SHIPPING_LIMIT - subtotal);
  const progress = Math.min((subtotal / FREE_SHIPPING_LIMIT) * 100, 100);
  const shipping = items.length === 0 || remaining === 0 ? 0 : 60;
  const total = subtotal + shipping;

  return (
    <div className="cp-wrapper">
      <nav className="cp-nav">
        <div className="cp-nav-content">
          <button className="cp-nav-back-button" onClick={() => navigate("/")}>
            <svg className="nav-back-arrow" width="20" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
      </nav>

      <div className="cp-page-container">
        <div className="cp-page-grid">
          <div className="cp-main-content">
            <h1 className="cp-title">Cart</h1>
            {items.length === 0 ? (
              <div className="cp-empty">
                <p>Your cart is currently empty.</p>
                <button className="cp-btn-secondary" onClick={() => navigate("/")}>RETURN TO SHOP</button>
              </div>
            ) : (
              <div className="cp-items-holder">
                {items.map((item, i) => (
                  <div key={item.id} className="cp-item-row">
                    <div className="cp-item-left">
                      <img src={item.image} alt={item.title} className="cp-img" />
                      <div className="cp-info">
                        <h3>{item.title}</h3>
                        <p className="variant">SIZE: ONE SIZE</p>
                        <div className="bb-qty-box">
                          <button onClick={() => {
                            const c = [...items];
                            c[i].quantity = Math.max(1, c[i].quantity - 1);
                            update(c);
                          }}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => {
                            const c = [...items];
                            c[i].quantity += 1;
                            update(c);
                          }}>+</button>
                        </div>
                      </div>
                    </div>
                    <div className="cp-item-right">
                      <span className="price">{item.price} EGP</span>
                      <button className="remove-btn" onClick={() => update(items.filter((_, x) => x !== i))}>
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
                      </button>
                    </div>
                  </div>
                ))}

                {related.length > 0 && (
                  <div className="cart-like-section">
                    <div className="like-head">
                      <h4>You may also like</h4>
                      <div className="like-arrows">
                        <button onClick={prevLike} disabled={likeIndex === 0}>‹</button>
                        <button onClick={nextLike} disabled={likeIndex + VISIBLE >= related.length}>›</button>
                      </div>
                    </div>
                    <div className="like-slider-container">
                      <div className="like-track">
                        {related.slice(likeIndex, likeIndex + VISIBLE).map(p => (
                          <div key={p.id} className="like-card">
                            <div className="like-img-wrapper">
                               <img src={p.image} alt={p.title} className="like-slider-img" />
                            </div>
                            <div className="like-meta">
                              <p className="like-title">{p.title}</p>
                              <p className="like-price">{p.price} EGP</p>
                            </div>
                            <button className="like-add-btn" onClick={() => addSuggested(p)}>ADD | {p.price} EGP</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div className="cp-actions-bottom">
                   <button className="cp-btn-secondary" onClick={() => navigate("/")}>RETURN TO SHOP</button>
                </div>
              </div>
            )}
          </div>

          <aside className="cp-sidebar">
            <div className="shipping-status">
               <p className="status-text">{remaining === 0 ? "CONGRATS! FREE SHIPPING!" : `JUST ${remaining} EGP AWAY!`}</p>
               <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }}></div></div>
            </div>
            <h2 className="summary-hd">Order Summary</h2>
            <div className="summary-row"><span>SUBTOTAL</span><span>{subtotal} EGP</span></div>
            <div className="summary-row"><span>SHIPPING</span><span>{shipping === 0 ? "FREE" : `${shipping} EGP`}</span></div>
            <div className="summary-row total"><strong>TOTAL</strong><strong>{total} EGP</strong></div>
            <button className="cp-btn-primary" disabled={items.length === 0}>CONTINUE TO CHECKOUT</button>
          </aside>
        </div>
      </div>
    </div>
  );
}