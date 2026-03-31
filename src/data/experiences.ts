export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
  techStack: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    duration: "2023 - Present",
    description:
      "Leading development of enterprise-scale web applications serving 1M+ users. Architected microservices infrastructure and mentored junior developers.",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "StartupXYZ",
    duration: "2021 - 2023",
    description:
      "Built core product features from scratch, implemented CI/CD pipelines, and optimized application performance resulting in 40% faster load times.",
    techStack: ["React", "Next.js", "GraphQL", "MongoDB", "Redis"],
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency Inc",
    duration: "2019 - 2021",
    description:
      "Developed responsive web applications for various clients, collaborated with design teams, and maintained high code quality standards.",
    techStack: ["React", "Vue.js", "Sass", "Webpack", "Firebase"],
  },
  {
    title: "Junior Developer",
    company: "CodeLab Studios",
    duration: "2018 - 2019",
    description:
      "Started career building UI components, fixing bugs, and learning modern web development practices in an agile environment.",
    techStack: ["JavaScript", "HTML", "CSS", "jQuery", "Bootstrap"],
  },
];
