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

// ── Contact 클립보드 복사 ──
const copyToast = document.getElementById("copyToast");
let toastTimer = null;

function copyContact(el) {
    const text = el.dataset.copy;
    const label = el.dataset.label || "텍스트";

    if (!text) return;

    navigator.clipboard
        .writeText(text)
        .then(() => {
            showToast(`${label}가 복사되었습니다`);
        })
        .catch(() => {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            try {
                document.execCommand("copy");
                showToast(`${label}가 복사되었습니다`);
            } catch {
                showToast("복사에 실패했습니다");
            }
            document.body.removeChild(ta);
        });
}

function showToast(msg) {
    copyToast.textContent = msg;
    copyToast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        copyToast.classList.remove("show");
    }, 2000);
}

// ── 프로젝트 더보기 모달 ──
const projectDataEl = document.getElementById("projectData");
const projectData = projectDataEl ? JSON.parse(projectDataEl.textContent) : {};
const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");

function openDetail(projId) {
    const proj = projectData[projId];
    if (!proj) return;

    const tagsHtml = proj.tags.map((t) => `<span class="tag">${t}</span>`).join("");

    const resultRow = proj.result
        ? `<span class="modal-meta-label">성과</span><span class="modal-meta-value">${proj.result}</span>`
        : "";

    const linkHtml = proj.link ? `<a href="${proj.link}" target="_blank" class="modal-link">🔗 영상 보러가기</a>` : "";

    modalContent.innerHTML = `
        <h2 class="modal-title">${proj.title}</h2>
      <div class="modal-meta">

    <div class="modal-meta-item">
        <span class="modal-meta-label">기간</span>
        <span class="modal-meta-value">${proj.period}</span>
    </div>

    <div class="modal-meta-item">
        <span class="modal-meta-label">역할</span>
        <span class="modal-meta-value">${proj.role}</span>
    </div>

    <div class="modal-meta-item">
        <span class="modal-meta-label">목적</span>
        <span class="modal-meta-value">${proj.goal}</span>
    </div>

    ${
        proj.result
            ? `
        <div class="modal-meta-item">
            <span class="modal-meta-label">성과</span>
            <span class="modal-meta-value">${proj.result}</span>
        </div>
    `
            : ""
    }

</div>
        <p class="modal-desc">${proj.description}</p>
        <div class="modal-tags">${tagsHtml}</div>
        ${linkHtml}
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeDetail() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
}

function closeDetailOnOverlay(e) {
    if (e.target === modal) closeDetail();
}

// ── [2] YU 숏폼 챌린지 수상작 모달 ──
const awardModal = document.getElementById("awardModal");

function openAwardModal() {
    awardModal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeAwardModal() {
    awardModal.classList.remove("open");
    document.body.style.overflow = "";
}

function closeAwardModalOnOverlay(e) {
    if (e.target === awardModal) closeAwardModal();
}

// ── ESC 키로 모든 모달 닫기 ──
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeDetail();
        closeAwardModal();
    }
});
