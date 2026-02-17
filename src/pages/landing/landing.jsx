import Hero from "../hero/hero";
import VideoSection from "../videoSection/videoSection";
import { Categories } from "../category/category.jsx";
import Footer from "../fotter/fotter";
import ProductsSection from "../Product/ProductsSection";
// Landing.jsx
export default function Landing() {
  return (
    <>
      <section id="hero"><Hero /></section>
      <section id="categories"><Categories /></section>
      <section id="video"><VideoSection /></section>
      <section id="products"><ProductsSection /></section>
      <section id="footer"><Footer /></section>
    </>
  );
}