import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "./products";
import "./productDetatils.css";

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState("");

  /* Scroll To Top عند تغيير المنتج */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <h2 style={{ padding: "120px", textAlign: "center" }}>
        Product Not Found
      </h2>
    );
  }

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

    const found = stored.find((i) => i.id === product.id);

    if (found) {
      found.quantity += 1;
    } else {
      stored.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(stored));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("openCart"));

    setToast(`"${product.title}" added to cart 🛒`);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <section className="product-view">
      {/* زر الرجوع */}
      <button className="product-back-btn" onClick={() => navigate(-1)}>
        <svg
          className="product-back-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>

        <div className="text-wrapper">
          <div className="default-text">
            <img
              src="/assest/blue.jpg"
              alt="BLEUS"
              className="nav-logo-small"
            />
            <span>BLEUS</span>
          </div>
          <span className="hover-text">HOME</span>
        </div>
      </button>

      <div className="product-container">
        {/* Sidebar */}
        <aside className="product-sidebar">
          <h3>OTHER PRODUCTS</h3>
          <ul>
            <li>
              <Link
                to={`/product/${product.id}`}
                className="sidebar-link active"
              >
                {product.title}
              </Link>
            </li>

            {otherProducts.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/product/${item.id}`}
                  className="sidebar-link"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Details */}
        <div className="product-details">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product-info">
            <h1>{product.title}</h1>
            <h3 className="product-price">{product.price} EGP</h3>
            <p className="text-container">
              {product.description ||
                "Premium quality product selection for your lifestyle."}
            </p>

            <button className="add-to-cart" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>
        </div>

        {/* Toast */}
        {/* Toast */}
{toast && (
  <div className="cart-toast show">
    <span className="toast-icon">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>

    <span className="toast-text">{toast}</span>
  </div>
)}
      </div>
    </section>
  );
}