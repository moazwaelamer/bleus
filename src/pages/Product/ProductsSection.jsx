import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { products } from "./products"; // تأكد إن ملف الـ products في نفس الفولدر
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductsSection.css";

export default function ProductsSection() {
  const navigate = useNavigate();

  // 1. تعريف الـ bestSellers (ده اللي كان ناقص وعامل الإيرور)
  const bestSellers = products ? products.slice(0, 5) : [];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 3,        // يظهر 3 منتجات في الديسكتوب زي Nespresso
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  centerMode: true,
  centerPadding: "0px",    // نلغي الحواف عشان الـ 3 يبقوا ماليين الشاشة
  
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,   // منتجين في الشاشات المتوسطة
      }
    },
    {
      breakpoint: 768,     // للموبايل
      settings: {
        slidesToShow: 1,
        centerMode: false, // نلغي السنتر عشان المنتج يظهر لوحده
        centerPadding: "0",
      }
    }
  ]
};
  return (
    <section id="products-section" className="products-section">
      <div className="inner">
        <h2 className="section-title">Best Sellers</h2>

        {/* 2. حماية الـ Map: نتأكد إن فيه داتا قبل ما نرسم */}
        {bestSellers.length > 0 ? (
          <Slider {...sliderSettings} className="center-slider">
            {bestSellers.map((product) => (
              <div key={product.id}>
                <div
                  className="product-slide"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <button>View Details</button>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p style={{ textAlign: "center" }}>Loading Products...</p>
        )}
      </div>
    </section>
  );
}