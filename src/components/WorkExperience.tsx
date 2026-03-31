import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { experiences } from "../data/experiences";
import { TimelineCard } from "./TimelineCard";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate timeline line growing from top
      gsap.from(timelineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: "top center",
      });

      // Animate timeline cards
      const cards = gsap.utils.toArray(".timeline-card");
      cards.forEach((card) => {
        gsap.from(card as HTMLElement, {
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Animate timeline nodes
      const nodes = gsap.utils.toArray(".timeline-node");
      nodes.forEach((node) => {
        gsap.from(node as HTMLElement, {
          scrollTrigger: {
            trigger: node as HTMLElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="work" className="work-experience-section">
      <div className="work-experience-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Building products and leading teams across the tech stack
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          {/* Timeline Line */}
          <div ref={timelineRef} className="timeline-line" />

          {/* Timeline Items */}
          <div className="timeline-items">
            {experiences.map((experience, index) => (
              <TimelineCard
                key={`${experience.company}-${index}`}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
