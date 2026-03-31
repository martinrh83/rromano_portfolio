import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import { useTheme } from "../context/ThemeContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme, toggleTheme } = useTheme();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: <FiGithub className="social-icon" />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: <FiLinkedin className="social-icon" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: <FiTwitter className="social-icon" />,
    },
    {
      name: "Email",
      url: "mailto:your.email@example.com",
      icon: <FiMail className="social-icon" />,
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left: Copyright */}
        <div className="footer-section footer-copyright">
          <p>© {currentYear} Martin Romano. All rights reserved.</p>
        </div>

        {/* Center: Social Links + Theme Toggle stacked */}
        <div className="footer-center">
          <div className="footer-section footer-social">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.url.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="footer-social-link"
                aria-label={link.name}
                title={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Theme Toggle — pill with icon + label */}
          <button
            onClick={toggleTheme}
            className="footer-toggle-btn"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <HiOutlineSun className="footer-toggle-icon" />
            ) : (
              <HiOutlineMoon className="footer-toggle-icon" />
            )}
            <span className="footer-toggle-label">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>

        {/* Right: Back to Top */}
        <div className="footer-section footer-back-to-top">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="footer-back-to-top-button"
          >
            <span>Back to Top</span>
            <span className="footer-back-to-top-arrow">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
