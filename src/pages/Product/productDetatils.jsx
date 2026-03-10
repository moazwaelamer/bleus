import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "./products";
import "./productDetatils.css";
import BackButton from "../../components/BackButton/BackButton.jsx";
export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState("");

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
<BackButton />

      

      <div className="product-container">

        <aside className="product-sidebar">
          <h3>OTHER PRODUCTS</h3>
          <ul>
            <li>
              <Link to={`/product/${product.id}`} className="sidebar-link active">
                {product.title}
              </Link>
            </li>

            {otherProducts.map((item) => (
              <li key={item.id}>
                <Link to={`/product/${item.id}`} className="sidebar-link">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

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