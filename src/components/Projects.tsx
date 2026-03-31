import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { projects } from "../data/projects";
import { FeaturedProject } from "./FeaturedProject";
import { ProjectCard } from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  useGSAP(
    () => {
      // Animate featured project
      if (featuredProject) {
        gsap.from(".featured-project-image-container", {
          scrollTrigger: {
            trigger: ".featured-project",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        gsap.from(".featured-project-content", {
          scrollTrigger: {
            trigger: ".featured-project",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Animate project grid cards
      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((card, index) => {
        gsap.from(card as HTMLElement, {
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      <div className="projects-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-subtitle">
            A collection of recent work showcasing technical skills and creative
            solutions
          </p>
        </div>

        {/* Featured Project */}
        {featuredProject && <FeaturedProject project={featuredProject} />}

        {/* Project Grid */}
        {otherProjects.length > 0 && (
          <div className="projects-grid">
            {otherProjects.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${index}`}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
