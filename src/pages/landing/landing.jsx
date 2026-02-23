import Hero from "../hero/hero";
import VideoSection from "../videoSection/videoSection";
import { Categories } from "../category/category.jsx";
import Footer from "../fotter/fotter";
import ProductsSection from "../Product/ProductsSection";
import MemoriesSection from "../memoriesSection/memories.jsx";
import AboutSection from "../aboutSection/AboutSection.jsx";
// Landing.jsx
export default function Landing() {
  return (
    <>
      <section id="hero"><Hero /></section>
      <section id="categories"><Categories /></section>
      <section id="video"><VideoSection /></section>
      <section id="products"><ProductsSection /></section>
      <section id="about"><AboutSection /></section>
      <section id="memories"><MemoriesSection /></section>
  
      <section id="footer"><Footer /></section>
    </>
  );
}