//Shared rabbit data - this should allow for the page to have the same coin count and happiness level throughout all components.
//get saved happiness
let happiness = Number(localStorage.getItem("happiness"));


//if there is no saved happiness yet, start at 40
if (Number.isNaN(happiness)) { //Number.isNaN is more precise since this is working with numbers.
    happiness = 40;
    localStorage.setItem("happiness", happiness);

}

//get saved coins
let coins = Number(localStorage.getItem("coins"));
if(Number.isNaN(coins)){
    coins = 0;
    localStorage.setItem("coins", coins);
}

//add coins
function addCoins(amount){
    coins += amount;
    localStorage.setItem("coins", coins);
    updateCoinDisplay();
}

//update coin number on page
function updateCoinDisplay(){
    const coinCount = document.getElementById("coin-count");
    if (coinCount) {
        coinCount.textContent = "🪙 " + coins;
    }
}

//update display when page loads
updateCoinDisplay();

//rabbit name!!
//get saved rabbit name
let rabbitName = localStorage.getItem("rabbitName") || "";

//save rabbit name when the input changes
document.addEventListener("DOMContentLoaded", function(){
    const nameInput = document.getElementById("username");
    if (!nameInput) return;
    //show saved name when page loads
    nameInput.value = rabbitName;

    //save new name
    nameInput.addEventListener("input", function(){
        rabbitName = nameInput.value;
        localStorage.setItem("rabbitName", rabbitName);
    });
});

//update happiness bar and number
function updateHappiness(){
    //keep happiness between 0 and 100
    happiness = Math.max(0, Math.min(100, happiness));

    //save happiness
    localStorage.setItem("happiness", happiness);

    //find happiness bar on current pg
    const happinessBar = document.getElementById("happiness-fill");
    if (happinessBar) {
        happinessBar.style.width = happiness + "%";
    }

    //find happiness number
    const happinessNumber = document.getElementById("happiness-number");
    if (happinessNumber){
        happinessNumber.textContent = Math.round(happiness) + "%";
    }
}

//rabbit mood
function updateRabbitMood(){
    const rabbit = document.getElementById("rabbit");

    if(!rabbit) return;
    if (happiness <= 0){
        rabbit.classList.add("sad");
    }
    else{
        rabbit.classList.remove("sad");
    }
}
//happiness decay happening over 48 hours
//no interaction/studying = no happiness increase. (interaction + studying increases happiness)
//48 hours in milliseconds
const decayTime = 48 * 60 * 60 * 1000;

//find when happiness was last updated
let lastHappinessUpdate = Number(localStorage.getItem('lastHappinessUpdate'));

//if there was no prev. update time start timer now
if (Number.isNaN(lastHappinessUpdate)) {
    lastHappinessUpdate = Date.now();
    localStorage.setItem('lastHappinessUpdate', lastHappinessUpdate);
}


//decrease happiness over time
function decreaseHappiness(){
    const now = Date.now();

    //how much time passed since last update
    const timePassed = now - lastHappinessUpdate;

    //how much happiness should be lost based on time & how much should remain
    const pointsLost = Math.floor((timePassed / decayTime) * 100);

    if (pointsLost > 0){
        happiness = Math.max(0, happiness - pointsLost);

        //keep any leftover time for the next calculation
        lastHappinessUpdate += pointsLost * (decayTime / 100);

        localStorage.setItem("happiness", happiness);
        localStorage.setItem("lastHappinessUpdate", lastHappinessUpdate);
        updateHappiness();
        updateRabbitMood();
    }

    //stop at 0
    if (happiness <= 0){
        happiness = 0;
        localStorage.setItem("happiness", 0);
        updateRabbitMood();
    }
}



//check for decay every minute
setInterval(decreaseHappiness, 60 * 1000);


//page load
//check decay when page opens
decreaseHappiness();

//update coin display
updateCoinDisplay();

//update happiness display
updateHappiness();
updateRabbitMood();

document.addEventListener("DOMContentLoaded", function () {

    //Night popup here
    const popup = document.getElementById("night-popup");
    const closeBtn = document.getElementById("close-popup");
    
    //stop if this page doesn't have the popup
    if (!popup || !closeBtn) return;

    //show the popup
    function showPopup(){
        popup.style.display = 'flex';

        //small delay so the fade-in animation works properly
        setTimeout(function(){
            popup.classList.add("show");
        }, 10);
    }

    // Get the current local hour (0 to 23)
    const currentHour = new Date().getHours();

    //Check if time is >= 9 PM (21) OR < 7Am (7) - if so, show.
    if (currentHour >= 21 || currentHour < 7) {
        showPopup();
    }

    //dismiss button
    closeBtn.addEventListener("click", function(){

        //hide the popup
        popup.classList.remove("show");

        //wait for fadeout animation
        setTimeout(function(){
            popup.style.display ="none";
        }, 400);

        //show it again after 30 seconds
        setTimeout(function(){
            const newHour = new Date().getHours();

            //only show again if still between 9pm and 7am
            if (newHour >=21 || newHour <7){
                showPopup();
            }
        }, 30000); //shows the reminder every 30 seconds (constant reminders are more likely to get people to go to bed if they get in the way).
    });

});

