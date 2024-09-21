let startTime;
let updatedTime;
let difference;
let timerId;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startStopButton.addEventListener('click', function() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        timerId = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
        isRunning = true;
    } else {
        clearInterval(timerId);
        difference = new Date().getTime() - startTime;
        startStopButton.textContent = 'Start';
        isRunning = false;
    }
});

resetButton.addEventListener('click', function() {
    clearInterval(timerId);
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    difference = 0;
    isRunning = false;
    laps = [];
    lapsList.innerHTML = '';
});

lapButton.addEventListener('click', function() {
    if (isRunning) {
        const lapTime = display.textContent;
        laps.push(lapTime);
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapsList.appendChild(li);
    }
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = 
        (hours > 9 ? hours : "0" + hours) + ":" + 
        (minutes > 9 ? minutes : "0" + minutes) + ":" + 
        (seconds > 9 ? seconds : "0" + seconds) + "." + 
        (milliseconds > 9 ? milliseconds : "0" + milliseconds);
}
