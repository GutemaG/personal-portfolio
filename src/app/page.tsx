import { profile, education, skills, projects, contacts, social } from "@/content/profile";
import icons from "@/data/icons.json";
import SocialIcon from "@/components/SocialIcon";
import { asset } from "@/lib/paths";
import { experience } from "@/content/experience";
import { duration, formatRange } from "@/lib/dates";

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

// Newest first, by each role's start and by each company's latest role.
const companies = experience
  .map((c) => ({ ...c, roles: [...c.roles].sort((a, b) => b.start.localeCompare(a.start)) }))
  .sort((a, b) => b.roles[0].start.localeCompare(a.roles[0].start));

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
                <span className="edu-dates">{formatRange(e.start, e.end)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <h2>💼 Experience</h2>
        <ol className="timeline">
          {companies.map((c) => (
            <li key={c.company} className={`timeline-company${c.roles.some((r) => !r.end) ? " current" : ""}`}>
              <div className="timeline-head">
                <h3>{c.url ? <a href={c.url} target="_blank" rel="noreferrer">{c.company}</a> : c.company}</h3>
                <span>{[c.type, c.location].filter(Boolean).join(" · ")}</span>
              </div>
              <ol className="timeline-roles">
                {c.roles.map((r) => (
                  <li key={r.title + r.start} className="card timeline-role">
                    <div className="timeline-role-top">
                      <strong>{r.title}</strong>
                      <span>
                        {formatRange(r.start, r.end)} · {duration(r.start, r.end)}
                      </span>
                    </div>
                    {r.summary && <p>{r.summary}</p>}
                    {r.tech && r.tech.length > 0 && (
                      <ul className="tags">
                        {r.tech.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
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
