import { useEffect, useState } from "react";

/** Track the reading line below the sticky index, including layout changes. */
export function useReadingProgress(sectionIds: readonly string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    let frame = 0;
    let previousActive = "";
    const update = () => {
      frame = 0;
      const header = document.querySelector<HTMLElement>(".site-header");
      const index = document.querySelector<HTMLElement>(".page-index");
      const stickyHeight = window.innerWidth <= 900
        ? (header?.offsetHeight ?? 0) + (index?.offsetHeight ?? 0)
        : (index?.offsetHeight ?? 0);
      const readingLine = window.scrollY + stickyHeight + 24;
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3;
      let nextActive = "";
      document.querySelectorAll<HTMLElement>("[data-reading-section]").forEach(section => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        const fraction = Math.max(0, Math.min(1, (readingLine - top) / Math.max(1, section.offsetHeight)));
        document.querySelectorAll<HTMLElement>(`[data-progress-for="${section.id}"]`).forEach(track => {
          track.style.setProperty("--read-progress", String(atEnd ? 1 : fraction));
        });
        if (sectionIds.includes(section.id) && readingLine >= top) nextActive = section.id;
      });
      if (nextActive !== previousActive) {
        previousActive = nextActive;
        setActive(nextActive);
        // Keep the current section visible within the narrow, scrollable index.
        if (window.innerWidth <= 900 && nextActive) {
          const nav = index?.querySelector<HTMLElement>("nav");
          const link = nav?.querySelector<HTMLElement>(`a[href="#${nextActive}"]`);
          if (nav && link) {
            const navBounds = nav.getBoundingClientRect();
            const linkBounds = link.getBoundingClientRect();
            if (linkBounds.left < navBounds.left || linkBounds.right > navBounds.right) {
              nav.scrollLeft += linkBounds.left - navBounds.left - 16;
            }
          }
        }
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    const main = document.querySelector("main");
    if (main) observer.observe(main);
    document.querySelectorAll("[data-reading-section]").forEach(section => observer.observe(section));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sectionIds]);
  return active;
}
