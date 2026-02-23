import { useEffect, useState } from 'react';
import './intro.css';

export default function Intro({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3200);

    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`intro-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="intro-scene">
        <div className="man-walking">
          <svg width="200" height="400" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Head */}
            <ellipse cx="100" cy="80" rx="18" ry="20" fill="#2E4A7D" />
            
            {/* Neck */}
            <rect x="95" y="98" width="10" height="12" fill="#2E4A7D" />
            
            {/* Torso */}
            <path d="M 85 110 L 115 110 L 112 180 L 88 180 Z" fill="#2E4A7D" />
            
            {/* Left arm holding sign */}
            <path d="M 85 120 L 60 140 L 58 220 L 62 220 L 65 140 L 88 125 Z" fill="#2E4A7D" />
            
            {/* Right arm holding sign */}
            <path d="M 115 120 L 140 140 L 142 220 L 138 220 L 135 140 L 112 125 Z" fill="#2E4A7D" />
            
            {/* Sign board */}
            <rect x="45" y="135" width="110" height="90" rx="3" fill="#F5F5F0" stroke="#2E4A7D" strokeWidth="2" className="signboard" />
            <text x="100" y="185" textAnchor="middle" fill="#2E4A7D" fontSize="28" fontWeight="700" letterSpacing="4" className="sign-text">BLEUS</text>
            
            {/* Legs */}
            <path d="M 88 180 L 85 260 L 82 340 L 88 340 L 92 260 L 95 180 Z" fill="#2E4A7D" />
            <path d="M 105 180 L 108 260 L 111 340 L 105 340 L 101 260 L 98 180 Z" fill="#2E4A7D" />
            
            {/* Shoes */}
            <ellipse cx="85" cy="342" rx="8" ry="4" fill="#2E4A7D" />
            <ellipse cx="108" cy="342" rx="8" ry="4" fill="#2E4A7D" />
            
            {/* Subtle shadow */}
            <ellipse cx="100" cy="355" rx="30" ry="5" fill="#2E4A7D" opacity="0.1" className="shadow" />
          </svg>
        </div>
      </div>
    </div>
  );
}
