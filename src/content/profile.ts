// All home page content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Birhanu G.",
  role: "Full Stack Developer and Data Science Enthusiast",
  photo: "images/birhanu.jpg",
  cv: "Birhanu-Guidsa-Resume.pdf",
  about:
    "Hi, I'm Birhanu, a passionate developer specializing in building modern, scalable web applications. With a strong foundation in React, TypeScript, and Python, I bring ideas to life through clean and efficient code. I'm constantly exploring new technologies and enjoy solving complex problems to deliver impactful digital experiences. My goal is to create intuitive and performant applications that leave a lasting impression.",
};

// Dates are "YYYY-MM".
export const education = [
  {
    degree: "MSc, Computer Science and Engineering",
    school: "Adama Science and Technology University (ASTU)",
    start: "2021-09",
    end: "2023-09",
  },
  {
    degree: "BSc, Computer Science and Engineering",
    school: "Adama Science and Technology University (ASTU)",
    start: "2016-09",
    end: "2021-09",
  },
];

// `icon` is a key in src/data/icons.json.
export const skills = [
  { title: "C# (ASP.NET)", icon: "csharp" },
  { title: "Python", icon: "python" },
  { title: "Django", icon: "django" },
  { title: "FAST API", icon: "fast-api" },
  { title: "Pandas", icon: "pandas" },
  { title: "React", icon: "react" },
  { title: "Typescript", icon: "typescript" },
  { title: "PostgreSQL", icon: "postgres" },
  { title: "GO", icon: "golang" },
];

// Set imageFit: "contain" for logos that should not be cropped.
export type Project = { title: string; link: string; image?: string; imageFit?: "contain"; description: string };

export const projects: Project[] = [
  {
    title: "Water Utility Management Information System (WUMIS)",
    link: "https://wumis.et",
    image: "images/wumis1.png",
    description:
      "WUMIS is an innovative Water Utility Management Information System designed to empower utilities in Ethiopia by enhancing efficiency, reducing operational costs, and significantly improving overall performance. Developed by a consortium of experienced Ethiopian companies, WUMIS combines advanced information technology with comprehensive sector insights. With functional modules covering customer services, finances, human resources, property management, and analytics, WUMIS aims to meet the specific needs and priorities of utilities, ultimately serving their customers better. Discover WUMIS – your partner in successful water utility management.",
  },
  {
    title: "EthioQR",
    link: "https://ethioqr.app",
    image: "images/ethioqr.png",
    description:
      "EthioQR helps you say goodbye to printed menus by creating stunning digital menus accessible via QR codes. It's modern, hygienic, and easy to manage.",
  },
  {
    title: "Utility Hub",
    link: "https://utility.ethioqr.app",
    image: "images/utility-hub.png",
    imageFit: "contain",
    description:
      "Your everyday digital Swiss Army Knife — A sleek, fast bundles essential calculators, converters, and generators for daily life, health, finance, tech, and more.",
  },
  {
    title: "Ethiopian Date Converter",
    link: "https://github.com/GutemaG/py_ethiopain_date_converter",
    description:
      "A Python package to convert dates between the Gregorian and Ethiopian calendars. It supports localization, formatting, and various utilities for working with Ethiopian dates.",
  },
];

export const contacts = [
  { label: "Email", text: "bir13gud@gmail.com", href: "mailto:bir13gud@gmail.com" },
  { label: "GitHub", text: "GutemaG", href: "https://github.com/GutemaG" },
  { label: "LinkedIn", text: "Birhanu G.", href: "https://www.linkedin.com/in/birhanugudisa/" },
  { label: "Whatsapp", text: "Click to Chat", href: "https://wa.me/+251921641744" },
  { label: "Telegram", text: "@birhanugu", href: "https://t.me/birhanugu" },
];

export const social = {
  github: "https://github.com/GutemaG",
  linkedin: "https://www.linkedin.com/in/birhanugudisa/",
};
