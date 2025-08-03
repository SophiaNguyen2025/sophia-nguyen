document.addEventListener("DOMContentLoaded", function () {
  // Đánh dấu menu đang active
  let current = window.location.pathname;
  if (current === "/" || current === "") current = "/index.html";
  document.querySelectorAll(".navbar a").forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === current) {
      link.classList.add("active");
      const dropdown = link.closest(".dropdown-content");
      if (dropdown) {
        const parentLink = dropdown.parentElement.querySelector("a");
        if (parentLink) parentLink.classList.add("active");
      }
    }
  });

  // Cuộn lên đầu trang
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.style.display = (window.scrollY > 200) ? "block" : "none";
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Cập nhật đồng hồ
  const clockEl = document.getElementById("corner-clock");
  if (clockEl) {
    function updateClock() {
      const now = new Date();
      const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
      const time = now.toLocaleTimeString();
      const date = now.toLocaleDateString('vi-VN', options);
      clockEl.textContent = `🕒 ${time} | ${date}`;
    }
    setInterval(updateClock, 1000);
    updateClock();
  }

  // Gửi lời nhắn
  const messageTab = document.getElementById("message-tab");
  const formPopup = document.getElementById("form-popup");
  const closeBtn = document.getElementById("close-form-button");
  const thanksMsg = document.getElementById("thanks-message");

  if (messageTab && formPopup) {
    messageTab.addEventListener("click", () => {
      formPopup.style.display = (formPopup.style.display === "block") ? "none" : "block";
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      formPopup.style.display = "none";
    });
  }

  const contactForm = document.querySelector("#form-popup form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { "Accept": "application/json" }
      }).then(response => {
        if (response.ok) {
          contactForm.reset();
          thanksMsg.style.display = "block";
          setTimeout(() => {
            thanksMsg.style.display = "none";
            formPopup.style.display = "none";
          }, 2500);
        }
      });
    });
  }
});
