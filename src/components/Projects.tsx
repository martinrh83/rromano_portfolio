import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

import { projects } from "#/data/projects";
import { FeaturedProject } from "./FeaturedProject";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  const featuredProject = projects.find((p) => p.featured);

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

          if (featuredProject) {
            gsap.from(".fp-media", {
              scrollTrigger: {
                trigger: ".featured-project",
                start: "top 80%",
                once: true,
              },
              x: 20,
              y: 15,
              scale: 0.96,
              autoAlpha: 0,
              duration: 1,
              ease: "power3.out",
            });

            gsap.from(".fp-content", {
              scrollTrigger: {
                trigger: ".featured-project",
                start: "top 80%",
                once: true,
              },
              x: -20,
              y: 10,
              autoAlpha: 0,
              duration: 1,
              ease: "power3.out",
            });
          }
        },
        sectionRef.current!,
      );
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      <div className="projects-container">
        <div className="section-header">
          <div>
            <span className="section-index">04 / Projects</span>
            <h2 className="section-title">Selected work</h2>
          </div>
          <p className="section-subtitle">
            A curated selection of what made it past the idea stage.
          </p>
        </div>

        {featuredProject && <FeaturedProject project={featuredProject} />}
      </div>
    </section>
  );
}
