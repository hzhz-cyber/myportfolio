/* =====================================================
   PORTFOLIO JS — 손혜진
   ===================================================== */

// ── 햄버거 메뉴 토글 ──
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("open");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
    });
});

document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        mobileMenu.classList.remove("open");
    }
});

// ── 스크롤 시 네비게이션 활성 메뉴 표시 ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function onScroll() {
    const scrollY = window.scrollY + 80;

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", onScroll);
onScroll();

// ── 스크롤 시 섹션 페이드인 애니메이션 ──
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.08 },
);

document.querySelectorAll(".section-card").forEach((card) => {
    card.classList.add("fade-in");
    observer.observe(card);
});

const style = document.createElement("style");
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// ── 맨 위로 버튼 ──
const topBtn = document.getElementById("topBtn");
if (topBtn) {
    window.addEventListener("scroll", () => {
        topBtn.classList.toggle("show", window.scrollY > 300);
    });
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
