import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

import { educationHistory } from "../data/education";
import { EducationCard } from "./EducationCard";

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.from(".section-index, .section-title, .section-subtitle", {
            scrollTrigger: {
              trigger: ".section-header",
              start: "top 85%",
              once: true,
            },
            y: 20,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
          });

          gsap.set(".education-card:not(.cert-card), .cert-block", {
            autoAlpha: 0,
            y: 40,
          });

          const eduTrigger = {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          };

          gsap.to(".education-card:not(.cert-card)", {
            scrollTrigger: eduTrigger,
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          });

          gsap.to(".cert-block", {
            scrollTrigger: {
              trigger: ".cert-block",
              start: "top 85%",
              once: true,
            },
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          });
        },
        sectionRef.current!,
      );
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="education" className="education-section">
      <div className="education-container">
        <div className="section-header">
          <div>
            <span className="section-index">04 / Education</span>
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
          <div className="cert-label">{"// Certifications"}</div>
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
