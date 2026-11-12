"use client";

import { useEffect, useRef, useState } from "react";

const previewStyles = {
  uvj: `
    main { max-width: none; padding: 0; }
    header, .notes, .sources, .controls > :not(.presets),
    .presets [data-group="11"], .presets [data-group="12"],
    .view-buttons, .galaxy-examples, .checks, .target-inputs,
    .chart-note, .chart-top .minor, .fit-status { display: none !important; }
    .workspace { display: block; }
    .controls, .stage { display: block; width: 100%; border: 0; border-radius: 0; }
    .controls { padding: 12px 14px; border-bottom: 1px solid var(--border); }
    .presets { display: flex; flex-wrap: wrap; gap: 7px; margin: 0; }
    .presets button { min-height: 38px; font-size: 13px; }
    .readouts { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .metric { padding: 10px 12px; }
    .metric:nth-child(2) { border-right: 1px solid var(--border); }
    .metric:nth-child(3) { grid-column: auto; border-top: 0; }
    .metric strong { font-size: clamp(12px, 2.5vw, 19px); }
    .plots { grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr); }
    .sed-visual { display: block; }
    .chart { padding: 12px 10px; }
    .chart + .chart { border-top: 0; border-left: 1px solid var(--border); }
    .chart-top h2 { font-size: 15px; }
    .chart .legend { padding-top: 0; }
    #uvjSvg { pointer-events: none; }
    @media (max-width: 570px) {
      .plots { display: block; }
      .chart:first-child { display: none; }
      .chart + .chart { border: 0; }
      .metric small { font-size: 10px; }
    }
  `,
  sandage: `
    .shell { max-width: none; padding: 0; }
    .masthead, .hero, .documentation, .footer, .insights,
    .controls > :not(.preset-grid), .metrics, .chart-top, .chart-toolbar,
    .mass-control, .chart-bottom { display: none !important; }
    .layout { display: flex; flex-direction: column; gap: 0; }
    .controls, .visuals { width: 100%; }
    .controls { order: 0; padding: 12px 14px; border: 0; border-bottom: 1px solid var(--line); border-radius: 0; }
    .visuals { order: 1; }
    #history-plot { border: 0; border-radius: 0; }
    .preset-grid { display: flex; flex-wrap: wrap; gap: 7px; margin: 0; }
    .preset-grid button { min-height: 38px; padding-inline: 10px; font-size: 13px; }
    .preset-grid button[aria-pressed="true"] { background: var(--ink); border-color: var(--ink); color: white; }
    .legend { margin: 10px 14px 0; }
    .plot-wrap { padding: 0; }
    #chart { max-height: 470px; pointer-events: none; }
    .plot-description { padding: 0 14px 12px; }
  `,
};

type LabVariant = keyof typeof previewStyles;

const frameSizeMessage = "astronomy-lab-preview-height";

function previewDocument(source: string, variant: LabVariant) {
  const headEnd = /<\/head>/i;
  if (!headEnd.test(source)) throw new Error("Invalid lab document");

  // The sandbox runs the original lab scripts. These additions only limit its visible controls.
  const styles = `<style>${previewStyles[variant]}</style>`;
  const bridge = `<script>
    document.addEventListener("DOMContentLoaded", () => {
      const main = document.querySelector("main");
      if (!main) return;

      const uvj = document.getElementById("uvjSvg");
      if (uvj) {
        uvj.removeAttribute("tabindex");
        uvj.setAttribute("role", "img");
        uvj.setAttribute("aria-label", "Rest-frame UVJ colours for the selected reference spectrum");
      }

      const history = document.getElementById("chart");
      if (history) {
        history.removeAttribute("tabindex");
        history.setAttribute("aria-label", "Star formation rate and cumulative formed mass for the selected history");
        const buttons = Array.from(document.querySelectorAll(".preset-grid button"));
        buttons.forEach(button => {
          button.setAttribute("aria-pressed", "false");
          button.addEventListener("click", () => {
            buttons.forEach(preset => preset.setAttribute("aria-pressed", String(preset === button)));
          });
        });
      }

      const reportHeight = () => {
        const height = Math.ceil(main.getBoundingClientRect().height);
        window.parent.postMessage({ type: "${frameSizeMessage}", height }, "*");
      };
      new ResizeObserver(reportHeight).observe(main);
      reportHeight();
    }, { once: true });
  </script>`;

  return source.replace(headEnd, () => `${styles}${bridge}</head>`);
}

export function LabPreview({ href, title, variant }: { href: string; title: string; variant: LabVariant }) {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [source, setSource] = useState<string | null>(null);
  const [height, setHeight] = useState(470);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const receiveHeight = (event: MessageEvent) => {
      if (event.source !== iframe.current?.contentWindow || event.origin !== "null") return;
      const data = event.data;
      if (data?.type !== frameSizeMessage || !Number.isInteger(data.height)) return;
      if (data.height >= 100 && data.height <= 1600) setHeight(data.height);
    };

    window.addEventListener("message", receiveHeight);
    async function loadPreview() {
      try {
        const response = await fetch(href, { signal: controller.signal });
        if (!response.ok) throw new Error("Lab preview could not be loaded");
        const document = previewDocument(await response.text(), variant);
        if (!controller.signal.aborted) setSource(document);
      } catch {
        if (!controller.signal.aborted) setUnavailable(true);
      }
    }
    void loadPreview();

    return () => {
      controller.abort();
      window.removeEventListener("message", receiveHeight);
    };
  }, [href, variant]);

  if (!source) {
    return (
      <p className="lab-preview-status" role="status">
        {unavailable ? "Preview unavailable. You can still open the full lab above." : "Loading preview…"}
      </p>
    );
  }

  return (
    <iframe
      ref={iframe}
      className="lab-preview-frame"
      srcDoc={source}
      title={`${title} preview`}
      sandbox="allow-scripts"
      height={height + 2}
      loading="lazy"
    />
  );
}
