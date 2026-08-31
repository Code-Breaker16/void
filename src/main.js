import './style.css';

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
            alert('Timer complete!');
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
    appContainer.innerHTML = "<p class='loading'>fetching NASA APOD...</p>";

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY || 'DEMO_KEY'}`)
      .then(response => response.json())
      .then(data => {
        let media = '';

        if (data.media_type === "image" && data.url) {
          media = `<img src="${data.url}" alt="${data.title || 'APOD Image'}" class="apod-img" />`;
        } else {
          // Strictly force an embedded iframe element for videos/web feeds
          let embedUrl = data.url || "https://apod.nasa.gov/apod/";

          if (embedUrl.includes("youtube.com/watch?v=")) {
            embedUrl = embedUrl.replace("watch?v=", "embed/");
          } else if (embedUrl.includes("youtu.be/")) {
            embedUrl = embedUrl.replace("youtu.be/", "www.youtube.com/embed/");
          }

          media = `<iframe src="${embedUrl}" class="apod-video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }

        appContainer.innerHTML = `
          <h2 class="apod-title">${data.title || 'Astronomy Picture of the Day'}</h2>
          ${media}
          <p class="apod-desc">${data.explanation || ''}</p>
        `;
      })
      .catch(err => {
        appContainer.innerHTML = `<p class="error">Failed to load APOD feed: ${err.message}</p>`;
      });
  }
});