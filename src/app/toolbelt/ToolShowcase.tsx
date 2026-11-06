"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { showcase } from "@/content/toolbelt";
import { asset } from "@/lib/paths";

export default function ToolShowcase() {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = showcase[index];

  function onKeyDown(event: KeyboardEvent) {
    const steps: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const step = steps[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + showcase.length) % showcase.length;
    setIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="tb-showcase">
      <div className="tb-showcase-tabs" role="tablist" aria-label="Toolbelt tools" onKeyDown={onKeyDown}>
        {showcase.map((tool, i) => (
          <button
            key={tool.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tb-tab-${tool.id}`}
            aria-selected={i === index}
            aria-controls="tb-showcase-panel"
            tabIndex={i === index ? 0 : -1}
            className="tb-showcase-tab"
            onClick={() => setIndex(i)}
          >
            <img src={asset(`images/toolbelt/tiles/${tool.id}.png`)} alt="" width={40} height={40} />
            <span>{tool.name}</span>
          </button>
        ))}
      </div>

      <div className="tb-showcase-body" id="tb-showcase-panel" role="tabpanel" aria-labelledby={`tb-tab-${active.id}`}>
        <div className="tb-showcase-copy" key={active.id}>
          <h3>{active.title}</h3>
          <p>{active.text}</p>
          <ul>
            {active.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="tb-window tb-showcase-stack">
          {showcase.map((tool, i) => (
            <img
              key={tool.id}
              src={asset(`images/toolbelt/${tool.id}.png`)}
              alt={i === index ? `Toolbelt's ${tool.name} tool` : ""}
              aria-hidden={i !== index}
              className={i === index ? "is-active" : undefined}
              width={1280}
              height={880}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
