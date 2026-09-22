

//food inventory
//get previously bought food. if there's no inventory yet, create an empty one.
let foodInventory = JSON.parse(localStorage.getItem("foodInventory")) || [];

//html elements
const coinCount = document.getElementById("coin-count");
const shopMessage = document.getElementById("shop-message");

//update coin display
function updateCoins(){
    if (coinCount){
        coinCount.textContent = "🪙 " + coins;
    }
    localStorage.setItem("coins", coins);
}

//buy food
function buyFood(foodName, price){
    //check if user has enough coins
    if (coins >=price){
        //take away the price
        coins -=price;

        //add the food to inventory
        foodInventory.push(foodName);

        //save everything
        localStorage.setItem(
            "foodInventory", JSON.stringify(foodInventory)
        );
        //save coins
        localStorage.setItem("coins", coins);

        //update coin display
        updateCoins();
        //message
        shopMessage.textContent = "You bought a " + foodName +"!🛍️";
    }
    else{
        //not enough coins
        shopMessage.textContent = "You don't have enough coins!";
    }
}

//load coins
updateCoins();