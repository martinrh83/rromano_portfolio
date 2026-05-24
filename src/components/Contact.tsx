import emailjs from "@emailjs/browser";
import { useGSAP } from "@gsap/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiGithub } from "react-icons/si";
import { z } from "zod";

import { useTerminal } from "../hooks/useTerminal";

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [showTerminal, setShowTerminal] = useState(false);
  const { lines, input, setInput, handleSubmit: handleTerminalSubmit } = useTerminal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  useGSAP(
    () => {
      gsap.from(".section-header", {
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(rightRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    },
    { scope: sectionRef },
  );

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind or just want to say hello?
          </p>
        </div>

        <div className="contact-layout">
          {/* Left: pitch + social links */}
          <div ref={leftRef} className="contact-left">
            <h3 className="contact-heading">Let&apos;s build something.</h3>
            <div className="contact-availability">
              <span className="availability-dot" />
              <span>Open to opportunities</span>
            </div>
            <p className="contact-description">
              I&apos;m a full stack developer based in Buenos Aires. I&apos;m
              always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            <div className="contact-links">
              <a href="mailto:martinrh83@gmail.com" className="contact-link">
                <MdEmail className="contact-link-icon" />
                <span>martinrh83@gmail.com</span>
              </a>
              <a
                href="https://github.com/martinrh83"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <SiGithub className="contact-link-icon" />
                <span>github.com/martinrh83</span>
              </a>
              <a
                href="https://linkedin.com/in/martin-romano-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <FaLinkedinIn className="contact-link-icon" />
                <span>linkedin.com/in/martin-romano-dev</span>
              </a>
            </div>
          </div>

          {/* Right: contact form */}
          <div ref={rightRef} className="contact-right">
            {status === "success" ? (
              <div className="contact-success">
                <div className="contact-success-icon">✓</div>
                <p className="contact-success-title">Message sent!</p>
                <p className="contact-success-text">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  className="contact-send-again"
                  onClick={() => setStatus("idle")}
                >
                  send another message →
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="contact-form"
                noValidate
              >
                <div className="contact-field">
                  <label className="contact-label" htmlFor="cf-name">
                    Name
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    className={`contact-input${errors.name ? " contact-input-error" : ""}`}
                    placeholder="Your name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="contact-error">{errors.name.message}</span>
                  )}
                </div>

                <div className="contact-field">
                  <label className="contact-label" htmlFor="cf-email">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    className={`contact-input${errors.email ? " contact-input-error" : ""}`}
                    placeholder="your@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="contact-error">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="contact-field">
                  <label className="contact-label" htmlFor="cf-message">
                    Message
                  </label>
                  <textarea
                    id="cf-message"
                    rows={5}
                    className={`contact-input contact-textarea${errors.message ? " contact-input-error" : ""}`}
                    placeholder="Tell me about your project..."
                    {...register("message")}
                  />
                  {errors.message && (
                    <span className="contact-error">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {status === "error" && (
                  <p className="contact-error-global">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="contact-submit"
                >
                  {status === "submitting" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send message{" "}
                      <span className="contact-submit-arrow">→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Terminal easter egg */}
        <div className="contact-terminal-toggle">
          <button
            className="terminal-toggle-btn"
            onClick={() => setShowTerminal((v) => !v)}
          >
            {showTerminal ? "hide terminal ↑" : "prefer the terminal? →"}
          </button>
        </div>

        {showTerminal && (
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-button terminal-button-close" />
                <span className="terminal-button terminal-button-minimize" />
                <span className="terminal-button terminal-button-maximize" />
              </div>
              <div className="terminal-title">contact@terminal ~ zsh</div>
            </div>
            <div className="terminal-body">
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
              <form
                onSubmit={handleTerminalSubmit}
                className="terminal-input-form"
              >
                <label className="terminal-prompt" htmlFor="terminal-input">
                  $
                </label>
                <input
                  id="terminal-input"
                  name="terminal"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="terminal-input"
                  placeholder="Type a command..."
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
