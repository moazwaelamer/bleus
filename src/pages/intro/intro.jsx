import { useEffect, useState } from "react";
import "./intro.css";

const characterImg = "/assest/IMG_0709.PNG";

export default function BleusExperience({ onFinish }) {
  const [phase, setPhase] = useState(0);
  // phase 0: nothing visible
  // phase 1: "Welcome to" fades in
  // phase 2: character approaches (scales up from far away)
  // phase 3: character stopped, signboard visible
  // phase 4: tagline fades in
  // phase 5: intro done, call onFinish

  useEffect(() => {
    const timers = [];

    // Phase 1: Show "Welcome to" after a brief pause
    timers.push(setTimeout(() => setPhase(1), 400));

    // Phase 2: Start character approach animation
    timers.push(setTimeout(() => setPhase(2), 1600));

    // Phase 3: Character stops, signboard appears
    timers.push(setTimeout(() => setPhase(3), 4200));

    // Phase 4: Show tagline
    timers.push(setTimeout(() => setPhase(4), 5200));

    // Phase 5: Finish intro
    timers.push(setTimeout(() => {
      setPhase(5);
      if (onFinish) onFinish();
    }, 7400));

    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <div className="intro-scene">
      <div className="intro-perspective">
        {/* Welcome text */}
        <p className={`intro-welcome ${phase >= 1 ? "visible" : ""}`}>
          Welcome to
        </p>

        {/* Character container with approach animation */}
        <div
          className={`intro-character-wrapper ${phase >= 2 ? "approaching" : ""} ${phase >= 3 ? "arrived" : ""}`}
        >
          <div className="intro-character">
            <img
              src={characterImg}
              alt="BLEUS character mascot"
              className="intro-character-img"
            />
            {/* Signboard held by character */}
            <div className={`intro-signboard ${phase >= 3 ? "visible" : ""}`}>
              <span className="intro-signboard-text">BLEUS</span>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className={`intro-tagline ${phase >= 4 ? "visible" : ""}`}>
          your lifestyle deserves a good coffee
        </p>
      </div>
    </div>
  );
}
