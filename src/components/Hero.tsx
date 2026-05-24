import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { LuDownload } from "react-icons/lu";

import { SplitButton } from "./SplitButton";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Create animation timeline with medium intensity (smooth & tasteful)
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Animate title - bold entrance
      tl.fromTo(
        titleRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
        },
      );

      // Animate subtitle - follows naturally
      tl.fromTo(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
        },
        "-=0.9", // Overlap with previous animation
      );

      // Animate description - smooth fade in
      tl.fromTo(
        descriptionRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        "-=0.7",
      );

      // Animate CTA buttons - staggered for polish
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1, // Medium intensity: 100ms between each button
          },
          "-=0.5",
        );
      }
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
          {/* Main Title */}
          <h1 ref={titleRef} className="hero-title opacity-0">
            Martin Romano
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="hero-subtitle opacity-0">
            Full Stack Developer
          </p>

          {/* Description */}
          <p ref={descriptionRef} className="hero-description opacity-0">
            Building scalable web applications with{" "}
            <span className="tech-keyword">React</span>,{" "}
            <span className="tech-keyword">TypeScript</span>, and modern
            technologies. Passionate about clean code and exceptional user
            experiences.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="hero-cta-container">
            {/* Primary CTA */}
            <a href="#projects" className="hero-cta-primary">
              <span className="relative z-10">View My Work</span>
            </a>

            {/* Secondary CTA */}
            <a href="#contact" className="hero-cta-secondary">
              <span className="relative z-10">Lets Connect</span>
            </a>

            {/* Tertiary CTA */}
            <SplitButton
              href="/resume.pdf"
              download="Martin_Romano_Resume"
              label="Resume"
              icon={<LuDownload />}
            />
          </div>
        </div>

        {/* Right column — visual element goes here */}
        <div className="hidden lg:flex items-center justify-center" />
      </div>
    </section>
  );
}
