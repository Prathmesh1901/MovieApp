// src/components/SplitText.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function SplitText({
  text,
  className = "",
  delay = 0,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  onLetterAnimationComplete,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll("span");

    gsap.fromTo(
      letters,
      from,
      {
        ...to,
        delay: delay / 1000,
        duration,
        ease,
        stagger: 0.05,
        onComplete: () => {
          if (onLetterAnimationComplete) onLetterAnimationComplete();
        },
      }
    );
  }, [text]);

  return (
    <div ref={containerRef} className={className}>
      {text.split("").map((char, i) => (
        <span key={i} style={{ display: "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

export default SplitText;
