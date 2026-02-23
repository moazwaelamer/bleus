import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./videoSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    // إعدادات إلزامية للـ autoplay
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    const safePlay = () => {
      video.play().catch(() => {});
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: safePlay,
      onEnterBack: safePlay,
      onLeave: () => video.pause(),
      onLeaveBack: () => video.pause(),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section className="video-section" id="video" ref={sectionRef}>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        poster="/assest/video-fallback.jpg"
      >
        <source src="/assest/bleu.mp4" type="video/mp4" />
      </video>
    </section>
  );
}