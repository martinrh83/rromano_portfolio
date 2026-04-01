export interface Skill {
  name: string;
  icon: string;
  color: string;
  lightColor?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: "SiReact", color: "#61DAFB" },
      {
        name: "Next.js",
        icon: "SiNextdotjs",
        color: "#ffffff",
        lightColor: "#000000",
      },
      { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
      {
        name: "JavaScript",
        icon: "SiJavascript",
        color: "#F7DF1E",
        lightColor: "#B8A000",
      },
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#38BDF8" },
      { name: "Angular", icon: "SiAngular", color: "#DD0031" },
      { name: "Ionic", icon: "SiIonic", color: "#3880FF" },
      { name: "Redux", icon: "SiRedux", color: "#764ABC" },
      { name: "GSAP", icon: "SiGsap", color: "#88CE02" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: "SiNodedotjs", color: "#5FA04E" },
      {
        name: "Express",
        icon: "SiExpress",
        color: "#ffffff",
        lightColor: "#000000",
      },
      { name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1" },
      { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
      { name: "Prisma", icon: "SiPrisma", color: "#5A67D8" },
      {
        name: "Drizzle",
        icon: "SiDrizzle",
        color: "#C5F74F",
        lightColor: "#5A7A00",
      },
      { name: "Supabase", icon: "SiSupabase", color: "#3ECF8E" },
    ],
  },
  {
    category: "Tooling & DevOps",
    skills: [
      { name: "Git", icon: "SiGit", color: "#F05032" },
      { name: "Docker", icon: "SiDocker", color: "#2496ED" },
      {
        name: "Vercel",
        icon: "SiVercel",
        color: "#ffffff",
        lightColor: "#000000",
      },
      { name: "GitHub Actions", icon: "SiGithubactions", color: "#2088FF" },
    ],
  },
];
