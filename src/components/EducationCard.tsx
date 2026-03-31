import type { Education } from "../data/education";

interface EducationCardProps {
  education: Education;
}

export function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="education-card">
      {/* Corner brackets via CSS pseudo-elements — rendered by ::before and ::after */}
      <div className="education-card-inner">
        {/* Top row: monogram + period */}
        <div className="education-card-top">
          <span className="education-monogram">
            {education.institution
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 3)}
          </span>
          <span className="education-card-period">{education.period}</span>
        </div>

        {/* Divider */}
        <div className="education-card-divider" />

        {/* Degree title */}
        <h3 className="education-card-degree">{education.degree}</h3>

        {/* Institution + country */}
        <div className="education-card-meta">
          <span className="education-card-institution">
            {education.institution}
          </span>
          <div className="education-card-meta-right">
            <span className="education-country-badge">
              [{education.countryCode}]
            </span>
            <span className="education-card-country">{education.country}</span>
          </div>
        </div>

        {/* Optional highlights */}
        {education.highlights && education.highlights.length > 0 && (
          <ul className="education-card-highlights">
            {education.highlights.map((h, i) => (
              <li key={i} className="education-card-highlight-item">
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Optional description */}
        {education.description && (
          <p className="education-card-description">{education.description}</p>
        )}
      </div>
    </div>
  );
}
