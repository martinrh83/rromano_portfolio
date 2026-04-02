import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { useTerminal } from "../hooks/useTerminal";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { lines, input, setInput, handleSubmit } = useTerminal();

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  useGSAP(
    () => {
      gsap.from(terminalRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <div className="contact-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Type commands to explore contact methods or just say hello
          </p>
        </div>

        {/* Terminal */}
        <div ref={terminalRef} className="terminal">
          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-button terminal-button-close" />
              <span className="terminal-button terminal-button-minimize" />
              <span className="terminal-button terminal-button-maximize" />
            </div>
            <div className="terminal-title">contact@terminal ~ zsh</div>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body">
            {/* Output */}
            <div ref={outputRef} className="terminal-output">
              {lines.map((line, index) => (
                <div
                  key={index}
                  className={`terminal-line terminal-line-${line.type}`}
                >
                  {line.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="terminal-input-form">
              <label className="terminal-prompt" htmlFor="terminal">
                $
              </label>
              <input
                name="terminal"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="terminal-input"
                placeholder="Start"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        </div>

        {/* Quick Actions (Alternative for non-terminal users) */}
        <div className="contact-quick-actions">
          <p className="contact-quick-actions-text">Or reach out directly:</p>
          <div className="contact-quick-actions-buttons">
            <a
              href="mailto:your.email@example.com"
              className="contact-quick-action"
            >
              📧 Email
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-quick-action"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-quick-action"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
