import { profile, education, skills, projects, contacts, social } from "@/content/profile";
import icons from "@/data/icons.json";
import SocialIcon from "@/components/SocialIcon";
import { asset } from "@/lib/paths";

const iconSvgs = icons as Record<string, string>;

function initials(title: string) {
  return title
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">Hello, I&apos;m</p>
          <h1>{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <div className="hero-actions">
            <a href={asset(profile.cv)} target="_blank" rel="noreferrer" className="button">
              Download CV
            </a>
            <a href="#contact" className="button button-outline">
              Get in touch
            </a>
          </div>
          <div className="hero-social">
            <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <SocialIcon name="github" size={22} />
            </a>
            <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <SocialIcon name="linkedin" size={22} />
            </a>
          </div>
        </div>
        <img src={asset(profile.photo)} alt={profile.name} className="avatar" width={320} height={320} />
      </section>

      <section id="about" className="section about">
        <div>
          <h2>👋 About Me</h2>
          <p>{profile.about}</p>
        </div>
        <div>
          <h2>🎓 Education</h2>
          <div className="education">
            {education.map((e) => (
              <div key={e.degree} className="card edu">
                <strong>{e.degree}</strong>
                <span>{e.school}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <h2>🛠️ Skills &amp; Technologies</h2>
        <div className="skills">
          {skills.map((s) => (
            <div key={s.title} className="card skill">
              <span className="svg-fit skill-icon" dangerouslySetInnerHTML={{ __html: iconSvgs[s.icon] ?? "" }} />
              <span>{s.title}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <h2>🚀 My Projects</h2>
        <div className="projects">
          {projects.map((p) => (
            <a key={p.title} href={p.link} target="_blank" rel="noreferrer" className="card project">
              <div className="project-media">
                {p.image ? (
                  <img src={asset(p.image)} alt={p.title} loading="lazy" className={p.imageFit} />
                ) : (
                  <span className="project-placeholder">{initials(p.title)}</span>
                )}
              </div>
              <div className="project-body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="project-link">
                  {new URL(p.link).hostname.replace(/^www\./, "")} →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <h2>📫 Get in Touch</h2>
        <p>
          I&apos;d love to connect! Whether you have a question, want to collaborate on a project, or just want to say
          hi, feel free to reach out.
        </p>
        <div className="contacts">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="card contact"
            >
              <SocialIcon name={c.label} size={22} />
              <span>
                <span className="contact-label">{c.label}</span>
                <span className="contact-text">{c.text}</span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
