<script>
  document.addEventListener("DOMContentLoaded", function () {
    let current = window.location.pathname;
    if (current === "/" || current === "") {
      current = "/index.html";
    }
    document.querySelectorAll(".navbar a").forEach(function (link) {
      const linkPath = new URL(link.href).pathname;

      if (linkPath === current) {
        link.classList.add("active");

        // Đánh dấu luôn cha nếu trong dropdown
        const dropdown = link.closest(".dropdown-content");
        if (dropdown) {
          const parentLink = dropdown.parentElement.querySelector("a");
          if (parentLink) parentLink.classList.add("active");
        }
      }
    });
  });
</script>
  <button id="backToTop" title="Về đầu trang">⬆️</button>
  <script>
  // Hiện nút khi cuộn xuống
  window.onscroll = function() {
    document.getElementById("backToTop").style.display =
      (document.documentElement.scrollTop > 200) ? "block" : "none";
  };

  // Cuộn về đầu trang
  document.getElementById("backToTop").onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
</script>
      <!-- ✨ Đồng hồ chữ nhật nằm góc trên bên phải -->
<style>
#corner-clock {
  position: fixed;
  top: 10px;
  right: 15px;
  background-color: #A8D8EA;
  color: #333;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
  z-index: 999;
  font-family: 'Segoe UI', sans-serif;
}
</style>

<div id="corner-clock">🕒 Loading...</div>

<script>
function updateCornerClock() {
  const now = new Date();
  const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString('vi-VN', options);
  document.getElementById('corner-clock').textContent = `🕒 ${time} | ${date}`;
}
setInterval(updateCornerClock, 1000);
updateCornerClock();
</script>
<!-- 💬 Nút nổi "Gửi lời nhắn" -->
<style>
#message-tab {
  position: fixed;
  bottom: 150px;
  right: 20px;
  background-color: #59C3C3;
  color: white;
  padding: 12px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  cursor: pointer;
  z-index: 999;
  font-family: 'Segoe UI', sans-serif;
}

#form-popup {
  display: none;
  position: fixed;
  bottom: 80px;
  right: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  z-index: 1000;
  width: 280px;
  font-family: 'Segoe UI', sans-serif;
}

#form-popup input,
#form-popup textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

#form-popup button[type="submit"] {
  background: #59C3C3;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

#thanks-message {
  display: none;
  color: green;
  margin-top: 10px;
  font-weight: bold;
}

#close-form-button {
  position: absolute;
  top: 8px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #00bfa6;
}
</style>

<!-- Nút mở form -->
<div id="message-tab" onclick="toggleForm()">💬 Gửi lời nhắn cho Sophia</div>

<!-- Popup form -->
<div id="form-popup">
  <!-- Nút đóng nằm ngoài form -->
  <button id="close-form-button" onclick="toggleForm()">✖</button>
  
  <form action="https://formspree.io/f/xwpqbyla" method="POST" onsubmit="showThanks(event)">
    <input type="text" name="name" placeholder="Họ tên" required>
    <input type="email" name="email" placeholder="Email của bạn" required>
    <textarea name="message" rows="4" placeholder="Lời nhắn..." required></textarea>
    <button type="submit">Gửi</button>
    <div id="thanks-message">💌 Cảm ơn bạn đã gửi lời nhắn!</div>
  </form>
</div>

<script>
  function toggleForm() {
    const popup = document.getElementById('form-popup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  }

  function showThanks(event) {
    event.preventDefault();
    const form = event.target;
    const thanksMessage = form.querySelector('#thanks-message');
    thanksMessage.style.display = 'block';
    // Gửi form sau 1 chút
    setTimeout(() => form.submit(), 1000);
  }
</script>


<script>
function toggleForm() {
  var form = document.getElementById('form-popup');
  form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
}
function showThanks(event) {
  event.preventDefault();
  const form = event.target;
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      form.reset();
      document.getElementById('thanks-message').style.display = 'block';
      setTimeout(() => {
        document.getElementById('form-popup').style.display = 'none';
        document.getElementById('thanks-message').style.display = 'none';
      }, 2500);
    }
  });
}
</script>
