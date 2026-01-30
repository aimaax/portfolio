/** src/components/NavBar.tsx */
import type { ReactElement } from "react";

type NavItem = {
  id: "about" | "projects" | "portfolio";
  label: "About Me" | "Publications/Projects" | "Photo Portfolio";
};

type NavBarProps = {
  activeSection: "about" | "projects" | "portfolio" | "cv";
  onNavigate: (section: "about" | "projects" | "portfolio" | "cv") => void;
};

/**
 * Main top navigation for the portfolio site.
 */
export const NavBar = ({ onNavigate, activeSection }: NavBarProps): ReactElement => {
  const items: NavItem[] = [
    { id: "about", label: "About Me" },
    { id: "projects", label: "Publications/Projects" },
    { id: "portfolio", label: "Photo Portfolio" },
  ];

  return (
    <header className="nav">
      {/* Logo on the far left */}
      <img className="nav__logo" src="logos/Logo.jpg" alt="Max Andersson logo" />

      {/* Links centered */}
      <nav className="nav__links">
        {items.map((item) => (
          <a
            key={item.id}
            className={`nav__link${activeSection === item.id ? " nav__link--active" : ""}`}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* CV and LinkedIn Icon */}
      <div className="nav__right">
        {}
        {activeSection === "cv" ? (
          <a
            className="nav__cta nav__cta--active"
            href="CV_Max_Andersson_.pdf"
            download
          >
            Download CV
          </a>
        ) : (
          <a
            className="nav__cta"
            href="#cv"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("cv");
            }}
          >
            Showcase CV
          </a>
        )}

        <a
          className="nav__linkedin"
          href="https://www.linkedin.com/in/maxandersson314/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="nav__linkedin-icon"
            src="logos/LinkedIn_icon.png"
            alt="LinkedIn profile"
          />
        </a>
      </div>
    </header>
  );
};