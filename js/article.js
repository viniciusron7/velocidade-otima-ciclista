(() => {
  function initArticle() {
    const nav = document.querySelector("nav.top");
    const links = nav ? [...nav.querySelectorAll('ul a[href^="#"]')] : [];
    const sections = links
      .map((link) => ({
        link,
        section: document.getElementById(link.hash.slice(1)),
      }))
      .filter(({ section }) => section);
    const progress = document.querySelector(".reading-progress");
    const navList = nav?.querySelector("ul");
    let activeLink = null;
    let framePending = false;

    if (progress) progress.setAttribute("aria-hidden", "true");

    function revealNavLink(link) {
      if (!navList || navList.scrollWidth <= navList.clientWidth) return;
      const item = link.getBoundingClientRect();
      const list = navList.getBoundingClientRect();
      if (item.left < list.left + 8) {
        navList.scrollLeft += item.left - list.left - 8;
      } else if (item.right > list.right - 8) {
        navList.scrollLeft += item.right - list.right + 8;
      }
    }

    function updateReadingPosition() {
      framePending = false;
      const root = document.documentElement;
      const travel = Math.max(0, root.scrollHeight - window.innerHeight);
      const fraction = travel
        ? Math.min(1, Math.max(0, window.scrollY / travel))
        : 0;
      if (progress) progress.style.transform = `scaleX(${fraction})`;

      const threshold = (nav?.getBoundingClientRect().bottom || 0) + 96;
      let current = sections[0]?.link;
      for (const { link, section } of sections) {
        if (section.getBoundingClientRect().top <= threshold) current = link;
      }
      if (travel > 0 && window.scrollY >= travel - 4) {
        current = sections.at(-1)?.link;
      }
      if (!current || current === activeLink) return;
      for (const link of links) {
        const active = link === current;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
      activeLink = current;
      revealNavLink(current);
    }

    function scheduleUpdate() {
      if (framePending) return;
      framePending = true;
      window.requestAnimationFrame(updateReadingPosition);
    }

    document.querySelectorAll('input[type="range"]').forEach((slider) => {
      const label = slider.closest(".slider-row")?.querySelector(".label-name");
      if (!label || !slider.id) return;
      if (!label.id) label.id = `${slider.id}-label`;
      slider.setAttribute("aria-labelledby", label.id);
    });

    const controls = [...document.querySelectorAll(".toggle-btn, .plot-tab")];
    function syncPressedStates() {
      for (const button of controls) {
        button.setAttribute(
          "aria-pressed",
          String(button.classList.contains("active")),
        );
      }
    }
    for (const button of controls) {
      button.addEventListener("click", () => queueMicrotask(syncPressedStates));
    }
    syncPressedStates();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", () => {
      activeLink = null;
      scheduleUpdate();
    });
    window.addEventListener("load", scheduleUpdate, { once: true });
    document.fonts?.ready.then(scheduleUpdate);
    updateReadingPosition();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initArticle, { once: true });
  } else {
    initArticle();
  }
})();
