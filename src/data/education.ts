export interface Education {
  degree: string;
  institution: string;
  country: string;
  countryCode: string;
  period: string;
  mono?: string;
  description?: string;
  highlights?: string[];
}

export const educationHistory: Education[] = [
  {
    degree: "Information Systems Engineering",
    institution: "Universidad Tecnológica Nacional · FRT",
    country: "Argentina",
    countryCode: "AR",
    period: "2020",
    mono: "UTN",
  },
];
