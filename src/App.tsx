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

  const aboutIntro = "Warm welcome!\nI am glad you found my page, I am ";
  const aboutName = "Max Andersson";
  const aboutRole = "Software and Machine Learning Engineer";
  const aboutBody = [
    `
    Building innovative, efficient, high-performance software solutions!

    Currently developing DAQ systems and end-to-end analysis pipelines at CERN, focusing on scalability, optimisation and automation. Always happy to connect!   
    `].join(" ");
    

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const section =
      hash === "about" || hash === "projects" || hash === "portfolio" || hash === "cv"
        ? hash
        : "about";

    setActiveSection(section);
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
          <section id="about" className="section section--centered">
            <p className="about">
              <span className="about-text about-fade about-fade--1">{aboutIntro}</span>
              <span className="about-name about-fade about-fade--2">{aboutName}</span>
              <span className="about-title about-fade about-fade--2">{aboutRole}</span>
              <span className="about-text about-fade about-fade--3">{aboutBody}</span>
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
          </section>
        )}
      </main>
    </div>
  );
};

export default App;