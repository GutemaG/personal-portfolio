import { profile, education, skills, projects, contacts } from "@/content/profile";
import icons from "@/data/icons.json";
import { asset } from "@/lib/paths";

const iconSvgs = icons as Record<string, string>;

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <img src={asset(profile.photo)} alt={profile.name} className="avatar" width={312} height={312} />
        <h3>Hello, I&apos;m</h3>
        <h1>{profile.name}</h1>
        <h2>{profile.role}</h2>
      </section>

      <section>
        <h2>👋 About Me</h2>
        <p>{profile.about}</p>
        <a href={asset(profile.cv)} target="_blank" rel="noreferrer" className="button">
          Download CV
        </a>

        <h3>Education</h3>
        <ul>
          {education.map((e) => (
            <li key={e.degree}>
              <strong>{e.degree}</strong>
              <ul>
                <li>{e.school}</li>
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <hr />

      <section>
        <h2>🛠️ Skills &amp; Technologies</h2>
        <div className="cards skills">
          {skills.map((s) => (
            <div key={s.title} className="card skill">
              <span className="skill-icon" dangerouslySetInnerHTML={{ __html: iconSvgs[s.icon] ?? "" }} />
              <span>{s.title}</span>
            </div>
          ))}
        </div>
      </section>

      <hr />

      <section>
        <h2>🚀 My Projects</h2>
        <div className="cards projects">
          {projects.map((p) => (
            <a key={p.title} href={p.link} target="_blank" rel="noreferrer" className="card project">
              {p.image && <img src={asset(p.image)} alt={p.title} loading="lazy" />}
              <div className="project-body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2>📫 Get in Touch</h2>
        <p>
          I&apos;d love to connect! Whether you have a question, want to collaborate on a project, or just want to say
          hi, feel free to reach out.
        </p>
        <ul>
          {contacts.map((c) => (
            <li key={c.label}>
              {c.label}:{" "}
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {c.text}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
