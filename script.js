const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");

    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  });

  const navLinks = siteNav.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* REVEAL ON SCROLL */

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}


/* TILT EFFECT */

const tiltCards = document.querySelectorAll(".tilt-card");

if (tiltCards.length > 0 && window.innerWidth > 900) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  });
}


/* OPTIONAL: ACTIVE HEADER SHADOW ON SCROLL */

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 20) {
    header.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
  } else {
    header.style.boxShadow = "none";
  }
});