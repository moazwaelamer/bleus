import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "./products";
import "./productDetatils.css";

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState("");

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <h2 style={{padding: "100px", textAlign: "center"}}>Product Not Found</h2>;

  const otherProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleAddToCart = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      window.dispatchEvent(new Event("openLogin"));
      return;
    }

    const CART_KEY = `cart_${currentUser.username}`;
    const stored = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const found = stored.find(i => i.id === product.id);

    if (found) { found.quantity += 1; } 
    else { stored.push({ ...product, quantity: 1 }); }

    localStorage.setItem(CART_KEY, JSON.stringify(stored));
    window.dispatchEvent(new Event("cartUpdated"));
    setToast(`"${product.title}" added to cart 🛒`);
    window.dispatchEvent(new Event("openCart"));
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <section className="product-view">
      {/* زرار الـ Home - مكانه ثابت فوق عالشمال */}
      <div className="brand-header">
        <button className="cp-nav-back-button" onClick={() => navigate("/")}>
          <svg className="nav-back-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <div className="text-container">
            <span className="default-text">
              <img src="/assest/blue.jpg" alt="logo" className="nav-logo-small" />
              BLEUS
            </span>
            <span className="hover-text">HOME</span>
          </div>
        </button>
      </div>

      <div className="product-container">
        {/* SIDEBAR - Chips style in Mobile */}
        <aside className="product-sidebar">
          <h3>OTHER PRODUCTS</h3>
          <ul>
            {otherProducts.map((item) => (
              <li key={item.id}>
                <Link to={`/product/${item.id}`} className="sidebar-link">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* DETAILS */}
        <div className="product-details">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product-info">
            <h1>{product.title}</h1>
            <h3>{product.price} EGP</h3>
            <p>{product.description || "Premium quality product selection for your lifestyle."}</p>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>
        </div>

        {/* TOAST Notification */}
        {toast && <div className="add-toast">{toast}</div>}
      </div>
    </section>
  );
}