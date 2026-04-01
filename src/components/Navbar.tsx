import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { label: "Skills", id: "skills", index: "01" },
    { label: "Work", id: "work", index: "02" },
    { label: "Education", id: "education", index: "03" },
    { label: "Projects", id: "projects", index: "04" },
    { label: "Contact", id: "contact", index: "05" },
  ];

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
              className="navbar-link-mobile"
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
                  className="navbar-link"
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
