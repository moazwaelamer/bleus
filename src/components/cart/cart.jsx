import { motion} from "framer-motion";
import { useEffect, useState } from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";

export default function CartPanel({ onClose }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const CART_KEY = user ? `cart_${user.username}` : "cart_guest";

  const [items, setItems] = useState([]);



  /* ===== LOAD CART ===== */
  useEffect(() => {
    const load = () => {
      const stored = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      setItems(stored.map(i => ({ ...i, quantity: i.quantity || 1 })));
    };
    load();
    window.addEventListener("cartUpdated", load);
    return () => window.removeEventListener("cartUpdated", load);
  }, [CART_KEY]);

  /* ===== UPDATE CART ===== */
  const update = (next) => {
    setItems(next);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("cartUpdated"));
  };

 

  /* ===== CONTINUE SHOPPING ===== */
  const goToCategories = () => {
    onClose(); // اقفل الكارت

    setTimeout(() => {
      const section = document.getElementById("categories-section");
      if (!section) return;

      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset -
        80; // لو عندك navbar

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }, 600); // نفس مدة framer-motion
  };
/* ===== TOTALS ===== */
const FREE_SHIPPING_LIMIT = 300; // عدل الرقم براحتك

// 1️⃣ احسب subtotal الأول
const subtotal = items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

// 2️⃣ احسب الباقي للفري
const remaining = Math.max(0, FREE_SHIPPING_LIMIT - subtotal);

// 3️⃣ الشحن
const shipping =
  items.length === 0
    ? 0
    : remaining === 0
    ? 0
    : 60;

// 4️⃣ الإجمالي
const total = subtotal + shipping;

// 5️⃣ نسبة شريط التقدم
const progress = Math.min(
  (subtotal / FREE_SHIPPING_LIMIT) * 100,
  100
);


  return (
    <>
      <div className="cart-overlay" onClick={onClose} />

      <motion.aside
        className="cart-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] ,damping: 28,   // بيمنع الارتداد الزيادة
    stiffness: 250, // بيخلي الحركة سريعة ومستجيبة
    mass: 0.5}}
        
      >
        {/* HEADER */}
        <header className="cart-head">
          <h2>Shopping Cart</h2>
          <button onClick={onClose}>✕</button>
        </header>
           {items.length > 0 && (
  <div className={`free-ship ${remaining === 0 ? "complete" : ""}`}>

    <p>
      {remaining > 0
        ? `YOU'RE JUST ${remaining} EGP AWAY FROM FREE SHIPPING!`
        : "🎉 YOU'VE GOT FREE SHIPPING!"}
    </p>

    <div className="bar">
      <span
        style={{
          width: `${progress}%`,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  </div>
)}

        {/* BODY */}
        <section className="cart-list">
          {items.length === 0 && (
            <div className="cart-empty">
              <h3>Your cart is empty</h3>
              <p>Add something delicious ☕</p>

              <button
                className="cart-empty-btn"
                onClick={goToCategories}
              >
                Continue shopping
              </button>
            </div>
          )}

          {/* CART ITEMS */}
          {items.map((item, i) => (
            <div key={item.id} className="cart-row bb-row">
              <div className="cart-thumb big">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="cart-meta">
                <p className="bb-title">{item.title}</p>
                <p className="cart-sub">SIZE: ONE SIZE</p>

                <div className="bb-qty">
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

              <div className="cart-side">
                <span className="bb-price">{item.price} EGP</span>

                <button
                  className="cart-remove"
                  aria-label="Remove item"
                  onClick={() =>
                    update(items.filter((_, x) => x !== i))
                  }
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

        </section>

        {/* FOOTER */}
        {items.length > 0 && (
          <footer className="cart-foot">
            <div className="cart-summary">
              <div><span>Subtotal</span><span>{subtotal} EGP</span></div>
              <div>
  <span>Shipping</span>
  <span>
    {shipping === 0 && items.length > 0
      ? "FREE"
      : `${shipping} EGP`}
  </span>
</div>

              <div className="cart-total">
                <strong>Total</strong>
                <strong>{total} EGP</strong>
              </div>
            </div>

<button
  className="cart-checkout"
  onClick={() => {
    onClose();          // يقفل الكارت الجانبي
    navigate("/checkout"); // يفتح صفحة Checkout كاملة
  }}
>
  Checkout
</button>

          </footer>
        )}
      </motion.aside>


    </>
  );
}
