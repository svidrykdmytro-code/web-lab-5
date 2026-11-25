// ===== Налаштування =====
const VARIANT = 18;               // номер у журналі групи
const MODAL_DELAY_MS = 60000;     // 1 хвилина
const MODAL_CLOSED_KEY = "contactFormClosed";

// ===== 1. Інформація про ОС і браузер: localStorage -> футер =====
function saveSystemInfo() {
  const info = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor,
    language: navigator.language,
    languages: (navigator.languages || []).join(", "),
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory ?? "н/д",
    screen: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  Object.entries(info).forEach(([key, value]) => localStorage.setItem(key, String(value)));
}

function renderStorage() {
  const dl = document.getElementById("storageInfo");
  dl.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const dt = document.createElement("dt");
    dt.textContent = key;
    const dd = document.createElement("dd");
    dd.textContent = localStorage.getItem(key);
    dl.append(dt, dd);
  }
}

// ===== 2. Відгуки з JSONPlaceholder =====
async function loadReviews() {
  const box = document.getElementById("reviewsList");
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`);
    if (!response.ok) throw new Error("HTTP " + response.status);
    const comments = await response.json();

    box.innerHTML = "";
    comments.forEach((c) => {                 // у порядку отримання
      const card = document.createElement("article");
      card.className = "review";

      const title = document.createElement("h3");
      title.textContent = c.name;
      const email = document.createElement("span");
      email.className = "email";
      email.textContent = c.email;
      const text = document.createElement("p");
      text.textContent = c.body;

      card.append(title, email, text);
      box.appendChild(card);
    });
  } catch (err) {
    box.textContent = "Не вдалося завантажити відгуки: " + err.message;
  }
}

// ===== 3. Модальне вікно з формою =====
const modal = document.getElementById("modal");
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

function openModal() {
  modal.hidden = false;
  form.elements.name.focus();
}
function closeModal() {
  modal.hidden = true;
  sessionStorage.setItem(MODAL_CLOSED_KEY, "1");   // не показувати повторно в цій сесії
}

if (sessionStorage.getItem(MODAL_CLOSED_KEY) !== "1") {
  setTimeout(openModal, MODAL_DELAY_MS);
}

document.getElementById("closeX").addEventListener("click", closeModal);
document.getElementById("closeBtn").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

// Форма має action + method="POST" (Formspree); тут лише відправляємо її без перезавантаження сторінки
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector("button[type=submit]");
  submitBtn.disabled = true;
  statusEl.className = "form-status";
  statusEl.textContent = "Надсилання…";
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    form.reset();
    statusEl.className = "form-status ok";
    statusEl.textContent = "Дякую! Повідомлення надіслано.";
  } catch {
    statusEl.className = "form-status err";
    statusEl.textContent = "Не вдалося надіслати. Спробуйте ще раз.";
  } finally {
    submitBtn.disabled = false;
  }
});

// ===== 4. Денна / нічна тема =====
const toggleBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.body.classList.toggle("light-mode", theme === "light");
  toggleBtn.textContent = theme === "light" ? "☀️ Світла тема" : "🌙 Темна тема";
}

// Світла: 07:00–21:00, темна: увесь інший час
function themeByTime() {
  const hour = new Date().getHours();
  return hour >= 7 && hour < 21 ? "light" : "dark";
}

toggleBtn.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("light-mode") ? "dark" : "light");
});

// ===== Запуск =====
applyTheme(themeByTime());
saveSystemInfo();
renderStorage();
loadReviews();
