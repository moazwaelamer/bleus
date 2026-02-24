import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./videoSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // إعدادات autoplay الآمنة
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    const playVideo = () => {
      setVisible(true);
      video.play().catch(() => {});
    };

    const pauseVideo = () => {
      video.pause(); // يكمل من نفس المكان
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: playVideo,
      onEnterBack: playVideo,
      onLeave: pauseVideo,
      onLeaveBack: pauseVideo,
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="video-section">
      {/* background + video */}
      <div className="video-overlay" />
      <div className="video-layer">
       <video
  ref={videoRef}
  className={`video ${visible ? "show-video" : ""}`}
  muted
  playsInline
  preload="auto"
  loop   // 👈 ده الحل
>
  <source src="/assest/bleu.mp4" type="video/mp4" />
</video>

        
      </div>

      {/* content */}
     
    </section>
  );
}