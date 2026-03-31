import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { educationHistory } from "../data/education";
import { EducationCard } from "./EducationCard";

gsap.registerPlugin(ScrollTrigger);

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".education-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".education-card-divider", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="education" className="education-section">
      <div className="education-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            The academic foundation behind the craft
          </p>
        </div>

        {/* Cards grid — centered if single, grid if multiple */}
        <div
          className={`education-grid ${educationHistory.length === 1 ? "education-grid-single" : ""}`}
        >
          {educationHistory.map((edu, i) => (
            <EducationCard key={i} education={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}
