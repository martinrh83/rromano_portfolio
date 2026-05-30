import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { focusSkills, type Skill, skillCategories } from "#/data/skills";

const CATEGORY_CLASS: Record<string, string> = {
  Frontend: "bento-front",
  Backend: "bento-back",
  "Tooling & DevOps": "bento-tools",
  AI: "bento-ai",
  Exploring: "bento-extras",
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
      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          // Section header
          gsap.from(".section-index, .section-title, .section-subtitle", {
            scrollTrigger: {
              trigger: ".skills-header",
              start: "top 85%",
              once: true,
            },
            y: 20,
            autoAlpha: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.09,
          });

          // Read focus bar target widths before GSAP touches them so we can
          // restore them after Strict Mode cleanup reverts state.
          const fills = Array.from(
            sectionRef.current!.querySelectorAll<HTMLElement>(
              ".focus-bar-fill",
            ),
          );
          const targetWidths = fills.map((el) => el.style.width);

          // Pre-hide tiles, chips, and bar fills
          gsap.set(".bento", { autoAlpha: 0, y: 20, scale: 0.97 });
          gsap.set(".chip", { autoAlpha: 0, y: 8 });
          gsap.set(fills, { width: "0%" });

          ScrollTrigger.batch(".bento", {
            onEnter: (elements) => {
              // All tiles in the batch scale + fade in with a stagger
              gsap.to(elements, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                stagger: { each: 0.08, from: "start" },
                duration: 0.65,
                ease: "power3.out",
              });

              elements.forEach((el, batchIdx) => {
                const tileDelay = 0.08 * batchIdx;

                // Skill-category tiles: chips stagger in after their tile appears
                const chips = el.querySelectorAll<HTMLElement>(".chip");
                if (chips.length) {
                  gsap.to(chips, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.35,
                    stagger: 0.04,
                    ease: "power2.out",
                    delay: 0.35 + tileDelay,
                  });
                }

                // Focus tile: bars grow from 0 to their data value
                if (el.classList.contains("bento-focus") && fills.length) {
                  fills.forEach((fill, fillIdx) => {
                    gsap.to(fill, {
                      width: targetWidths[fillIdx],
                      duration: 1.1,
                      ease: "power3.out",
                      delay: 0.5 + fillIdx * 0.12 + tileDelay,
                    });
                  });
                }
              });
            },
            start: "top 88%",
            once: true,
          });
        },
        sectionRef.current!,
      );
      return () => mm.revert();
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
