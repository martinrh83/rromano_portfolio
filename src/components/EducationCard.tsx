import type { Education } from "../data/education";

interface EducationCardProps {
  education: Education;
}

export function EducationCard({ education }: EducationCardProps) {
  const mono =
    education.mono ??
    education.institution
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);

  return (
    <div className="education-card">
      <div className="edu-mono">{mono}</div>
      <div>
        <div className="edu-degree">{education.degree}</div>
        <div className="edu-school">
          {education.institution}{" "}
          <span className="flag">· {education.countryCode}</span>
        </div>
      </div>
      <div className="edu-period">{education.period}</div>
    </div>
  );
}
