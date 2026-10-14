import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import SocialIcon from "./SocialIcon";
import { profile, social } from "@/content/profile";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="container nav">
        <Link href="/" className="brand">
          {profile.name}
        </Link>
        <div className="nav-links">
          <Link href="/blog/">Blog</Link>
          <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-button">
            <SocialIcon name="github" />
          </a>
          <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-button">
            <SocialIcon name="linkedin" />
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
