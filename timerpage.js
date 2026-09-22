//get slider
const workTimer = document.getElementById("worktimer");
const timeDisplay = document.getElementById("time-display");
const startButton = document.getElementById("work");
const breakTimeDisplay = document.getElementById("break-time");


//show the selected time
function updateTimeDisplay(){
    timeDisplay.textContent = workTimer.value;   
}

updateTimeDisplay();

//update number when slider moves
workTimer.addEventListener("input", function(){
    updateTimeDisplay();
    updateBreakTime();
});

//save selected time when start timer! is clicked
startButton.addEventListener("click", function(){
    const selectedMinutes = Number(workTimer.value);
    localStorage.setItem("workTime", selectedMinutes);
});

//for break time display
function updateBreakTime(){
    const workTime = Number(workTimer.value);
    let breakTime;

    if(workTime <=25){
        breakTime = 5;
    }
    else if(workTime <=50){
        breakTime = 10;
    }
    else if(workTime <=75){
        breakTime = 15;
    }
    else{
        breakTime = 20;
    }

    breakTimeDisplay.textContent = breakTime;
}
updateCoinDisplay();