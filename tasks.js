// This connects the HTML elements to the JS file
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list'); //const creates a variable which bindings cannot be reassigned.

//get saved tasks from localstorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//displays saved tasks
function displayTasks(){
    taskList.innerHTML = "";
    tasks.forEach(function(task, index){
        const li = document.createElement('li');

        //create task text
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.text;

        //if task was already complete
        if (task.completed){
            taskTextSpan.style.textDecoration = 'line-through';
            taskTextSpan.style.opacity = '0.5';
        }

        //creating container for buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('task-buttons');

        //create complete button
        const completeBtn = document.createElement("button");
        if (task.completed){
            completeBtn.textContent = "Completed";
            completeBtn.disabled = true;
        }
        else{
            completeBtn.textContent = "Complete";
        }
        completeBtn.classList.add('complete-btn');

        //create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        //complete task
        completeBtn.addEventListener('click', function(){
            if (task.completed){
                return;
            }
            task.completed = true;

            taskTextSpan.style.textDecoration = 'line-through';
            taskTextSpan.style.opacity = '0.5';
            completeBtn.disabled = true;
            completeBtn.textContent = 'Completed';

            //give 2 coins
            addCoins(2);

            //save updated task
            localStorage.setItem("tasks", JSON.stringify(tasks));

        });

        //delete task
        deleteBtn.addEventListener('click', function(){
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        });

        //put buttons in button container
        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(deleteBtn);

        //everything into list item
        li.appendChild(taskTextSpan);
        li.appendChild(buttonContainer);
        taskList.appendChild(li);
    });
}

// Function to handle adding a task
function addTask() {

    const taskText = taskInput.value.trim();

    // Prevent adding empty tasks
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    //max of 3 active tasks
    const activeTasks = tasks.filter(function(task){
        return !task.completed;
    });

    if(activeTasks.length >= 3){
        alert("You can only have 3 active tasks. Complete them to do more!");
        return;
    }

    // Create a new task
    const newTask = {
        text:taskText,
        completed:false
    };

    //add task to the array
    tasks.push(newTask);
    
    //save tasks
    localStorage.setItem("tasks", JSON.stringify(tasks));

    //show tasks
    displayTasks();

    //clear input
    taskInput.value = "";
}

//add task when button is clicked
addBtn.addEventListener('click', addTask);

//add task when 'enter' is pressed
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

//show saved tasks when page loads
displayTasks();