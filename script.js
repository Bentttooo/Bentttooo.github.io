const year = document.querySelector("[data-year]");
const navLinks = Array.from(document.querySelectorAll(".nav a"));

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    {
      rootMargin: "-28% 0px -60% 0px",
      threshold: [0.15, 0.4, 0.7],
    }
  );

  observedSections.forEach((section) => observer.observe(section));
}
