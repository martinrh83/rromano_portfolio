import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { LuDownload } from "react-icons/lu";

import { identity } from "#/data/identity";

import { SplitButton } from "./SplitButton";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          titleRef.current,
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.2, ease: "power4.out" },
        );
        tl.fromTo(
          subtitleRef.current,
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.0 },
          "-=0.9",
        );
        tl.fromTo(
          descriptionRef.current,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          "-=0.7",
        );
        if (ctaRef.current) {
          tl.fromTo(
            ctaRef.current.children,
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 },
            "-=0.5",
          );
        }
        // opacity starts at 0.001 (not 0) so the browser composites the element
        // from frame 1, keeping backdrop-filter active throughout.
        tl.fromTo(
          cardRef.current,
          { x: 30, opacity: 0.001 },
          { x: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
          "-=0.7",
        );
      });
      return () => mm.revert();
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left column */}
        <div className="text-center lg:text-left">
          {/* Eyebrow */}
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Portfolio · 2026
          </p>

          {/* Main Title */}
          <h1 ref={titleRef} className="hero-title">
            Martin
            <br />
            <em className="hero-title-accent">Romano.</em>
          </h1>

          {/* Subline */}
          <p ref={subtitleRef} className="hero-subline">
            Software Engineer
          </p>

          {/* Description */}
          <p ref={descriptionRef} className="hero-description">
            I build scalable web applications with{" "}
            <span className="tech-keyword">React</span>,{" "}
            <span className="tech-keyword">TypeScript</span>, and modern tooling
            — quietly obsessed with clean code, sharp UX, and shipping products
            that hold up at scale.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="hero-cta-container">
            <SplitButton
              href="/resume.pdf"
              download="Martin_Romano_Resume"
              label="Download resume"
              icon={<LuDownload />}
            />
          </div>
        </div>

        {/* Right column — identity card */}
        <div
          ref={cardRef}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="hv-card">
            <span className="hv-corner tl" />
            <span className="hv-corner tr" />
            <span className="hv-corner bl" />
            <span className="hv-corner br" />

            <div className="hv-orb" />

            <div className="hv-head">
              <span className="hv-head-label">{"// IDENTITY · v7.0"}</span>
              <span className="hv-head-id">#0001</span>
            </div>

            <div className="hv-monogram">
              <span className="hv-monogram-initials">{identity.initials}</span>
            </div>

            <dl className="hv-meta">
              <div className="hv-meta-row">
                <dt className="hv-meta-dt">Base</dt>
                <dd className="hv-meta-dd">{identity.base}</dd>
              </div>
              <div className="hv-meta-row">
                <dt className="hv-meta-dt">Since</dt>
                <dd className="hv-meta-dd">{identity.since}</dd>
              </div>
              <div className="hv-meta-row">
                <dt className="hv-meta-dt">Languages</dt>
                <dd className="hv-meta-dd">{identity.languages}</dd>
              </div>
            </dl>

            <div className="hv-ticker">
              <div className="hv-ticker-inner">
                {[...identity.tickerItems, ...identity.tickerItems].map(
                  (item, i) => (
                    <span key={i}>
                      {item}
                      <span className="hv-ticker-sep">·</span>
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
