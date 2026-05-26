export interface Skill {
  name: string;
  icon: string;
  color: string;
  lightColor?: string;
  tier?: "primary" | "secondary";
  iconGlyph?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface FocusSkill {
  name: string;
  pct: number;
}

export const focusSkills: FocusSkill[] = [
  { name: "AI-Driven Development", pct: 88 },
  { name: "Frontend", pct: 85 },
  { name: "Backend", pct: 75 },
  { name: "System Design", pct: 70 },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      {
        name: "React",
        icon: "SiReact",
        color: "#61DAFB",
        tier: "primary",
        iconGlyph: "R",
      },
      {
        name: "Next.js",
        icon: "SiNextdotjs",
        color: "#ffffff",
        lightColor: "#000000",
        tier: "primary",
        iconGlyph: "N",
      },
      {
        name: "TypeScript",
        icon: "SiTypescript",
        color: "#3178C6",
        tier: "primary",
        iconGlyph: "TS",
      },
      {
        name: "JavaScript",
        icon: "SiJavascript",
        color: "#F7DF1E",
        lightColor: "#B8A000",
        tier: "primary",
        iconGlyph: "JS",
      },
      {
        name: "Tailwind CSS",
        icon: "SiTailwindcss",
        color: "#38BDF8",
        tier: "secondary",
        iconGlyph: "T",
      },
      {
        name: "Angular",
        icon: "SiAngular",
        color: "#DD0031",
        tier: "secondary",
        iconGlyph: "A",
      },
      {
        name: "Ionic",
        icon: "SiIonic",
        color: "#3880FF",
        tier: "secondary",
        iconGlyph: "I",
      },
      {
        name: "TanStack",
        icon: "",
        color: "#FF4154",
        tier: "secondary",
        iconGlyph: "TQ",
      },
      {
        name: "Zustand",
        icon: "",
        color: "#443E38",
        lightColor: "#443E38",
        tier: "secondary",
        iconGlyph: "Zu",
      },
      {
        name: "Zod",
        icon: "SiZod",
        color: "#3E67B1",
        tier: "secondary",
        iconGlyph: "Zo",
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: "SiNodedotjs",
        color: "#5FA04E",
        tier: "primary",
        iconGlyph: "N",
      },
      {
        name: "Express",
        icon: "SiExpress",
        color: "#ffffff",
        lightColor: "#000000",
        tier: "primary",
        iconGlyph: "Ex",
      },
      {
        name: "PostgreSQL",
        icon: "SiPostgresql",
        color: "#4169E1",
        tier: "primary",
        iconGlyph: "PG",
      },
      {
        name: "Prisma",
        icon: "SiPrisma",
        color: "#5A67D8",
        tier: "primary",
        iconGlyph: "P",
      },
      {
        name: "MongoDB",
        icon: "SiMongodb",
        color: "#47A248",
        tier: "secondary",
        iconGlyph: "M",
      },
      {
        name: "Drizzle",
        icon: "SiDrizzle",
        color: "#C5F74F",
        lightColor: "#5A7A00",
        tier: "secondary",
        iconGlyph: "D",
      },
      {
        name: "Supabase",
        icon: "SiSupabase",
        color: "#3ECF8E",
        tier: "secondary",
        iconGlyph: "S",
      },
      {
        name: "Redis",
        icon: "SiRedis",
        color: "#FF4438",
        tier: "secondary",
        iconGlyph: "Re",
      },
    ],
  },
  {
    category: "Tooling & DevOps",
    skills: [
      {
        name: "Git",
        icon: "SiGit",
        color: "#F05032",
        tier: "primary",
        iconGlyph: "Gi",
      },
      {
        name: "Docker",
        icon: "SiDocker",
        color: "#2496ED",
        tier: "primary",
        iconGlyph: "Do",
      },
      {
        name: "GitHub Actions",
        icon: "SiGithubactions",
        color: "#2088FF",
        tier: "secondary",
        iconGlyph: "GA",
      },
      {
        name: "AWS",
        icon: "SiAmazonwebservices",
        color: "#FF9900",
        tier: "secondary",
        iconGlyph: "AW",
      },
      {
        name: "Vitest",
        icon: "SiVitest",
        color: "#6E9F18",
        tier: "secondary",
        iconGlyph: "Vt",
      },
      {
        name: "Playwright",
        icon: "SiPlaywright",
        color: "#2EAD33",
        tier: "secondary",
        iconGlyph: "Pw",
      },
    ],
  },
  {
    category: "AI",
    skills: [
      {
        name: "Claude",
        icon: "",
        color: "#D4A574",
        tier: "secondary",
        iconGlyph: "Cl",
      },
      {
        name: "Claude Design",
        icon: "",
        color: "#D4A574",
        tier: "secondary",
        iconGlyph: "CD",
      },
      {
        name: "OpenCode",
        icon: "",
        color: "#6366F1",
        tier: "secondary",
        iconGlyph: "OC",
      },
      {
        name: "SDD",
        icon: "",
        color: "#10B981",
        tier: "secondary",
        iconGlyph: "SD",
      },
    ],
  },
  {
    category: "Exploring",
    skills: [
      {
        name: "Python",
        icon: "",
        color: "#3776AB",
        tier: "secondary",
        iconGlyph: "Py",
      },
      {
        name: "FastAPI",
        icon: "",
        color: "#009688",
        tier: "secondary",
        iconGlyph: "FA",
      },
    ],
  },
];
