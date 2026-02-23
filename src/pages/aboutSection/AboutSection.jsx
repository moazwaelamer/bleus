import { useEffect, useRef } from "react";
import "./AboutSection.css";

const pillars = [
  {
    num: "01",
    title: "Origin",
    desc: "We travel to source directly from farmers who share our obsession for quality.",
  },
  {
    num: "02",
    title: "Craft",
    desc: "Small-batch roasting in our atelier, dialing in each profile with precision and patience.",
  },
  {
    num: "03",
    title: "Community",
    desc: "Every cup you drink supports fair wages and regenerative farming practices.",
  },
];

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

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-container">

        {/* Image + Text */}
        <div className="about-top">
          <div className="about-image reveal zoom">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1400"
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
        <div className="about-pillars">
          {pillars.map((p, i) => (
            <div
              key={p.num}
              className="pillar reveal"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <span className="pillar-num">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}