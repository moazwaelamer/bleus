import { useEffect, useRef } from "react";
import "./memories.css";

export default function MemoriesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const images = {
    big: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200",
    small1: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800",
    small2: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800",
  };

  return (
    <section className="memories-section" ref={sectionRef}>
      <div className="memories-container">

        {/* Header */}
        <div className="memories-header reveal">
          <span className="eyebrow">Lifestyle</span>
          <h2>Memories</h2>
          <p>
            Coffee is never just a drink. It's the morning you didn't want to end.
            The conversation that changed everything.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="memories-grid">

          {/* Left big image */}
          <div className="memory-card big reveal zoom">
            <img src={images.big} alt="Coffee with friends" />
          </div>

          {/* Right column */}
          <div className="memory-right">

            <div className="memory-card reveal zoom delay-1">
              <img src={images.small1} alt="Morning coffee ritual" />
            </div>

            <div className="quote-card reveal delay-2">
              <p>
                “The best coffee is the one shared with someone you love.”
              </p>
              <span>— A BLEUS customer</span>
            </div>

            <div className="memory-card reveal zoom delay-3">
              <img src={images.small2} alt="Coffee by the window" />
            </div>

          </div>
        </div>

        {/* Stats */}
        <div className="memories-stats reveal delay-4">
          <div>
            <h3>14</h3>
            <p>Origin Countries</p>
          </div>
          <div>
            <h3>2M+</h3>
            <p>Cups Served</p>
          </div>
          <div>
            <h3>8</h3>
            <p>Years Crafting</p>
          </div>
        </div>

      </div>
    </section>
  );
}