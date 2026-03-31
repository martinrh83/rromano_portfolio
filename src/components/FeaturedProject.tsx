import type { Project } from "../data/projects";

interface FeaturedProjectProps {
  project: Project;
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <div className="featured-project">
      {/* Project Image */}
      <div className="featured-project-image-container">
        <img
          src={project.image}
          alt={project.title}
          className="featured-project-image"
          loading="eager"
        />
        <div className="featured-project-overlay" />
      </div>

      {/* Project Content */}
      <div className="featured-project-content">
        <div className="featured-project-badge">Featured Project</div>

        <h3 className="featured-project-title">{project.title}</h3>

        <p className="featured-project-description">{project.description}</p>

        {/* Tech Stack */}
        <div className="featured-project-tech">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-keyword">
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="featured-project-links">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-project-link featured-project-link-primary"
            >
              <span>View Live Demo</span>
              <span className="featured-project-arrow">→</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-project-link featured-project-link-secondary"
            >
              <span>View Source</span>
              <span className="featured-project-arrow">→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
