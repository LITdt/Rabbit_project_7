const happinessFill =document.getElementById("happiness-fill");
const happinessNumber = document.getElementById("happiness-number");
const rabbit = document.getElementById("rabbit");
const yummy = document.getElementById("yummy");
const sparkles = document.querySelector(".food-sparkles");
const message = document.getElementById("feed-message");

//food info
//each food has emoji and happiness increase
const foodData = {
    Carrot: {
        emoji: "🥕", happiness: 10
    },

    Apple: {
        emoji:"🍎", happiness: 8
    },

    Cake: {
        emoji: "🍰", happiness: 10
    },

    Lettuce: {
        emoji: "🥬", happiness: 5
    },

    Strawberry: {
        emoji: "🍓", happiness: 10
    },

    Lolly: {
        emoji: "🍬", happiness: 7
    },

    Donut: {
        emoji: "🍩", happiness: 10
    },

    Watermelon: {
        emoji: "🍉", happiness: 15
    }
};

//get bought food - food inventory
let foodInventory = JSON.parse(localStorage.getItem("foodInventory")) || [];

const foodList = document.getElementById("food-list");

//display food
function displayFood() {
    foodList.innerHTML = "";

    //no food?
    if (foodInventory.length === 0) {
        foodList.innerHTML = "<p>You don't have any food yet! Go to the shop to buy some. </p>";
        return;
    }

    //create a draggable food item
    foodInventory.forEach(function(foodName, index){
        const food = foodData[foodName];

        //safety check
        if (!food) {
            return;
        }

        const foodItem = document.createElement("div");
        foodItem.classList.add("food-item");
        foodItem.draggable = true;
        foodItem.dataset.index = index;

        foodItem.innerHTML = `
            ${food.emoji}
            <span>${foodName}</span>`; //the ` create a template literal / string, which inserts js variables
            //into text instead of having to break the string and use +. 

        //start dragging
        foodItem.addEventListener(
            "dragstart", function(event) {
                event.dataTransfer.setData("foodIndex", index);
            }
        );

        //tap food to feed on mobile
        foodItem.addEventListener("click", function(){
            feedRabbit(index);
        });
        foodList.appendChild(foodItem);
    });
}

function feedRabbit(index){
    const foodName = foodInventory[index];
    const food = foodData[foodName];

    if(!food){
        return;
    }

    //increase happiness
    happiness += food.happiness;
    
    //keep happiness between 0 and 100
    happiness = Math.min(100, happiness);

    //reset happiness decay timer
    lastHappinessUpdate = Date.now();

    localStorage.setItem("lastHappinessUpdate", lastHappinessUpdate);

    //update shared happiness system
    updateHappiness();
    updateRabbitMood();

    //feeding message
    if (message){ 
        message.textContent = "Your rabbit enjoyed the " + foodName + "!💞";
    }

    //rabbit eating animation
    rabbit.classList.remove("eating");
    //forces animation to restart
    void rabbit.offsetWidth;

    rabbit.classList.add("eating");

    ///yummy animation
    yummy.classList.remove("show");

    void yummy.offsetWidth;

    yummy.classList.add("show");

    //sparkles animation
    sparkles.classList.remove("show");

    void sparkles.offsetWidth;

    sparkles.classList.add("show");

    //remove the food from the inventory
    foodInventory.splice(index,1);
    
    localStorage.setItem(
        "foodInventory", JSON.stringify(foodInventory)
    );

    //refresh food list
    displayFood();
}
//display food when page opens
displayFood();


//rabbit drop area
rabbit.addEventListener("dragover", function(event){
    //allows the rabbit to accept dropped food.
    event.preventDefault();
});

rabbit.addEventListener("drop", function(event){
    event.preventDefault();
    const index = Number(event.dataTransfer.getData("foodIndex"));
    feedRabbit(index);
});