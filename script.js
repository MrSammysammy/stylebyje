const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const header = document.querySelector(".site-header");

/* MOBILE NAV */

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

  document.addEventListener("click", (event) => {
    const clickedInsideNav = siteNav.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedMenuButton && siteNav.classList.contains("open")) {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
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
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
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
    card.style.transition = "transform 0.18s ease";

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3.5;
      const rotateY = ((x - centerX) / centerX) * 3.5;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.01, 1.01, 1.01)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    });
  });
}


/* HEADER SCROLL EFFECT */

if (header) {
  const updateHeaderOnScroll = () => {
    if (window.scrollY > 16) {
      header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.06)";
      header.style.background = "rgba(251,248,244,0.88)";
    } else {
      header.style.boxShadow = "none";
      header.style.background = "rgba(251,248,244,0.82)";
    }
  };

  updateHeaderOnScroll();
  window.addEventListener("scroll", updateHeaderOnScroll);
}


/* ACTIVE NAV LINK ON SCROLL */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".site-nav a");

if (sections.length > 0 && navItems.length > 0) {
  const activateNavOnScroll = () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.includes("#") && href === `#${currentSectionId}`) {
        link.classList.add("active");
      } else if (href && href.includes("#")) {
        link.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", activateNavOnScroll);
  activateNavOnScroll();
}