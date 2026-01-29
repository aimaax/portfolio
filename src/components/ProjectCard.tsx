import type { ReactElement } from "react";
import type { Project } from "../types/project";

type ProjectCardProps = {
  project: Project;
  onSelect: (id: string) => void;
};

export const ProjectCard = ({ project, onSelect }: ProjectCardProps): ReactElement => (
  <button
    type="button"
    className="project-card"
    onClick={() => onSelect(project.id)}
    aria-label={`View project: ${project.title}`}
  >
    <h3 className="project-card__title">
      <span className="project-title__main">{project.title}</span>
      <br />
      {project.subtitle}
    </h3>
    <p className="project-card__abstract">{project.abstract}</p>
  </button>
);