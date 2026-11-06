import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/lib/paths";
import { profile } from "@/content/profile";
import { buildCommand, compatibility, faqs, links, quarantineCommand, shortcuts, toolGroups } from "@/content/toolbelt";
import ToolShowcase from "./ToolShowcase";
import CopyCommand from "./CopyCommand";
import "./toolbelt.css";

const description =
  "A free, native menu bar app for macOS with 22 tools in one place: launcher, clipboard history, screenshots, notes, timers, world clock and more.";

export const metadata: Metadata = {
  title: "Toolbelt: 22 Mac tools in one menu bar app",
  description,
  alternates: { canonical: "https://birhanu.dev/toolbelt/" },
  openGraph: {
    title: "Toolbelt: 22 Mac tools in one menu bar app",
    description,
    url: "https://birhanu.dev/toolbelt/",
    type: "website",
    images: [{ url: "https://birhanu.dev/images/toolbelt/world-clock.png", width: 1280, height: 880 }],
  },
  twitter: { card: "summary_large_image" },
};

const toolCount = toolGroups.reduce((sum, group) => sum + group.tools.length, 0);

const privacy = [
  { title: "No account", text: "Open it and start using it. There's nothing to sign up for." },
  { title: "No server", text: "Notes, snippets and clipboard history stay in a local database on your Mac." },
  { title: "No analytics", text: "Toolbelt doesn't track what you do or report it anywhere." },
];

function DownloadButtons() {
  return (
    <div className="tb-actions">
      <a href={links.download} className="tb-button tb-button-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v12M7 11l5 5 5-5M4 21h16" />
        </svg>
        Download for free
      </a>
      <a href={links.repo} target="_blank" rel="noreferrer" className="tb-button tb-button-ghost">
        View source on GitHub
      </a>
    </div>
  );
}

export default function ToolbeltPage() {
  return (
    <div className="tb">
      <section className="tb-band tb-hero">
        <div className="tb-wrap tb-hero-grid">
          <div className="tb-hero-copy">
            <img src={asset("images/toolbelt/app-icon.png")} alt="" className="tb-app-icon" width={88} height={88} />
            <p className="tb-kicker">Toolbelt for macOS</p>
            <h1>
              Every little Mac tool.
              <br />
              <span>One menu bar icon.</span>
            </h1>
            <p className="tb-lead">
              Launcher, clipboard history, screenshots, notes, timers, a world clock and more. {toolCount} tools, each a
              click or a shortcut away, in one native app.
            </p>
            <DownloadButtons />
            <p className="tb-fineprint">Free · macOS 26 or later · Apple silicon</p>
          </div>
          <div className="tb-hero-visual">
            <div className="tb-menubar" aria-hidden="true">
              <span className="tb-menubar-item is-open">
                <img src={asset("images/toolbelt/app-icon.png")} alt="" width={18} height={18} />
              </span>
              <span className="tb-menubar-item">🇺🇸 9:48 AM</span>
              <span className="tb-menubar-item tb-menubar-time">5:48 PM</span>
            </div>
            <div className="tb-window">
              <img
                src={asset("images/toolbelt/world-clock.png")}
                alt="Toolbelt's panel, with 22 colored tool tiles above a World Clock showing New York, London and Tokyo"
                width={1280}
                height={880}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>

        <dl className="tb-wrap tb-stats">
          <div>
            <dt>{toolCount}</dt>
            <dd>tools in one app</dd>
          </div>
          <div>
            <dt>Free</dt>
            <dd>no price or trial</dd>
          </div>
          <div>
            <dt>0</dt>
            <dd>accounts to create</dd>
          </div>
          <div>
            <dt>Native</dt>
            <dd>built with SwiftUI</dd>
          </div>
        </dl>
      </section>

      <section className="tb-band tb-tour">
        <div className="tb-wrap">
          <header className="tb-heading">
            <h2>Take a look around</h2>
            <p>Pick a tool to see it. Tiles at the top of the panel switch between them in the same way.</p>
          </header>
          <ToolShowcase />
        </div>
      </section>

      <section className="tb-section">
        <div className="tb-wrap">
          <header className="tb-heading">
            <h2>All {toolCount} tools</h2>
            <p>One app in place of a folder of small utilities. Keep the ones you want on and turn off the rest.</p>
          </header>
          <div className="tb-groups">
            {toolGroups.map((group) => (
              <div key={group.title} className="tb-group">
                <h3>{group.title}</h3>
                <ul>
                  {group.tools.map((tool) => (
                    <li key={tool.id}>
                      <img src={asset(`images/toolbelt/tiles/${tool.id}.png`)} alt="" width={40} height={40} loading="lazy" />
                      <span>
                        <strong>{tool.name}</strong>
                        <small>{tool.text}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tb-section tb-section-alt">
        <div className="tb-wrap tb-split">
          <header className="tb-heading">
            <h2>Keep your hands on the keyboard</h2>
            <p>
              Press a shortcut in any app and the tool is there, ready to type. Change or clear any of them in Settings.
            </p>
          </header>
          <ul className="tb-shortcuts">
            {shortcuts.map((shortcut) => (
              <li key={shortcut.action}>
                <span className="tb-keys">
                  {shortcut.keys.map((key) => (
                    <kbd key={key}>{key}</kbd>
                  ))}
                </span>
                <span>{shortcut.action}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tb-section">
        <div className="tb-wrap">
          <header className="tb-heading">
            <h2>Your data stays on your Mac</h2>
            <p>Everything you keep in Toolbelt is stored locally, in one folder you can delete at any time.</p>
          </header>
          <div className="tb-privacy">
            {privacy.map((item) => (
              <div key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="tb-note">
            <h3>When it does go online</h3>
            <ul>
              <li>
                <strong>Updates</strong> asks GitHub once a day whether there&apos;s a new version. You can turn this off
                in Settings.
              </li>
              <li>
                <strong>Info</strong> asks <a href="https://www.ipify.org" target="_blank" rel="noreferrer">ipify</a> for
                your public IP address.
              </li>
              <li>
                <strong>Now Playing</strong> downloads album art for the song playing in Spotify.
              </li>
              <li>
                <strong>Network Speed</strong> runs Apple&apos;s network test when you click Test Speed. It takes about a
                minute and can use a few hundred MB.
              </li>
            </ul>
            <p>Your data isn&apos;t encrypted by Toolbelt, so avoid keeping passwords in your notes.</p>
          </div>
        </div>
      </section>

      <section id="install" className="tb-section tb-section-alt">
        <div className="tb-wrap">
          <header className="tb-heading">
            <h2>Install it in a minute</h2>
            <p>You need macOS 26 or later on an Apple silicon Mac.</p>
          </header>
          <div className="tb-install">
            <div className="card tb-install-card">
              <h3>Download</h3>
              <p className="tb-muted">The quickest way. macOS needs one extra approval.</p>
              <ol>
                <li>
                  <a href={links.download}>Download Toolbelt.dmg</a> and open it.
                </li>
                <li>In the window that appears, drag Toolbelt onto Applications.</li>
                <li>
                  Open Toolbelt from your Applications folder. macOS blocks it because it isn&apos;t notarized by Apple.
                  Click <strong>Done</strong>.
                </li>
                <li>
                  Go to <strong>System Settings &gt; Privacy &amp; Security</strong>, scroll down to Security, and click{" "}
                  <strong>Open Anyway</strong>.
                </li>
                <li>Look for the new icon in your menu bar. Toolbelt has no Dock icon.</li>
              </ol>
              <details className="tb-inline-details">
                <summary>Prefer the Terminal for step 4?</summary>
                <CopyCommand command={quarantineCommand} />
              </details>
            </div>
            <div className="card tb-install-card">
              <h3>Build from source</h3>
              <p className="tb-muted">No warnings, and you can read the code first. You&apos;ll need Xcode 26 or later.</p>
              <CopyCommand command={buildCommand} />
              <p>
                This builds the app, installs it to <code>~/Applications</code> and opens it. It takes about 30 seconds,
                and its only dependency is Sparkle, which installs updates.
              </p>
              <a href={links.repo} target="_blank" rel="noreferrer">
                Read the code on GitHub →
              </a>
            </div>
          </div>
          <div className="tb-compat">
            <h3>Which Mac runs which tool</h3>
            <p className="tb-muted">
              Most tools work on any supported Mac. These depend on the hardware, and Settings &gt; Compatibility checks
              your own Mac.
            </p>
            <div className="tb-compat-scroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Tool</th>
                    <th scope="col">MacBook Pro</th>
                    <th scope="col">MacBook Air</th>
                    <th scope="col">iMac</th>
                    <th scope="col">Mac mini, Studio, Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {compatibility.map((row) => (
                    <tr key={row.name}>
                      <th scope="row">{row.name}</th>
                      {row.cells.map((cell, i) => (
                        <td key={i} className={cell === "No" ? "tb-muted" : undefined}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="tb-section">
        <div className="tb-wrap tb-faq-wrap">
          <header className="tb-heading">
            <h2>Questions</h2>
          </header>
          <div className="tb-faq">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="tb-band tb-cta">
        <div className="tb-wrap">
          <img src={asset("images/toolbelt/app-icon.png")} alt="" className="tb-app-icon" width={88} height={88} loading="lazy" />
          <h2>Put all your tools in one place</h2>
          <DownloadButtons />
          <p className="tb-fineprint">
            Made by <Link href="/">{profile.name}</Link> with Claude Code. Found a bug or want another tool?{" "}
            <a href={links.issues} target="_blank" rel="noreferrer">
              Open an issue
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
