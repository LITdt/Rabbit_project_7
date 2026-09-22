const rabbit = document.getElementById("rabbit");
const flowers = document.querySelector(".flowers");
const message = document.getElementById("pet-message");

//pet rabbit
let lastPet = 0;

//petting happiness limit
const PET_HAPPINESS_CAP = 15;
const PET_COOLDOWN = 3 * 60 * 60 * 1000; //3hrs
const PET_REWARD = 2;

//get saved petting daya
let petHappinessEarned = Number(localStorage.getItem("petHappinessEarned")) || 0;
let petCooldownStart = Number(localStorage.getItem("petCooldownStart")) || 0;


function petRabbit() {
    //prevent happiness increasing hundreds of time per minute from rapid mouse clicks
    const now = Date.now();

    //prevent extremely rapid petting
    if (now - lastPet < 700) {
        return;
    }

    lastPet = now;

    //check if the 3hr cooldown has ended
    if (petCooldownStart > 0 && now - petCooldownStart >= PET_COOLDOWN){
        petHappinessEarned = 0;
        petCooldownStart = 0;

        localStorage.setItem("petHappinessEarned", 0);
        localStorage.setItem("petCooldownStart", 0);
    }

    //give happiness if cap allows
    if (petHappinessEarned < PET_HAPPINESS_CAP){
        //don't give more than remaining allowance
        const happinessToGive = Math.min(
            PET_REWARD,
            PET_HAPPINESS_CAP - petHappinessEarned
        );

        happiness += happinessToGive;

        //keep happiness between 0-100
        happiness = Math.min(100, happiness);

        //track how much happiness has been earned from patting
        petHappinessEarned += happinessToGive;

        //start the cooldown once the full +15 has been earned
        if (petHappinessEarned >= PET_HAPPINESS_CAP){
            petCooldownStart = now;
            localStorage.setItem("petCooldownStart", petCooldownStart);
        }

        //save 
        localStorage.setItem("happiness", happiness);

        lastHappinessUpdate = Date.now();

        localStorage.setItem("lastHappinessUpdate", lastHappinessUpdate);


        //update happiness display
        updateHappiness();
    }


    //message
    if (message){
        message.textContent = "Your rabbit loves the attention! ❤️";
    }

    //jelly bounce
    rabbit.classList.remove("petted");

    //forces animation to restart
    void rabbit.offsetWidth;

    rabbit.classList.add("petted");

    //flowers
    flowers.classList.remove("show");
    void flowers.offsetWidth;
    flowers.classList.add("show");
}

//mouse dragging for petting
rabbit.addEventListener(
    "mouseenter", function(){
        petRabbit();
    }
);

//touch / click
rabbit.addEventListener(
    "click", function(){
        petRabbit();
    }
);

