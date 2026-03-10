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
  mem1: "/assest/mem1.jpg",
  mem2: "/assest/mem2.jpg",
  mem3: "/assest/mem3.jpeg"
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
            <img src={images.mem2} alt="Coffee with friends" />
          </div>

          {/* Right column */}
          <div className="memory-right">

            <div className="memory-card reveal zoom delay-1">
              <img src={images.mem3} alt="Morning coffee ritual" />
            </div>

            <div className="quote-card reveal delay-2">
              <p>
                “The best coffee is the one shared with someone you love.”
              </p>
              <span>— A BLEUS customer</span>
            </div>

            <div className="memory-card reveal zoom delay-3">
              <img src={images.mem1} alt="Coffee by the window" />
            </div>

          </div>
        </div>

        {/* Stats */}
       

      </div>
    </section>
  );
}