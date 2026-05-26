import emailjs from "@emailjs/browser";
import { useGSAP } from "@gsap/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLinkedinIn } from "react-icons/fa";
import { LuArrowUpRight } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { SiGithub } from "react-icons/si";
import { z } from "zod";

import { SplitButton } from "./SplitButton";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

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

          // Form panel settles from above — more natural than a lateral slide
          gsap.from(rightRef.current, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
            y: 30,
            scale: 0.98,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
          });
        },
        sectionRef.current!,
      );
      return () => mm.revert();
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
          subject: data.subject,
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
          <div>
            <span className="section-index">06 / Contact</span>
            <h2 className="section-title">Get In Touch</h2>
          </div>
          <p className="section-subtitle">
            Let&apos;s build something that matters.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left: availability + pitch + contact links */}
          <div ref={leftRef} className="contact-left">
            <div className="contact-availability">
              <span className="availability-dot" />
              <span>Open to opportunities</span>
            </div>
            <h3 className="contact-heading">
              Have an idea?
              <br />
              Let&apos;s <em>talk.</em>
            </h3>
            <p className="contact-description">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </p>
            <div className="contact-links">
              <a href="mailto:martinrh83@gmail.com" className="contact-link">
                <span className="contact-link-icon-box">
                  <MdEmail />
                </span>
                <span className="contact-link-content">
                  <span className="contact-link-label">Email</span>
                  <span className="contact-link-val">martinrh83@gmail.com</span>
                </span>
                <LuArrowUpRight className="contact-link-arrow" />
              </a>
              <a
                href="https://linkedin.com/in/martin-romano-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon-box">
                  <FaLinkedinIn />
                </span>
                <span className="contact-link-content">
                  <span className="contact-link-label">LinkedIn</span>
                  <span className="contact-link-val">
                    linkedin.com/in/martin-romano-dev
                  </span>
                </span>
                <LuArrowUpRight className="contact-link-arrow" />
              </a>
              <a
                href="https://github.com/martinrh83"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon-box">
                  <SiGithub />
                </span>
                <span className="contact-link-content">
                  <span className="contact-link-label">GitHub</span>
                  <span className="contact-link-val">
                    github.com/martinrh83
                  </span>
                </span>
                <LuArrowUpRight className="contact-link-arrow" />
              </a>
            </div>
          </div>

          {/* Right: form card */}
          <div ref={rightRef} className="contact-right">
            {/* Panel header */}
            <div className="contact-panel-head">
              <div className="contact-panel-head-left">
                <span className="contact-panel-icon">✉</span>
                <span className="contact-panel-label">Send a message</span>
              </div>
              <span className="contact-panel-meta">~24h response</span>
            </div>

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
                {/* Name + Email row */}
                <div className="form-row">
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
                      <span className="contact-error">
                        {errors.name.message}
                      </span>
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
                </div>

                {/* Subject */}
                <div className="contact-field">
                  <label className="contact-label" htmlFor="cf-subject">
                    Subject
                  </label>
                  <input
                    id="cf-subject"
                    type="text"
                    className={`contact-input${errors.subject ? " contact-input-error" : ""}`}
                    placeholder="What's this about?"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <span className="contact-error">
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                {/* Message */}
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

                <div className="contact-submit-row">
                  <SplitButton
                    type="submit"
                    label="Send message"
                    loading={status === "submitting"}
                    loadingLabel="Sending..."
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
