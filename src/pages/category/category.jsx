// ===== IMPORTS =====
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../Product/products";
import "./category.css";

// ===== DATA =====
export const categories = [
  {
    id: 1,
    title: "HOT DRINKS",
    slug: "hot-drinks",
    subtitle: "Crafted with Passion",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900",
  },
  {
    id: 2,
    title: "COLD DRINKS",
    slug: "cold-drinks",
    subtitle: "Cold & Refreshing",
    image: "https://images.unsplash.com/photo-1510626176961-4b37d6f1c63f?w=900",
  },
  {
    id: 3,
    title: "ESPRESSO BAR",
    slug: "espresso-bar",
    subtitle: "Strong & Bold",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d4?w=900",
  },
  {
    id: 4,
    title: "MATCHA",
    slug: "matcha",
    subtitle: "Green Energy",
    image: "https://images.unsplash.com/photo-1507914372368-b2b085b925a1?w=900",
  },
  {
    id: 5,
    title: "DESSERTS",
    slug: "desserts",
    subtitle: "Sweet Moments",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b7a1?w=900",
  },
  {
    id: 6,
    title: "BREAKFAST",
    slug: "breakfast",
    subtitle: "Perfect Start",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=900",
  },
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