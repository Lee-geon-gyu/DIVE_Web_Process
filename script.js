const lenis = new Lenis({
  autoRaf: true,
  autoToggle: true,
  anchors: true,
  stopInertiaOnNavigate: true,
});

window.lenis = lenis;

function applyAos(selector, animation, delay = 0, step = 0) {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.dataset.aos = animation;
    element.dataset.aosDelay = String(delay + index * step);
  });
}

applyAos(".hero__heading", "fade-down", 100);
applyAos(".overview__content", "fade-right", 80);
applyAos(".background__copy", "fade-right", 80);
applyAos(".problem-card", "fade-up", 100, 100);
applyAos(".concept__heading", "fade-down", 60);
applyAos(".concept__slogan", "zoom-in", 140);
applyAos(".concept__description", "fade-up", 220);
applyAos(".concept-value", "fade-up", 260, 80);
applyAos(".persona__intro", "fade-right", 80);
applyAos(".persona-card", "fade-up", 140, 140);
applyAos(".ia__intro", "fade-right", 60);
applyAos(".ia__root", "zoom-in", 120);
applyAos(".ia-branch", "fade-up", 180, 70);
applyAos(".ia__legend", "fade-right", 280);
applyAos(".design__intro", "fade-right", 60);
applyAos(".design__colors", "fade-up", 160);
applyAos(".design__typography", "fade-up", 100);
applyAos(".design__components", "fade-up", 200);

if (window.AOS) {
  AOS.init({
    duration: 850,
    easing: "ease-out-cubic",
    once: true,
    offset: 110,
    anchorPlacement: "top-bottom",
  });
}

const headerLinks = [
  ...document.querySelectorAll(
    '.site-header__section-label, .site-header__links a[href^="#"]',
  ),
];
const pageSections = [...document.querySelectorAll("main section[id]")];
const siteHeader = document.querySelector(".site-header");
const brandImage = document.querySelector(".site-header__brand img");
const brandLink = document.querySelector(".site-header__brand");

brandLink?.addEventListener("click", (event) => {
  event.preventDefault();
  lenis.scrollTo(0, { immediate: false });
});

function updateActiveNavigation() {
  const checkpoint = window.scrollY + window.innerHeight * 0.45;
  let activeSection = pageSections[0];

  pageSections.forEach((section) => {
    if (section.offsetTop <= checkpoint) activeSection = section;
  });

  const activeId = activeSection?.id;

  const headerCheckpoint = (siteHeader?.offsetHeight || 70) / 2;
  const headerSection = pageSections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= headerCheckpoint && rect.bottom > headerCheckpoint;
  });
  const useLightHeader = headerSection?.dataset.headerTheme === "light";

  siteHeader?.classList.toggle("is-light", useLightHeader);
  if (brandImage) {
    brandImage.src = useLightHeader
      ? "Images/header/DIVE_logo_black.png"
      : "Images/header/DIVE_logo_white.png";
  }

  headerLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", isActive);

    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

lenis.on("scroll", updateActiveNavigation);
window.addEventListener("resize", updateActiveNavigation);
updateActiveNavigation();
