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
  });

  const deleteButton = document.getElementById('deleteTask');
    deleteButton.addEventListener('click', () => {
        const selectForm = document.getElementById('task-dropdown');
        const selectedOption = selectForm.options[selectForm.selectedIndex];
        
        if (selectedOption) {
            const taskId = selectedOption.value; // Assuming the value of the option is "Task #taskId"
            console.log(selectedOption)
            const taskIdNum = parseInt(taskId.split('#')[1]);
            
            // Find the task with the corresponding ID in the taskList array
            const taskIndex = taskList.findIndex((task) => task.taskId === taskIdNum);

            if (taskIndex !== -1) {
                // Remove the task from the taskList array
                taskList.splice(taskIndex, 1);

                // Remove the selected option from the select form
                selectForm.remove(selectForm.selectedIndex);

                // Save the updated taskList to local storage
                saveTasksToLocalStorage();

                // Debug
                console.log("Deleted task with ID:", taskIdNum);
            }
        }
    });
});

//Functions
function addTask(taskText, dateText, timeText) {
  // Function to add a new task to the list
  let newTask = new Task(dateText, timeText, taskText, taskList.length+1)
  taskList.push(newTask)
  const select = document.getElementById("task-dropdown")
  const newOption = new Option(`You have to ${taskText} at ${timeText} on ${dateText}`, `Task #${taskList.length}`)
  select.append(newOption)
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
      // Clear the select form before adding tasks to avoid duplicates
      const selectForm = document.getElementById('task-dropdown');
      selectForm.innerHTML = '';

      // Create a set to keep track of the task IDs that have been added
      const addedTaskIds = new Set();

      parsedTaskList.forEach((taskData) => {
          const { date, time, text, id, taskCompleted } = taskData;

          // Check if the task ID is already in the set (i.e., if the task is already added)
          if (!addedTaskIds.has(id)) {
              // Create a new Task object and add it to the taskList array
              const task = new Task(date, time, text, id, taskCompleted);
              taskList.push(task);

              // Add the task to the select form
              const newOption = new Option(`You have to ${text} at ${time} on ${date}`, `Task #${id}`);
              selectForm.append(newOption);

              // Add the task ID to the set to mark it as added
              addedTaskIds.add(id);
          }
      });

      console.log('Reconstructed Task List:', taskList);
  } else {
      taskList = []; // If no tasks found in Local Storage, start with an empty list
  }
}
  
  