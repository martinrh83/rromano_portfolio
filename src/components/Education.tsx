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
      gsap.from(".section-header", {
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

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
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="education" className="education-section">
      <div className="education-container">
        <div className="section-header">
          <div>
            <span className="section-index">05 / Education</span>
            <h2 className="section-title">The foundation</h2>
          </div>
          <p className="section-subtitle">
            Where the theory came from. The rest was the internet, late nights,
            and countless extra hours.
          </p>
        </div>

        {educationHistory.map((edu, i) => (
          <EducationCard key={i} education={edu} />
        ))}

        <div className="cert-block">
          <div className="cert-label">// Certifications</div>
          <div className="education-card cert-card">
            <div className="edu-mono">EN</div>
            <div>
              <div className="edu-degree">IELTS · English Proficiency</div>
              <div className="edu-school">
                British Council <span className="flag">· C1</span>
              </div>
            </div>
            <div className="edu-period">7.0 Overall · 2022</div>
          </div>
        </div>
      </div>
    </section>
  );
}
