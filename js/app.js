import {Task} from './taskObject.js'


//Define Variables and Constants
let taskList = []; // An array to store the list of tasks
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const form = document.getElementById('add-task-form');
const todoContainer = document.querySelector('.todo-container');
const testArea = document.getElementById("testarea")
const printButton = document.getElementById('printToDo')
//Wait for the DOM to Load
document.addEventListener('DOMContentLoaded', () => {
  // Step 5: Initialize the Application (optional)
  // Load tasks from local storage or perform other setup tasks
  // ...
  loadTasksFromLocalStorage();
  // Step 4: Implement Event Listeners
  form.addEventListener('submit', (event) => {
    
    //This function is used to prevent the default action of clicking the submit button.
    event.preventDefault();

    //Call AddTask with the given values in the boxes.
    addTask(taskInput.value, dateInput.value, timeInput.value);
    
    // Clear the input field after adding a task
    taskInput.value = ''; 
    dateInput.value = '';
    timeInput.value = '';


    //Save TaskList to Local Storage
    saveTasksToLocalStorage();


    //Debug
    console.log("pain")
    printListToConsole();
  });

  todoContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const taskId = event.target.dataset.taskId;
      deleteTask(taskId);
    } else if (event.target.classList.contains('task-checkbox')) {
      const taskId = event.target.dataset.taskId;
      markTaskAsCompleted(taskId);
    }
  });

  printButton.addEventListener('click', (event) => {
    printListToConsole()
  })
});

//Functions
function addTask(taskText, dateText, timeText) {
  // Function to add a new task to the list
  let newTask = new Task(dateText, timeText, taskText)
  taskList.push(newTask)
}

function deleteTask(taskId) {
  // Function to delete a task from the list
  // ...
}

function markTaskAsCompleted(taskId) {
  // Function to mark a task as completed
  // ...
}

function printListToConsole(){
    testArea.value = ""
    for(let i = 0; i < taskList.length; i++)
    {
        testArea.value += taskList[i].printTask() + '\n'
    }
}


//Functions used to store and load the task list after adding them.
function saveTasksToLocalStorage() {
    const serializedTasks = taskList.map((task) => task.toPlainObject());
    localStorage.setItem('taskList', JSON.stringify(serializedTasks));
  }
  

function loadTasksFromLocalStorage() {
    const savedTaskList = localStorage.getItem('taskList');
    console.log('Saved Task List:', savedTaskList);
    if (savedTaskList) {
      const parsedTaskList = JSON.parse(savedTaskList);
      console.log('Parsed Task List:', parsedTaskList);
  
      taskList = parsedTaskList.map((taskData) => {
        const { date, time, text, taskCompleted } = taskData;
        return new Task(date, time, text, taskCompleted);
      });
      console.log('Reconstructed Task List:', taskList);
    } else {
      taskList = []; // If no tasks found in Local Storage, start with an empty list
    }
}
  
  