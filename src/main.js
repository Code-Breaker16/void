import './style.css';

document.addEventListener("DOMContentLoaded", () => {
  // rest of your JS code...
document.addEventListener("DOMContentLoaded", () => {

  function updatePulse() {
    const clockEl = document.getElementById('clock');
    const greetingEl = document.getElementById('greeting');

    if (!clockEl || !greetingEl) return;

    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s}`;

    const hour = now.getHours();
    let text = "good evening";
    if (hour < 12) text = "good morning";
    else if (hour < 18) text = "good afternoon";

    greetingEl.textContent = text;
  }

  setInterval(updatePulse, 1000);
  updatePulse();


  let workTime = 25 * 60;
  let timeLeft = workTime;
  let timerId = null;

  const display = document.getElementById('pomo-display');
  const toggleBtn = document.getElementById('pomo-toggle');
  const resetBtn = document.getElementById('pomo-reset');

  function updateDisplay() {
    if (!display) return;
    const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const secs = String(timeLeft % 60).padStart(2, '0');
    display.textContent = `${mins}:${secs}`;
  }

  if (toggleBtn && resetBtn) {
    toggleBtn.addEventListener('click', () => {
      if (timerId === null) {
        timerId = setInterval(() => {
          if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
          } else {
            clearInterval(timerId);
            timerId = null;
            toggleBtn.textContent = 'start';
            alert('Pomodoro finished!');
          }
        }, 1000);
        toggleBtn.textContent = 'pause';
      } else {
        clearInterval(timerId);
        timerId = null;
        toggleBtn.textContent = 'start';
      }
    });

    resetBtn.addEventListener('click', () => {
      clearInterval(timerId);
      timerId = null;
      timeLeft = workTime;
      updateDisplay();
      toggleBtn.textContent = 'start';
    });
  }


  const API_KEY = import.meta.env.VITE_NASA_API_KEY;
  const appContainer = document.querySelector("#app");

  if (appContainer) {
    appContainer.innerHTML = "<p class='loading'>loading apod...</p>";

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY || 'DEMO_KEY'}`)
      .then(response => response.json())
      .then(data => {
        let media;

        if (data.media_type === "image") {
          media = `<img src="${data.url}" alt="${data.title || 'APOD Image'}" class="apod-img" />`;
        } else {
          media = `<iframe src="${data.url}" class="apod-video" frameborder="0" allowfullscreen></iframe>`;
        }

        appContainer.innerHTML = `
          <h2 class="apod-title">${data.title || 'Astronomy Picture of the Day'}</h2>
          ${media}
          <p class="apod-desc">${data.explanation || ''}</p>
        `;
      })
      .catch(err => {
        appContainer.innerHTML = `<p class="error">Error: ${err.message}</p>`;
      });
  }
});

// --- MATRIX RAIN BACKGROUND ---
const canvas = document.getElementById('matrix');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Characters to drop (Katakana, numbers, and symbols)
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ日月火水木金土日月火水木金土';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  });

  function drawMatrix() {
    // Subtle black fade effect for trailing characters
    ctx.fillStyle = 'rgba(13, 13, 13, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF41'; // Bright matrix green (or use #555555 for subtle monochrome)
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 33); // ~30 FPS
}