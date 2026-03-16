import { useEffect, useRef } from "react";
import "./AboutSection.css";

export default function AboutSection() {
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
  mem1: "/assest/mem3.jpeg",
};
  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-container">

        {/* Image + Text */}
        <div className="about-top">
          <div className="about-image reveal zoom">
            <img
              src={images.mem1}
              alt="BLEUS Roastery"
            />
          </div>

          <div className="about-text reveal">
            <span className="about-eyebrow">Our Story</span>

            <h2>
              We didn't set out <br />
              <em>to sell coffee.</em> <br />
              We set out to <br />
              change how you <br />
              experience it.
            </h2>

            <p>
              BLEUS was born from a simple frustration — beautiful coffee being
              roasted for volume, not for taste. We left behind the mainstream
              and went back to basics: farms, farmers, fire, and patience.
            </p>

            <p>
              Today, every bag we roast is an act of storytelling. We trace each
              bean to its altitude, its soil, its season. And we roast it just
              once — the right way.
            </p>
          </div>
        </div>

        {/* Pillars */}
       

      </div>
    </section>
  );
}