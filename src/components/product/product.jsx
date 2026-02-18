import { useParams, Link, useNavigate } from "react-router-dom"; // أضفنا useNavigate
import { useEffect } from "react";
import { products } from "../../pages/Product/products.js";
import { categories } from "../../pages/category/category";
import "./product.css";

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate(); // عشان زرار الرجوع

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const categoryProducts = slug ? products.filter((p) => p.category === slug) : [];

  return (
    <section className="category-page">
      {/* زرار الرجوع الموحد */}
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

      <div className="category-container">
        {/* ===== SIDEBAR ===== */}
        <aside className="category-sidebar">
          <h3>PRODUCT LIST</h3>
          <ul>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/category/${cat.slug}`}
                  className={`sidebar-link ${slug === cat.slug ? "active" : ""}`}
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* ===== PRODUCTS AREA ===== */}
        <div className="category-content">
          <div className="category-header">
            <h1>{slug?.replace(/-/g, " ").toUpperCase()}</h1>
          </div>

        <div className="products-grid">
  {categoryProducts.length === 0 ? (
    <p className="empty-category">No products found</p>
  ) : (
    categoryProducts.map((item) => (
      <Link key={item.id} to={`/product/${item.id}`} className="product-link">
        <div className="product-card">
          <div className="product-image-box">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="product-card-info">
            <h3>{item.title}</h3>
            <span>{item.price} EGP</span>
          </div>
        </div>
      </Link>
    ))
  )}
</div>

        </div>
      </div>
    </section>
  );
}