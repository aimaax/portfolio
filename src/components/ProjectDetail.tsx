import type { ReactElement } from "react";
import type { Project } from "../types/project";
import { PdfBookViewer } from "./PdfBookViewer";
import { LatexText } from "./LatexText";

type ProjectDetailProps = {
  project: Project;
  onBack: () => void;
};

export const ProjectDetail = ({ project, onBack }: ProjectDetailProps): ReactElement => (
  <div className="project-detail">
    <div className="project-detail__header">
      <button type="button" className="project-detail__back" onClick={onBack}>
        ← Back to projects
      </button>

      <h2 className="project-detail__title">
        {project.publicationUrl ? (
          <a
            href={project.publicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-detail__title-link"
          >
            <span className="project-title__main">{project.title.trim()}</span>
          </a>
        ) : (
          <span className="project-title__main">{project.title.trim()}</span>
        )}
      </h2>

      <a
        className="project-detail__download"
        href={project.pdfPath}
        download
      >
        Download Project
      </a>
    </div>
    <div className="project-detail__abstract">
      <LatexText>{project.abstract}</LatexText>
    </div>
    <div className="project-detail__book">
      <PdfBookViewer pdfPath={project.pdfPath} />
    </div>
  </div>
);