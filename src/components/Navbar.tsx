import { useEffect, useState } from "react";

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

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false); // Close mobile menu after click
    }
  };

  const navLinks = [
    { label: "Work", id: "work" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="navbar-container">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("hero")}
          className="navbar-logo"
          aria-label="Scroll to top"
        >
          <span className="navbar-logo-text">MR</span>
        </button>

        {/* Desktop Navigation Links */}
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
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <ul className="navbar-links-mobile">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className="navbar-link-mobile"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
