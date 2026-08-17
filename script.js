const lenis = new Lenis({
  autoRaf: true,
  autoToggle: true,
  anchors: true,
  stopInertiaOnNavigate: true,
});

window.lenis = lenis;

const headerLinks = [
  ...document.querySelectorAll(
    '.site-header__section-label, .site-header__links a[href^="#"]',
  ),
];
const pageSections = [...document.querySelectorAll("main section[id]")];

function updateActiveNavigation() {
  const checkpoint = window.scrollY + window.innerHeight * 0.45;
  let activeSection = pageSections[0];

  pageSections.forEach((section) => {
    if (section.offsetTop <= checkpoint) activeSection = section;
  });

  const activeId = activeSection?.id;

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
