import { useNavigate } from "react-router-dom";
import { products } from "../Product/products"; // تأكد من مسار ملف المنتجات
import "./category.css";

export const categories = [
  { id: 1, title: "HOT DRINKS", slug: "hot-drinks", subtitle: "Crafted with Passion", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=900&h=1200" },
  { id: 2, title: "NON COFFEE", slug: "non-coffee", subtitle: "Delicious Alternatives", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=900&h=1200" },
  { id: 3, title: "MATCHA LOVERS", slug: "matcha", subtitle: "Green Energy", image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=900&h=1200" },
  { id: 4, title: "SUMMERIE DRINKS", slug: "summerie", subtitle: "Refreshing Vibes", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=900&h=1200" },
  { id: 5, title: "LEMONADES", slug: "lemonades", subtitle: "Zesty & Fresh", image: "https://images.unsplash.com/photo-1523362628745-0c100150b7a1?auto=format&fit=crop&q=80&w=900&h=1200" },
  { id: 6, title: "BLENDED DRINKS", slug: "blended", subtitle: "Thick & Sweet", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=900&h=1200" }
];

export function Categories() {
  const navigate = useNavigate();

  return (
    <section className="categories-section-v3">
      <div className="cat-header-v3">
        <p>OUR PICKS</p>
        <h1>Categories</h1>
      </div>

      <div className="cat-grid-v3">
        {categories.map((cat) => {
          // 🔥 السطر ده هو اللي بيحسب عدد المنتجات أوتوماتيك
          const productCount = products.filter(p => p.category === cat.slug).length;

          return (
            <div key={cat.id} className="cat-card-v3" onClick={() => navigate(`/category/${cat.slug}`)}>
              <div className="cat-img-container">
                <img src={cat.image} alt={cat.title} />
                <div className="cat-hover-overlay">
                  <p>Check out our best {cat.title.toLowerCase()} selections.</p>
                  <span>Shop Now →</span>
                </div>
              </div>

              <div className="cat-details-footer">
                <div className="cat-main-row">
                  <h3>{cat.title}</h3>
                  {/* هنا الرقم بيظهر أوتوماتيك */}
                  <span className="cat-product-count">{productCount} products</span>
                </div>
                <p className="cat-sub-desc">{cat.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}