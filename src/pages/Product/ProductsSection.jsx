import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { products } from "./products";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductsSection.css";

export default function ProductsSection() {
  const navigate = useNavigate();

  // 🔥 Best sellers (4 منتجات بس عشان الشكل)
  const bestSellers = Array.isArray(products)
    ? products.slice(0, 5)
    : Object.values(products)
        .filter(Array.isArray)
        .flatMap((cat) => cat.slice(0, 1))
        .slice(0, 5);

  const sliderSettings = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2200,
    centerMode: true,
    centerPadding: "32%",   
    arrows: false,
    dots: false,
    pauseOnHover: false,
    cssEase: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  };

  return (
    <section className="products-section">
      <div className="inner">
        <h2 className="section-title">Best Sellers</h2>

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
      </div>
    </section>
  );
}
