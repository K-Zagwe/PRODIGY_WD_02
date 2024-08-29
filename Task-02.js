let startTime
let updatedTime 
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapTimes = document.getElementById("lapTimes");

function startTimer() {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateTimer, 1000);
    running = true;
    stopBtn.disabled = false;
    lapBtn.disabled = false;
    resetBtn.disabled = true;
    startBtn.disabled = true;
}

function stopTimer() {
    clearInterval(timerInterval);
    running = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
    lapBtn.disabled = true;
    startBtn.disabled = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    difference = 0;
    display.textContent = "00:00:00";
    lapTimes.textContent = "";
    running = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    startBtn.disabled = false;
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const time = new Date(difference);

    const hours = String(time.getUTCHours()).padStart(2, "0");
    const minutes = String(time.getUTCMinutes()).padStart(2, "0");
    const seconds = String(time.getUTCSeconds()).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
    const lapTime = display.textContent;
    laps.push(lapTime);
    lapTimes.innerHTML = laps.map((lap, index) => `Lap ${index + 1}: ${lap}`).join('<br>');
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
