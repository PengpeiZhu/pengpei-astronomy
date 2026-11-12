"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { assetPath } from "../lib/site-path";
import { LabPreview } from "./lab-preview";

const projects = [
  {
    id: "uvj",
    title: "UVJ + SED lab",
    description: "See how a galaxy’s spectrum sets its rest-frame colours.",
    preview: "Compare the UVJ colours of three reference galaxy groups from Suess et al. (2021).",
    href: "/interactive/uvj-sed-lab.html",
  },
  {
    id: "sandage",
    title: "Sandage SFH lab",
    description: "Explore when a galaxy forms its stars, from early assembly to late bursts.",
    preview: "Try four preset star formation histories and compare when their stellar mass forms.",
    href: "/interactive/sandage-sfh.html",
  },
  {
    id: "metallicity",
    title: "Metallicity explorer",
    description: "Connect stellar metallicities to the spectra and models used to measure them.",
  },
] as const;

export function InteractiveProjects() {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const showLinkedLab = () => {
      if (window.location.hash === "#uvj-sed-lab") setSelected(0);
    };
    window.addEventListener("hashchange", showLinkedLab);
    return () => window.removeEventListener("hashchange", showLinkedLab);
  }, []);

  function moveFocus(event: KeyboardEvent<HTMLDivElement>) {
    const last = projects.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowDown": next = selected === last ? 0 : selected + 1; break;
      case "ArrowUp": next = selected === 0 ? last : selected - 1; break;
      case "Home": next = 0; break;
      case "End": next = last; break;
      default: return;
    }
    event.preventDefault();
    setSelected(next);
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }

  return (
    <div className="project-browser" id="uvj-sed-lab">
      <div className="project-menu" role="tablist" aria-label="Choose a project" aria-orientation="vertical" onKeyDown={moveFocus}>
        {projects.map((project, index) => (
          <button
            className="project-tab"
            key={project.id}
            type="button"
            role="tab"
            id={`project-tab-${project.id}`}
            aria-selected={index === selected}
            aria-controls={`project-panel-${project.id}`}
            aria-labelledby={`project-name-${project.id}`}
            aria-describedby={`project-description-${project.id}`}
            tabIndex={index === selected ? 0 : -1}
            onClick={() => setSelected(index)}
          >
            <span id={`project-name-${project.id}`} className="project-name">{project.title}</span>
            <span id={`project-description-${project.id}`} className="project-description">{project.description}</span>
            <span className="project-tab-arrow" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
      <div className="project-content">
        {projects.map((project, index) => (
          <div
            className="project-panel"
            key={project.id}
            id={`project-panel-${project.id}`}
            role="tabpanel"
            aria-labelledby={`project-tab-${project.id}`}
            hidden={index !== selected}
            tabIndex={0}
          >
            {index === selected && ("href" in project ? (
              <>
                <div className="project-preview-heading">
                  <p>{project.preview}</p>
                  <a className="button button-light" href={assetPath(project.href)} target="_blank" rel="noreferrer">
                    Open full lab <span className="sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span>
                  </a>
                </div>
                <LabPreview href={assetPath(project.href)} title={project.title} variant={project.id} />
              </>
            ) : (
              <div className="project-coming-soon">
                <h3>Metallicity explorer</h3>
                <p>Coming soon. Browse spectra and compare the stellar population models behind individual metallicity measurements.</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
