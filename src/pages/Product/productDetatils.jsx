import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "./products";
import "./productDetatils.css";
export default function ProductView() {
  const { id } = useParams();
  const [toast, setToast] = useState("");

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) return <h2>Product Not Found</h2>;

  const otherProducts = products.filter(
    (p) =>
      p.category === product.category &&
      p.id !== product.id
  );

  const handleAddToCart = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // ❌ مش عامل Login
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
    window.dispatchEvent(new Event("cartUpdated"));

    // ✅ Toast Message
    setToast(`"${product.title}" added to cart 🛒`);

    // (اختياري) افتح الكارت
    window.dispatchEvent(new Event("openCart"));

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  return (
    <section className="product-view">
      <div className="product-container">

        {/* SIDEBAR */}
        <aside className="product-sidebar">
          <h3>OTHER PRODUCTS</h3>
          <ul>
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

        {/* DETAILS */}
        <div className="product-details">
          <div className="product-image">
            <img
              src={product.image}
              alt={product.title}
            />
          </div>

          <div className="product-info">
            <h1>{product.title}</h1>
            <h3>{product.price} EGP</h3>
            <p>{product.description || "Premium quality product."}</p>

            <button
              className="add-to-cart"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>

        {/* TOAST */}
        {toast && (
          <div className="add-toast">
            {toast}
          </div>
        )}

      </div>
    </section>
  );
}
