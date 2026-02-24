import { useEffect, useState } from "react";
import "./intro.css";

export default function BleusExperience({ onFinish }) {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFlip(true), 4200);
    const t2 = setTimeout(() => {
      onFinish && onFinish();
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onFinish]);

  return (
    <div className="book-scene">
      <div className={`page ${flip ? "flip" : ""}`}>
        <div className="page-front">
          <div className="welcome-screen">
            <p className="welcome-text">Welcome to</p>
            <h1 className="bleus-title">BLEUS</h1>
            <p className="tagline">your lifestyle deserves a good coffee</p>
          </div>
        </div>

        <div className="page-back" />
      </div>
    </div>
  );
}