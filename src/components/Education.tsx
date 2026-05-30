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
          const section = sectionRef.current!;

          // Section header — tightened stagger, same y+autoAlpha as sibling sections
          gsap.from(".section-index, .section-title, .section-subtitle", {
            scrollTrigger: {
              trigger: ".section-header",
              start: "top 85%",
              once: true,
            },
            y: 20,
            autoAlpha: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.09,
          });

          // Education cards — slide from left (x) rather than generic y-drop,
          // then mono badges pop in separately with back.out for a two-beat rhythm.
          const cards = section.querySelectorAll<HTMLElement>(
            ".education-card:not(.cert-card)",
          );

          gsap.set(cards, { autoAlpha: 0, x: -14 });
          gsap.set(".education-card:not(.cert-card) .edu-mono", { scale: 0 });

          const eduTrigger = {
            trigger: section,
            start: "top 75%",
            once: true,
          };

          gsap.to(cards, {
            scrollTrigger: eduTrigger,
            autoAlpha: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          });

          // Badges offset 0.2 s behind each card so they pop as the card settles
          gsap.to(".education-card:not(.cert-card) .edu-mono", {
            scrollTrigger: eduTrigger,
            scale: 1,
            duration: 0.38,
            stagger: 0.12,
            ease: "back.out(1.5)",
            delay: 0.2,
          });

          // Cert block — label slides in first, then card, then badge
          const certBlock = section.querySelector(".cert-block");

          gsap.from(".cert-label", {
            scrollTrigger: {
              trigger: certBlock,
              start: "top 88%",
              once: true,
            },
            autoAlpha: 0,
            x: -8,
            duration: 0.45,
            ease: "power2.out",
          });

          gsap.set(".cert-card", { autoAlpha: 0, x: -14 });
          gsap.set(".cert-card .edu-mono", { scale: 0 });

          const certTrigger = {
            trigger: certBlock,
            start: "top 88%",
            once: true,
          };

          gsap.to(".cert-card", {
            scrollTrigger: certTrigger,
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.15,
          });

          gsap.to(".cert-card .edu-mono", {
            scrollTrigger: certTrigger,
            scale: 1,
            duration: 0.38,
            ease: "back.out(1.5)",
            delay: 0.35,
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
