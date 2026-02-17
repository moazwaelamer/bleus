import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./videoSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    video.muted = true;
    video.volume = 0;
    video.playsInline = true;

    const onReady = () => setReady(true);
    video.addEventListener("canplay", onReady);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 30%",

      onEnter: () => {
        if (!ready) return;

        video.play().catch(() => {});

        if (soundOn) {
          video.muted = false;
          gsap.to(video, { volume: 1, duration: 0.4 });
        }
      },

      onEnterBack: () => {
        if (!ready) return;

        video.play().catch(() => {});

        if (soundOn) {
          video.muted = false;
          gsap.to(video, { volume: 1, duration: 0.4 });
        }
      },

      onLeave: () => {
        video.pause();
        video.muted = true;
        video.volume = 0;
      },

      onLeaveBack: () => {
        video.pause();
        video.muted = true;
        video.volume = 0;
      },
    });

    return () => {
      trigger.kill();
      video.removeEventListener("canplay", onReady);
    };
  }, [ready, soundOn]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (soundOn) {
      gsap.to(video, {
        volume: 0,
        duration: 0.4,
        onComplete: () => (video.muted = true),
      });
    } else {
      video.muted = false;
      video.play();
      gsap.to(video, { volume: 1, duration: 0.6 });
    }

    setSoundOn(!soundOn);
  };

  return (
    <section className="video-section" id="video" ref={sectionRef}>
      <video ref={videoRef} loop preload="auto">
        <source src="/assest/bleu.mp4" type="video/mp4" />
      </video>

      <button className="sound-toggle" onClick={toggleSound}>
        {soundOn ? "🔊" : "🔇"}
      </button>
    </section>
  );
}
