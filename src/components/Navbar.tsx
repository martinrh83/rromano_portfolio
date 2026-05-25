import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll to add/remove scrolled state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "About", id: "about", index: "01" },
    { label: "Skills", id: "skills", index: "02" },
    { label: "Work", id: "work", index: "03" },
    { label: "Education", id: "education", index: "04" },
    { label: "Projects", id: "projects", index: "05" },
    { label: "Contact", id: "contact", index: "06" },
  ];

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const detect = () => {
      const offset = window.scrollY + window.innerHeight * 0.35;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el && el.offsetTop <= offset) {
          setActiveSection(navLinks[i].id);
          return;
        }
      }
    };
    detect();
    window.addEventListener("scroll", detect, { passive: true });
    return () => window.removeEventListener("scroll", detect);
  }, []);

  // Mobile menu rendered via portal — completely outside <nav> stacking context
  const mobileMenu = createPortal(
    <div className={`navbar-mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
      {/* Close button */}
      <button
        className="navbar-mobile-close"
        onClick={() => setMobileMenuOpen(false)}
        aria-label="Close menu"
      >
        <HiXMark size={24} />
      </button>

      <ul className="navbar-links-mobile">
        {navLinks.map((link) => (
          <li key={link.id}>
            <button
              onClick={() => scrollToSection(link.id)}
              className={`navbar-link-mobile${activeSection === link.id ? " active" : ""}`}
            >
              <span className="navbar-link-index">{link.index}</span>
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </div>,
    document.body,
  );

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
        <div className="navbar-container">
          {/* Desktop Navigation Links — centered */}
          <ul className="navbar-links-desktop">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`navbar-link${activeSection === link.id ? " active" : ""}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            className="navbar-hamburger"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile menu portalled to <body> — independent stacking context */}
      {mobileMenu}
    </>
  );
}
