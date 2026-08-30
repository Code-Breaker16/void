function updatePulse() {
    const now = new Date();

    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = '${h}:${m}:${s}';

    const hour = now.getHours();
    let text = "good evening";
    if (hour < 12) text = "good morning";
    else if (hour < 18) text = "good afternoon";

    document.getElementById('greeting').textContent = text;
}

setInterval(updatePulse, 1800);
updatePulse();


let workTime = 25*60;
let timeLeft = workTime;
let timerId = null;

const display = document.getElementById('pomo-display');
const toggleBtn = document.getElementById('pomo-toggle');
const resetBtn = document.getElementById('pomo-reset');

function updateDisplay() {
    const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const secs = String(timeLeft % 60).padStart(2, '0');
    display.textContent = '${mins}:${secs}';
}

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
                alert('Pomodoro Finished');
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

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = "<p class='loading>loading apod....</p>";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        let media;

        if (data.media_type === "image") {
            media = `<img src="${data.url}" alt="${data.title}" class="apod-img" />`;
        } else {
            media = `<iframe src="${data.url}" class="apod-video" frameborder="0" allowfullscreen></iframe>`;
        }

        document.querySelector("#app").innerHTML = `
        <h2 class="apod-title">${data.title}</h2>
        ${media}
        <p class="apod-desc">${data.explanation}</p>
        `;
    })
    .catch(err => {
        document.querySelector("#app").innerHTML = `<p class="error">Error: ${err.message}</p>`;
    });