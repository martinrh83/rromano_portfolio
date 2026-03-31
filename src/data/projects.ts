export interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard. Built with modern stack for optimal performance and scalability.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    techStack: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/ecommerce",
    featured: true,
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, team workspaces, and productivity analytics.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    techStack: ["React", "Firebase", "Material-UI", "Redux"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/taskapp",
  },
  {
    title: "Weather Dashboard",
    description:
      "Beautiful weather dashboard with forecasts, maps, and location search. Features responsive design and dark mode.",
    image:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
    techStack: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/weather",
  },
  {
    title: "Developer Portfolio",
    description:
      "Modern portfolio website with animations, dark mode, and terminal-style contact form. Built with performance in mind.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    techStack: ["React", "Vite", "GSAP", "TypeScript"],
    githubUrl: "https://github.com/username/portfolio",
  },
  {
    title: "Blog CMS",
    description:
      "Content management system for blogs with markdown support, image uploads, and SEO optimization.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    techStack: ["Next.js", "Sanity", "React Query", "Vercel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/blog-cms",
  },
  {
    title: "Fitness Tracker",
    description:
      "Track workouts, set goals, and monitor progress with beautiful charts and statistics.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
    techStack: ["React Native", "Expo", "MongoDB", "Express"],
    githubUrl: "https://github.com/username/fitness",
  },
];
