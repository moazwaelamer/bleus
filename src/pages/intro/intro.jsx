import { useEffect, useState } from "react";
import "./intro.css";

const characterImg = "/assest/bleus-character.png";

export default function BleusExperience({ onFinish }) {
  const [phase, setPhase] = useState(0);
  // phase 0: nothing visible
  // phase 1: "Welcome to" fades in
  // phase 2: character approaches from far away (scales up)
  // phase 3: character stopped, signboard fades in at hands
  // phase 4: tagline fades in
  // phase 5: intro done, call onFinish

  useEffect(() => {
    const timers = [];

    timers.push(setTimeout(() => setPhase(1), 400));
    timers.push(setTimeout(() => setPhase(2), 1600));
    timers.push(setTimeout(() => setPhase(3), 4200));
    timers.push(setTimeout(() => setPhase(4), 5400));
    timers.push(setTimeout(() => {
      setPhase(5);
      if (onFinish) onFinish();
    }, 7600));

    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <div className="intro-scene">
      <div className="intro-stage">
        {/* "Welcome to" text */}
        <p className={`intro-welcome ${phase >= 1 ? "visible" : ""}`}>
          Welcome to
        </p>

        {/* Character + signboard — treated as one unit */}
        <div
          className={`intro-character-unit ${
            phase >= 2 ? "approaching" : ""
          } ${phase >= 3 ? "arrived" : ""}`}
        >
          {/* Signboard the character is "holding" */}
          <div className={`intro-signboard ${phase >= 3 ? "visible" : ""}`}>
            <span className="intro-signboard-text">BLEUS</span>
          </div>

          {/* Character illustration */}
          <img
            src={characterImg}
            alt="BLEUS mascot character holding a signboard"
            className="intro-character-img"
            draggable="false"
          />
        </div>

        {/* Tagline */}
        <p className={`intro-tagline ${phase >= 4 ? "visible" : ""}`}>
          your lifestyle deserves a good coffee
        </p>
      </div>
    </div>
  );
}
