import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import { useTheme } from "../context/ThemeContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left: Copyright */}
        <div className="footer-section footer-copyright">
          <p>© {currentYear} Martin Romano. All rights reserved.</p>
        </div>

        {/* Center: Theme toggle */}
        <div className="footer-center">
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
            className="footer-back-to-top-button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            Back to Top
            <span className="footer-back-to-top-arrow">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
