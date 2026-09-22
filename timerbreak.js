//get the work time
const workMinutes = Number(localStorage.getItem("workTime")) || 50;

//calculate break time
let breakMinutes;
if(workMinutes <= 25){
    breakMinutes =5;
}

else if (workMinutes <=50){
    breakMinutes = 10;
}

else{
    breakMinutes = 15;
}

//convert to seconds
const totalBreakSeconds = breakMinutes * 60;
let remainingSeconds = totalBreakSeconds;

//get elements
const breakTimer = document.getElementById("break-timer");
const breakCircle = document.getElementById("break-circle");
const breakMessage = document.getElementById("break-message");
const skipBreak = document.getElementById("skip-break");

//display break length
document.getElementById("breakdesc").textContent = "You studied for " + workMinutes + " minutes. Your " + breakMinutes + " minute break starts now!";

//update time
function updateBreakTimer(){
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    breakTimer.textContent = String(minutes).padStart(2,"0") + ":" + String(seconds).padStart(2,"0");

    //update circle
    const progress = remainingSeconds / totalBreakSeconds;
    const degrees = progress * 360;
    breakCircle.style.background = `conic-gradient(#97b497 ${degrees}deg, #d5b9b2 ${degrees}deg)`;
}

//start automatic break
const breakInterval = setInterval(function(){
    remainingSeconds--;
    updateBreakTimer();

    //break finshed
    if (remainingSeconds <= 0){
        clearInterval(breakInterval);
        finishBreak();
    }
}, 1000);


//finish break
function finishBreak(){
    breakMessage.textContent = "Break finished! Ready for another study session?";

    setTimeout(function(){
        window.location.href = "timerpage.html";
    }, 2000);
}

//skip break
skipBreak.addEventListener(
    "click", function(){
        window.location.href = "timerpage.html";
    }
);

//initial display
updateBreakTimer();