import "./hero.css";

export default function Hero() {

  // دالة عامة لأي سكشن
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // للسهم
  const scrollToNext = () => {
    scrollToSection("categories");
  };

  return (
    <section className="hero" id="hero">
      {/* Background Image */}
     

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <span className="hero-eyebrow">Specialty Coffee</span>

        <h1>
          Crafted for <br />
          <em>those who taste</em>
        </h1>

        <p>
          Every cup tells the story of the soil, the season,
          <br />
          and the hands that nurtured it.
        </p>

        {/* Buttons */}
        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => scrollToSection("categories")}
          >
            Explore Collection
          </button>

          <button
            className="btn-secondary"
            onClick={() => scrollToSection("about")}
          >
            Our Story
          </button>
        </div>
      </div>

      {/* Scroll Arrow */}
      <button className="scroll-arrow" onClick={scrollToNext}>
        ↓
      </button>
    </section>
  );
}