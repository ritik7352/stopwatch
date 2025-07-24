let startTime = 0;
let elapsed = 0;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const centiseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 60000) % 60);
  const hours = Math.floor(ms / 3600000);

  return (
    (hours < 10 ? "0" : "") + hours + ":" +
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds + "." +
    (centiseconds < 10 ? "0" : "") + centiseconds
  );
}

function updateDisplay() {
  display.textContent = formatTime(elapsed);
}

function tick() {
  elapsed = Date.now() - startTime;
  updateDisplay();
}

startBtn.onclick = function () {
  if (!running) {
    startTime = Date.now() - elapsed;
    timerInterval = setInterval(tick, 10);
    running = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
  }
};

pauseBtn.onclick = function () {
  if (running) {
    clearInterval(timerInterval);
    running = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
  }
};

resetBtn.onclick = function () {
  clearInterval(timerInterval);
  running = false;
  startTime = 0;
  elapsed = 0;
  laps = [];
  updateDisplay();
  lapsList.innerHTML = "";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
};

lapBtn.onclick = function () {
  if (running) {
    const lapTime = formatTime(elapsed);
    laps.push(lapTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsList.insertBefore(li, lapsList.firstChild);
  }
};

// Initialize
updateDisplay();
pauseBtn.disabled = true;
resetBtn.disabled = true;
lapBtn.disabled = true;
