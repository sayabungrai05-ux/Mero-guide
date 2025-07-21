// Select DOM elements
const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('.task-list');
const taskInput = document.querySelector('#task-input');

// Initialize tasks array from local storage or create an empty one
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Event listeners
document.addEventListener('DOMContentLoaded', displayTasks);
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', editOrDeleteTask);

// Function to display tasks
function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach(function(task, index) {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
      <span class="task-name ${task.completed ? 'completed' : ''}">${task.name}</span>
      <button class="edit-task-btn">Edit</button>
      <button class="delete-task-btn">Delete</button>
    `;
    li.setAttribute('data-id', index);
    taskList.appendChild(li);
  });
}

// Function to add task
function addTask(e) {
  e.preventDefault();
  const taskName = taskInput.value.trim();
  if (taskName === '') return;
  const newTask = { name: taskName, completed: false };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
  taskInput.value = '';
}

// Function to edit or delete task
function editOrDeleteTask(e) {
  if (e.target.classList.contains('edit-task-btn')) {
    const li = e.target.parentElement;
    const taskId = li.getAttribute('data-id');
    const taskNameSpan = li.querySelector('.task-name');
    const taskCheckbox = li.querySelector('.task-checkbox');
    const taskName = taskNameSpan.innerText;
    const taskCompleted = taskCheckbox.checked;
    const newTaskName = prompt('Enter new task name:', taskName);
    if (newTaskName === null || newTaskName === '') return;
    tasks[taskId].name = newTaskName;
    tasks[taskId].completed = taskCompleted;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
  } else if (e.target.classList.contains('delete-task-btn')) {
    const li = e.target.parentElement;
    const taskId = li.getAttribute('data-id');
    tasks.splice(taskId, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
  } else if (e.target.classList.contains('task-checkbox')) {
    const li = e.target.parentElement;
    const taskId = li.getAttribute('data-id');
    tasks[taskId].completed = e.target.checked;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    const taskNameSpan = li.querySelector('.task-name');
    taskNameSpan.classList.toggle('completed');
  }
}
