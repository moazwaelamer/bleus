import { useParams, Link } from "react-router-dom"; // أضفنا useNavigate
import { useEffect } from "react";
import { products } from "../../pages/Product/products.js";
import { categories } from "../../pages/category/category";
import "./product.css";
import BackButton from "../BackButton/BackButton.jsx";
export default function CategoryPage() {
  const { slug } = useParams(); // عشان زرار الرجوع

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const categoryProducts = slug ? products.filter((p) => p.category === slug) : [];

  return (
    <section className="category-page">
      {/* زرار الرجوع الموحد */}
    <BackButton />


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