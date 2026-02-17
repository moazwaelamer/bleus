import "./hero.css";

export default function Hero() {

  const scrollToNext = () => {
    const nextSection = document.getElementById("categories-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="hero">
      <img
        src="/assest/wal.jpeg"
        alt="Coffee"
        className="hero-image"
      />

      <div className="hero-overlay" />

      {/* Animated Arrow */}
      <button
        className="scroll-arrow"
        onClick={scrollToNext}
      >
        ↓
      </button>
    </section>
  );
}