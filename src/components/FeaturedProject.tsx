import type { Project } from "../data/projects";

interface FeaturedProjectProps {
  project: Project;
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <div className="featured-project">
      <div className="fp-content">
        <div className="fp-tag">Featured project</div>
        <h3 className="fp-title">{project.title}</h3>
        <p className="fp-desc">{project.description}</p>
        <div className="fp-stack">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-keyword">
              {tech}
            </span>
          ))}
        </div>
        <div className="fp-actions">
          {project.liveUrl && (
            <a
              className="fp-btn fp-btn-primary"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live site →
            </a>
          )}
          {project.githubUrl && (
            <a
              className="fp-btn fp-btn-ghost"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          )}
        </div>
      </div>
      <div className="fp-media">
        <img
          src={project.image}
          alt={project.title}
          className="fp-media-img"
          loading="eager"
        />
      </div>
    </div>
  );
}
