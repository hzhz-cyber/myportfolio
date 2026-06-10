/* =====================================================
   PORTFOLIO JS — 손혜진
   ===================================================== */

// ── 햄버거 메뉴 토글 ──
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

hamburgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
});

// 모바일 메뉴 링크 클릭 시 닫기
mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
    });
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
onScroll(); // 초기 실행

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

// CSS에 fade-in 애니메이션 추가 (JS로 동적 삽입)
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
