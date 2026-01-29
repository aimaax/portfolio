/** src/App.tsx */
import "./App.css";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { PortfolioCard } from "./components/PortfolioCard";
import { PortfolioGallery } from "./components/PortfolioGallery";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectDetail } from "./components/ProjectDetail";
import { portfolioLocations } from "./data/photoPortfolio";
import { projects } from "./data/project";

/**
 * Main application component.
 */
const App = (): ReactElement => {
  const [activeSection, setActiveSection] = useState<
    "about" | "projects" | "portfolio" | "cv"
  >("about");
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const aboutIntro = "Welcome and I am happy that you found my page! I am ";
  const aboutName = "Max Andersson";
  const aboutRole = "Software and Machine Learning Engineer";
  const aboutBody = [
    "I am a software and machine learning engineer with a passion for building scalable and efficient systems.",
    "I am currently working as a software engineer at",
  ].join(" ");

  const [aboutShouldFade, setAboutShouldFade] = useState<boolean>(true);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const section =
      hash === "about" || hash === "projects" || hash === "portfolio" || hash === "cv"
        ? hash
        : "about";

    setActiveSection(section);
    if (section !== "about") setAboutShouldFade(false);
    if (section === "portfolio") setSelectedLocationId(null);
    if (section === "projects") setSelectedProjectId(null);

    const handleHashChange = (): void => {
      const newHash = window.location.hash.slice(1);
      const newSection =
        newHash === "about" ||
          newHash === "projects" ||
          newHash === "portfolio" ||
          newHash === "cv"
          ? newHash
          : "about";

      setActiveSection(newSection);
      if (newSection !== "about") setAboutShouldFade(false);
      if (newSection === "portfolio") setSelectedLocationId(null);
      if (newSection === "projects") setSelectedProjectId(null);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigate = (
    section: "about" | "projects" | "portfolio" | "cv"
  ): void => {
    setActiveSection(section);
    window.location.hash = section;
    if (section !== "about") setAboutShouldFade(false);
    if (section === "portfolio") setSelectedLocationId(null);
    if (section === "projects") setSelectedProjectId(null);
  };

  const selectedLocation = selectedLocationId
    ? portfolioLocations.find((loc) => loc.id === selectedLocationId)
    : null;
  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : null;

  return (
    <div className="page">
      <NavBar onNavigate={handleNavigate} activeSection={activeSection} />

      <main className="content">
        {activeSection === "about" && (
          <section id="about" className="section">
            <p className="about">
              <span className={`about-text${aboutShouldFade ? " about-fade about-fade--1" : ""}`}>{aboutIntro}</span>
              <span className={`about-name${aboutShouldFade ? " about-fade about-fade--2" : ""}`}>{aboutName}</span>
              <span className={`about-title${aboutShouldFade ? " about-fade about-fade--2" : ""}`}>{aboutRole}</span>
              <span className={`about-text${aboutShouldFade ? " about-fade about-fade--3" : ""}`}>{aboutBody}</span>
            </p>
          </section>
        )}

        {activeSection === "projects" && (
          <section id="projects" className="section project-section">
            {selectedProject ? (
              <ProjectDetail
                project={selectedProject}
                onBack={() => setSelectedProjectId(null)}
              />
            ) : (
              <div className="project-grid">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={setSelectedProjectId}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {activeSection === "portfolio" && (
          <section id="portfolio" className="section portfolio-section">
            {selectedLocation ? (
              <PortfolioGallery
                item={selectedLocation}
                onBack={() => setSelectedLocationId(null)}
              />
            ) : (
              <div className="portfolio-grid">
                {portfolioLocations.map((item) => (
                  <PortfolioCard
                    key={item.id}
                    item={item}
                    onSelect={setSelectedLocationId}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {activeSection === "cv" && (
          <section id="cv" className="section cv-section">
            <div className="cv__container">
              <iframe
                className="cv__pdf"
                src="CV_Max_Andersson_.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                title="CV PDF"
              />
            </div>
            <div className="cv__download-container">
              <a
                className="cv__download-btn"
                href="CV_Max_Andersson_.pdf"
                download
              >
                Download CV
              </a>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;