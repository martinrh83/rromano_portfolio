import type { Experience } from "../data/experiences";

interface TimelineCardProps {
  experience: Experience;
  index: number;
}

export function TimelineCard({ experience, index }: TimelineCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`timeline-item ${isEven ? "timeline-item-left" : "timeline-item-right"}`}
    >
      {/* Timeline Node */}
      <div className="timeline-node">
        <div className="timeline-node-inner" />
      </div>

      {/* Timeline Card */}
      <div className="timeline-card">
        {/* Header */}
        <div className="timeline-card-header">
          <h3 className="timeline-card-title">{experience.title}</h3>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(experience.company)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="timeline-card-company"
          >
            {experience.company}
          </a>
          <p className="timeline-card-duration">{experience.duration}</p>
        </div>

        {/* Description */}
        <p className="timeline-card-description">{experience.description}</p>

        {/* Tech Stack */}
        <div className="timeline-card-tech">
          {experience.techStack.map((tech) => (
            <span key={tech} className="tech-keyword">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
