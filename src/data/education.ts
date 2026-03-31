export interface Education {
  degree: string;
  institution: string;
  country: string;
  countryCode: string;
  period: string;
  description?: string;
  highlights?: string[];
}

export const educationHistory: Education[] = [
  {
    degree: "Bachelor of Software Engineering",
    institution: "Universidad Nacional",
    country: "Argentina",
    countryCode: "AR",
    period: "2018 – 2023",
  },
];
