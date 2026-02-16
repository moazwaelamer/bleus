import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { products } from "./products";
import { categories } from "../category/category";
import "./product.css";

export default function CategoryPage() {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]); //

 const categoryProducts = slug
  ? products.filter((p) => p.category === slug)
  : [];
  return (
    <section className="category-page">

      <div className="category-container">

        {/* ===== SIDEBAR ===== */}
        <aside className="category-sidebar">
          <h3>PRODUCT LIST</h3>
          <ul>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/category/${cat.slug}`}
                  className={`sidebar-link ${
                    slug === cat.slug ? "active" : ""
                  }`}
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
            {categoryProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="product-link"
              >
                <div className="product-card">
                  <div className="product-image">
                    <img
  src={item.image}
  alt={item.title}
  loading="lazy"
/>
                  </div>
                  <h3>{item.title}</h3>
                  <span>{item.price} EGP</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
