// ===== IMPORTS =====
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../Product/products";
import "./category.css";

// ===== DATA =====
export const categories = [
  { id: 1, title: "HOT DRINKS", slug: "hot-drinks", subtitle: "Crafted with Passion", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=900&h=1200" },
  { id: 2, title: "NON COFFEE", slug: "non-coffee", subtitle: "Delicious Alternatives", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=900&h=1200" },
  { id: 3, title: "MATCHA LOVERS", slug: "matcha", subtitle: "Green Energy", image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=900&h=1200" },
  { id: 4, title: "SUMMERIE DRINKS", slug: "summerie", subtitle: "Refreshing Vibes", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=900&h=1200" },
  { id: 5, title: "LEMONADES", slug: "lemonades", subtitle: "Zesty & Fresh", image: "https://images.unsplash.com/photo-1523362628745-0c100150b7a1?auto=format&fit=crop&q=80&w=900&h=1200" },
  { id: 6, title: "BLENDED DRINKS", slug: "blended", subtitle: "Thick & Sweet", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=900&h=1200" }
];
// ===== 1️⃣ CATEGORIES =====
export function Categories() {
  const navigate = useNavigate();

  return (
    <section className="categories-section" id="categories-section">
      <div className="categories-header">
        <h1>CATEGORIES</h1>
        <p>Explore the world of Blues</p>
      </div>

      <div className="categories-cards">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="category-card"
            onClick={() => navigate(`/category/${cat.slug}`)}
          >
            <img src={cat.image} alt={cat.title} />
            <div className="card-overlay" />
            <div className="card-content">
              <h2>{cat.title}</h2>
              <h4>{cat.subtitle}</h4>
              <button>EXPLORE</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== 2️⃣ CATEGORY VIEW =====
export default function CategoryView() {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const list = products.filter(
    (item) => item.category === slug
  );

  return (
    <div className="section-block">
      <h1 className="page-title">
        {slug.replace(/-/g, " ").toUpperCase()}
      </h1>

      <div className="product-grid">
        {list.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>

            <Link to={`/product/${item.id}`}>
              <button className="btn-cta">View</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}