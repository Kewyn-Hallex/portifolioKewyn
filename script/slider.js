const tabsBox = document.querySelector(".tabs-box"),
    allTabs = tabsBox.querySelectorAll(".tab"),
    arrowIcons = document.querySelectorAll(".icon i");

let isDragging = false,
    startX,
    scrollLeft;

const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
};

const smoothScroll = (direction) => {
    const scrollStep = direction === "left" ? -100 : 100;
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
        tabsBox.scrollLeft += scrollStep;
        scrollAmount += Math.abs(scrollStep);

        if (scrollAmount >= 250) {
            clearInterval(slideTimer);
            handleIcons(tabsBox.scrollLeft);
        }
    }, 10);
};

// Corrige interferência no clique dos links
arrowIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
        e.stopPropagation();
        smoothScroll(icon.id);
    });
});

allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabsBox.querySelector(".active")?.classList.remove("active");
        tab.classList.add("active");
    });
});

const dragStart = (e) => {
    // Garante que não inicie o drag se clicar em um link
    if (e.target.tagName === 'A' || e.target.closest('a')) return;

    isDragging = true;
    tabsBox.classList.add("dragging");
    startX = e.pageX || e.touches[0].pageX;
    scrollLeft = tabsBox.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX) * 0.75;
    tabsBox.scrollLeft = scrollLeft - walk;
    handleIcons(tabsBox.scrollLeft);
};

const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
};

tabsBox.addEventListener("mousedown", dragStart);
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

tabsBox.addEventListener("touchstart", dragStart, { passive: true });
tabsBox.addEventListener("touchmove", dragging, { passive: true });
tabsBox.addEventListener("touchend", dragStop, { passive: true });
