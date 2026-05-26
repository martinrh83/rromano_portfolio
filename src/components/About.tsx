import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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

          gsap.from(leftRef.current, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
            x: -30,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
          });

          gsap.from(rightRef.current, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
            x: 30,
            autoAlpha: 0,
            duration: 0.9,
            delay: 0.15,
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
    <section ref={sectionRef} id="about" className="about-section">
      <div className="about-container">
        <div className="section-header">
          <div>
            <span className="section-index">01 / About</span>
            <h2 className="section-title">Who&apos;s behind this</h2>
          </div>
          <p className="section-subtitle">The short version.</p>
        </div>

        <div className="about-layout">
          {/* Left: bio paragraphs */}
          <div ref={leftRef} className="about-bio">
            <p>
              I&apos;m a full-stack developer based in Buenos Aires with seven
              years building products people actually use. I split my time
              between <strong>React / TypeScript front-ends</strong> and{" "}
              <strong>Node + Postgres back-ends</strong>, with detours into
              infra when something needs to scale.
            </p>
            <p>
              What I care about: clear boundaries, honest deadlines, code that
              reads like prose, and interfaces that respect the user&apos;s
              attention. I prefer small teams, tight feedback loops, and
              shipping behind a feature flag over big-bang rewrites.
            </p>
            <p>
              Outside of work — mate, mountain biking, and an unhealthy interest
              in keyboard layouts.
            </p>
          </div>

          {/* Right: vitals spec-sheet */}
          <div ref={rightRef} className="about-sidecard">
            <div className="about-availability">
              <span className="availability-dot" />
              <span>Available for work</span>
            </div>

            <p className="about-sidecard-label">{"// Vitals"}</p>

            <ul className="about-vitals">
              <li>
                <span className="about-vitals-key">Location</span>
                <span className="about-vitals-val">Buenos Aires, AR</span>
              </li>
              <li>
                <span className="about-vitals-key">Time Zone</span>
                <span className="about-vitals-val">GMT−3</span>
              </li>
              <li>
                <span className="about-vitals-key">Languages</span>
                <span className="about-vitals-val">ES · EN (C1)</span>
              </li>
              <li>
                <span className="about-vitals-key">Status</span>
                <span className="about-vitals-val about-vitals-available">
                  Open to opportunities
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
