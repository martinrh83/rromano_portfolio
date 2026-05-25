import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="proj-media">
        <img
          src={project.image}
          alt={project.title}
          className="proj-media-img"
          loading="lazy"
        />
        <div className="proj-overlay">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              ↗ Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {"{ }"} Code
            </a>
          )}
        </div>
      </div>
      <div className="proj-body">
        <h3 className="proj-title">
          <span className="proj-num">0{index + 2}.</span>
          {project.title}
        </h3>
        <p className="proj-desc">{project.description}</p>
        <div className="proj-stack">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-keyword">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="tech-keyword">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
