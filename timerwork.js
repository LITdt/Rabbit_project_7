//get selected work time
const workMinutes = Number(localStorage.getItem("workTime")) || 50;

//convert min to sec
let totalSeconds = workMinutes * 60;
let remainingSeconds = totalSeconds;
let timerInterval = null;
let running = false;

//get html elements
const timer = document.getElementById("timer");
const timerCircle = document.getElementById("timer-circle");
const timerMessage = document.getElementById("timer-message");
const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const stopButton = document.getElementById("stop-btn");
const coinReward = document.getElementById("coin-reward");
const happinessReward = document.getElementById("happiness-reward");

//calculate rewards
const coinsEarned = Math.floor(workMinutes / 5);
const happinessEarned = Math.floor(workMinutes / 10);


//display rewards
coinReward.textContent = "🪙 " + coinsEarned + " coins";
happinessReward.textContent = "❤️ " + happinessEarned + " happiness!";

//display timer
function updateTimer(){
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    timer.textContent = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    
    //calculate how much of the circle remains
    const progress = remainingSeconds / totalSeconds;
    const degrees = progress * 360;

    timerCircle.style.background = `conic-gradient(#715b62 ${degrees}deg, #d5b9b2 ${degrees}deg)`;

}

//start timer
function startTimer(){
    if (running){
        return;
    }
    running = true;
    timerMessage.textContent = "Your rabbit is studying!";

    timerInterval = setInterval(function(){
        remainingSeconds--;
        updateTimer();

        //timer finished
        if (remainingSeconds <=0){
            clearInterval(timerInterval);
            running = false;
            finishStudy();

        }
    }, 1000);

}

//pause timer
function pauseTimer(){
    if(!running){
        return;
    }

    clearInterval(timerInterval);
    running = false;
    timerMessage.textContent = "Timer paused. Take a breather!";
}

//stop timer
function stopTimer(){
    clearInterval(timerInterval);
    running = false;
    remainingSeconds = totalSeconds;
    updateTimer();
    timerMessage.textContent = "Timer reset. Ready to Study?";

}

//study sess. finished
function finishStudy(){
    timerMessage.textContent = "Study session complete!!";

    //add coins
    addCoins(coinsEarned);

    //add happiness
    
    //add reward earned from this study sesh.
    happiness += happinessEarned;

    //keep between 0 and 100
    happiness = Math.min(100, happiness);

    //save happiness
    localStorage.setItem("happiness", happiness);

    //reset the decay timer bc the rabbit just recieved a happiness boost
    lastHappinessUpdate = Date.now();
    localStorage.setItem("lastHappinessUpdate", lastHappinessUpdate);

    //update shared happiness display
    updateHappiness();

    //save reward for break page
    localStorage.setItem("lastHappinessEarned", happinessEarned);

    //go to break page
    setTimeout(function (){
        window.location.href = "timerbreak.html";
    }, 1500);
}

//buttons
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);

//initial timer display
updateTimer();
