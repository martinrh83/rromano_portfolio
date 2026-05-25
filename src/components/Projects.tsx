import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { projects } from "#/data/projects";
import { FeaturedProject } from "./FeaturedProject";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  const featuredProject = projects.find((p) => p.featured);

  useGSAP(
    () => {
      gsap.from(".projects-section .section-header", {
        scrollTrigger: {
          trigger: ".projects-section .section-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      if (featuredProject) {
        gsap.from(".fp-media", {
          scrollTrigger: {
            trigger: ".featured-project",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        gsap.from(".fp-content", {
          scrollTrigger: {
            trigger: ".featured-project",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
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
