import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { type Skill, focusSkills, skillCategories } from "#/data/skills";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_CLASS: Record<string, string> = {
  "Frontend": "bento-front",
  "Backend": "bento-back",
  "Tooling & DevOps": "bento-tools",
  "AI": "bento-ai",
  "Exploring": "bento-extras",
};

function Chip({ skill }: { skill: Skill }) {
  const tier = skill.tier ?? "secondary";
  const glyph = skill.iconGlyph ?? skill.name.slice(0, 2).toUpperCase();

  return (
    <div className="chip">
      <span className="chip-icon" data-tier={tier}>
        {glyph}
      </span>
      <span>{skill.name}</span>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
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

      const tiles = gsap.utils.toArray<HTMLElement>(".bento");
      gsap.set(tiles, { y: 30, opacity: 0 });
      tiles.forEach((tile, i) => {
        gsap.to(tile, {
          scrollTrigger: {
            trigger: tile,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.08,
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
          <div>
            <span className="section-index">02 / Skills</span>
            <h2 className="section-title">Stack</h2>
          </div>
          <p className="section-subtitle">Tools I trust. Stack I think in.</p>
        </div>

        <div className="bento-grid">
          {/* Focus tile */}
          <div className="bento bento-focus">
            <p className="bento-label">
              <span className="bento-label-num">01</span> Primary Focus
            </p>
            <p className="bento-focus-title">
              Building <em>AI-augmented</em> products end-to-end.
            </p>
            <p className="bento-focus-sub">
              AI-assisted workflows on top of a solid full-stack foundation.
            </p>
            <div className="focus-bars">
              {focusSkills.map((fs) => (
                <div key={fs.name} className="focus-bar">
                  <span className="focus-bar-name">{fs.name}</span>
                  <div className="focus-bar-track">
                    <div
                      className="focus-bar-fill"
                      style={{ width: `${fs.pct}%` }}
                    />
                  </div>
                  <span className="focus-bar-pct">{fs.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack tiles */}
          {skillCategories.map((group, idx) => {
            const tileClass = CATEGORY_CLASS[group.category] ?? "bento-front";
            return (
              <div key={group.category} className={`bento ${tileClass}`}>
                <p className="bento-label">
                  <span className="bento-label-num">
                    {String(idx + 2).padStart(2, "0")}
                  </span>{" "}
                  {group.category}
                </p>
                <div className="bento-chips">
                  {group.skills.map((skill) => (
                    <Chip key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
