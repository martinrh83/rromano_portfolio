import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      {/* Project Image */}
      <div className="project-card-image-container">
        <img
          src={project.image}
          alt={project.title}
          className="project-card-image"
          loading="lazy"
        />
        <div className="project-card-overlay" />
      </div>

      {/* Project Content */}
      <div className="project-card-content">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-description">{project.description}</p>

        {/* Tech Stack */}
        <div className="project-card-tech">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="tech-keyword">
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="tech-keyword">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="project-card-links">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
            >
              Live Demo →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
