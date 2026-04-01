import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import type { IconType } from "react-icons";
import {
  SiAngular,
  SiDocker,
  SiDrizzle,
  SiExpress,
  SiGit,
  SiGithubactions,
  SiGsap,
  SiIonic,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

import { useTheme } from "../context/ThemeContext";
import { type Skill, skillCategories } from "../data/skills";
import { GlowOrb } from "./GlowOrb";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, IconType> = {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiAngular,
  SiIonic,
  SiRedux,
  SiGsap,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiDrizzle,
  SiSupabase,
  SiGit,
  SiDocker,
  SiVercel,
  SiGithubactions,
};

function SkillCard({ skill }: { skill: Skill }) {
  const { theme } = useTheme();
  const IconComponent = iconMap[skill.icon];
  const color =
    theme === "light" && skill.lightColor ? skill.lightColor : skill.color;

  return (
    <div
      className="skill-card"
      style={{ "--skill-color": color } as React.CSSProperties}
    >
      {IconComponent && (
        <span className="skill-icon">
          <IconComponent />
        </span>
      )}
      <span className="skill-name">{skill.name}</span>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Animate section header
      gsap.from(".skills-header", {
        scrollTrigger: {
          trigger: ".skills-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate each category group
      const groups = gsap.utils.toArray<HTMLElement>(".skill-category-group");
      groups.forEach((group, i) => {
        const labelRow = group.querySelector(".skill-category-label-row");
        const cards = group.querySelectorAll(".skill-card");

        // Pre-hide before ScrollTrigger initializes — no flash
        gsap.set(labelRow, { x: -16, opacity: 0 });
        gsap.set(cards, { y: 40, opacity: 0 });

        // Animate label row
        gsap.to(labelRow, {
          scrollTrigger: {
            trigger: group,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.05,
          ease: "power3.out",
        });

        // Animate cards with stagger
        gsap.to(cards, {
          scrollTrigger: {
            trigger: group,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          delay: i * 0.05 + 0.1,
          ease: "power3.out",
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="skills" className="skills-section">
      <div className="skills-container">
        <div className="section-header skills-header">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I use to build products
          </p>
        </div>

        <div className="skills-categories">
          {skillCategories.map((group) => (
            <div key={group.category} className="skill-category-group">
              <div className="skill-category-label-row">
                <GlowOrb size={9} />
                <span className="skill-category-label">{group.category}</span>
              </div>
              <div className="skill-cards-row">
                {group.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
