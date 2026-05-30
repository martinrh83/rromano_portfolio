import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { LuDownload } from "react-icons/lu";

import { identity } from "#/data/identity";

import { SplitButton } from "./SplitButton";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Set card perspective before timeline so it composites correctly from frame 1
        gsap.set(cardRef.current, { transformPerspective: 800 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // 1. Title — line-by-line upward reveal through overflow:hidden masks.
        // Initial y:110% is set via CSS so elements are hidden before JS runs.
        tl.to([line1Ref.current, line2Ref.current], {
          y: "0%",
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
        });

        // 2. Subtitle — character scramble / decode
        // Hard-coded to avoid reading corrupted DOM state from React Strict Mode's
        // double-invocation cleanup, which leaves textContent mid-scrambled.
        const finalText = "Software Engineer";
        if (subtitleRef.current) {
          subtitleRef.current.textContent = finalText
            .split("")
            .map((c) =>
              c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)],
            )
            .join("");
        }
        const obj = { p: 0 };
        const sub = subtitleRef.current;
        tl.to(
          obj,
          {
            p: 1,
            duration: 0.85,
            ease: "power2.out",
            onUpdate() {
              if (!sub) return;
              const n = Math.floor(obj.p * finalText.length);
              sub.textContent =
                finalText.slice(0, n) +
                finalText
                  .slice(n)
                  .split("")
                  .map((c) =>
                    c === " "
                      ? " "
                      : CHARS[Math.floor(Math.random() * CHARS.length)],
                  )
                  .join("");
            },
            onComplete() {
              if (sub) sub.textContent = finalText;
            },
          },
          "-=0.6",
        );

        // 3. Description — blur-to-clear fade
        tl.fromTo(
          descriptionRef.current,
          { autoAlpha: 0, filter: "blur(6px)" },
          { autoAlpha: 1, filter: "blur(0px)", duration: 0.7 },
          "-=0.5",
        );

        // 4. CTA
        if (ctaRef.current) {
          tl.fromTo(
            ctaRef.current.children,
            { y: 15, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08 },
            "-=0.4",
          );
        }

        // 5. Card — 3D perspective unflip entrance
        // opacity starts at 0.001 (not 0) so the browser composites the element
        // from frame 1, keeping backdrop-filter active throughout.
        tl.fromTo(
          cardRef.current,
          { rotateY: 12, x: 40, opacity: 0.001 },
          { rotateY: 0, x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=0.7",
        );

        // 6. Card corners — staggered pop-in
        if (cardRef.current) {
          tl.fromTo(
            cardRef.current.querySelectorAll(".hv-corner"),
            { scale: 0, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.35,
              stagger: 0.07,
              ease: "back.out(1.7)",
            },
            "-=0.2",
          );
        }

        // 7. Card ambient float — starts after entrance completes
        tl.eventCallback("onComplete", () => {
          gsap.to(cardRef.current, {
            y: -7,
            duration: 3.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        // 8. Card mousemove tilt
        const hero = heroRef.current!;
        const card = cardRef.current!;

        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const rx =
            ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -5;
          const ry =
            ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 5;
          gsap.to(card, {
            rotateX: rx,
            rotateY: ry,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        hero.addEventListener("mousemove", onMove);
        hero.addEventListener("mouseleave", onLeave);

        return () => {
          hero.removeEventListener("mousemove", onMove);
          hero.removeEventListener("mouseleave", onLeave);
        };
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
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            Portfolio · 2026
          </p>

          {/* Main Title — each line masked for upward reveal */}
          <h1 ref={titleRef} className="hero-title">
            <span className="title-line-mask">
              <span ref={line1Ref}>Martin</span>
            </span>
            <span className="title-line-mask">
              <em ref={line2Ref} className="hero-title-accent">
                Romano.
              </em>
            </span>
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
            <span className="hv-corner tl" aria-hidden="true" />
            <span className="hv-corner tr" aria-hidden="true" />
            <span className="hv-corner bl" aria-hidden="true" />
            <span className="hv-corner br" aria-hidden="true" />

            <div className="hv-orb" aria-hidden="true" />

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

            <div className="hv-ticker" aria-hidden="true">
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
