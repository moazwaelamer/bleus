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

    // إعدادات البداية لضمان عمل الـ Autoplay على الموبايل
    video.muted = true;
    video.setAttribute("muted", ""); // تأكيد للـ HTML
    video.playsInline = true;
    video.setAttribute("playsinline", "");

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%", // هيبدأ يشتغل اول ما يقرب من السكشن
      end: "bottom 20%",
      onEnter: () => video.play(),
      onEnterBack: () => video.play(),
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
        preload="metadata" // "metadata" أخف بكتير من "auto" في التحميل
        poster="/assest/video-fallback.jpg" // صورة تظهر لو الفيديو اتأخر في التحميل
      >
        <source src="/assest/bleu.mp4" type="video/mp4" />
      </video>
    </section>
  );
}