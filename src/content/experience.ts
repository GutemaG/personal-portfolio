// Work history shown as a tree on the home page: one entry per company, its roles under it.
// Dates are "YYYY-MM"; leave `end` out for a current role. Order does not matter, the page sorts
// newest first and works out each duration.

export type Role = {
  title: string;
  start: string;
  end?: string;
  summary?: string;
  tech?: string[];
};

export type Company = {
  company: string;
  url?: string;
  location?: string;
  type?: string;
  roles: Role[];
};

export const experience: Company[] = [
  {
    company: "Tenacious Intelligence",
    type: "Full-time",
    location: "Hybrid",
    roles: [{ title: "Back End Developer", start: "2026-02", tech: ["ASP.NET", "React"] }],
  },
  {
    company: "Toplink Technology",
    type: "Full-time",
    location: "Addis Ababa, Ethiopia · On-site",
    roles: [
      {
        title: "Full Stack Developer (.NET)",
        start: "2023-04",
        end: "2026-07",
        summary: "Engineered robust and scalable web solutions within the .NET ecosystem, including WUMIS.",
        tech: ["ASP.NET", "React"],
      },
    ],
  },
  {
    company: "Microverse",
    location: "Remote",
    roles: [{ title: "Full-stack Developer", start: "2022-11", end: "2023-11", tech: ["JavaScript"] }],
  },
  {
    company: "Ethiopia Oromia Science and Technology Authority (OSTA)",
    type: "Internship",
    location: "Addis Ababa, Ethiopia · On-site",
    roles: [{ title: "Web Developer", start: "2018-09", end: "2018-11", tech: ["PHP", "JavaScript"] }],
  },
];
