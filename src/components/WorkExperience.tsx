import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

import { experiences } from "../data/experiences";
import { TimelineCard } from "./TimelineCard";

export function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

          // Timeline line grows with scroll — scrub: 0.3 keeps it tightly linked
          gsap.fromTo(
            timelineRef.current,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 40%",
                end: "bottom 90%",
                scrub: 0.3,
                id: "timeline-growth",
              },
            },
          );

          const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
          cards.forEach((card, i) => {
            gsap.from(card, {
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
              x: i % 2 === 0 ? -20 : 20,
              y: 40,
              autoAlpha: 0,
              duration: 0.8,
              ease: "power3.out",
            });
          });

          const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");
          nodes.forEach((node) => {
            gsap.from(node, {
              scrollTrigger: { trigger: node, start: "top 85%", once: true },
              scale: 0,
              rotation: 45,
              autoAlpha: 0,
              duration: 0.5,
              ease: "power3.out",
            });
          });
        },
        sectionRef.current!,
      );
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="work" className="work-experience-section">
      <div className="work-experience-container">
        {/* Section Header */}
        <div className="section-header">
          <div>
            <span className="section-index">03 / Work</span>
            <h2 className="section-title">Work Experience</h2>
          </div>
          <p className="section-subtitle">
            The companies, the roles, and what actually shipped.
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
