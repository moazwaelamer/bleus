import Hero from "../hero/hero";
import VideoSection from "../videoSection/videoSection";
import { Categories } from "../category/category.jsx";
import Footer from "../fotter/fotter";
import ProductsSection from "../Product/ProductsSection";
export default function Landing() {
  return (
    <>
      <Hero />
      <Categories />
      <VideoSection />
      <ProductsSection />
      <Footer />
      
    </>
  );
}