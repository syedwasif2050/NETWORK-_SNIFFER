const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// 1. Page load hote hi Local Storage se data nikalna
document.addEventListener('DOMContentLoaded', getTasks);

function addTask() {
    if (input.value === '') return alert("Kuch likhen!");
    
    createTaskElement(input.value);
    saveLocal(input.value);
    input.value = '';
}

function createTaskElement(text) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="text">${text}</span>
        <div class="actions">
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    list.appendChild(li);
}

function deleteTask(btn) {
    const taskItem = btn.parentElement.parentElement;
    removeLocal(taskItem.querySelector('.text').innerText);
    taskItem.remove();
}

function editTask(btn) {
    const taskItem = btn.parentElement.parentElement;
    const textNode = taskItem.querySelector('.text');
    const oldText = textNode.innerText;
    
    const newText = prompt("Edit your task:", oldText);
    if (newText !== null && newText !== "") {
        textNode.innerText = newText;
        updateLocal(oldText, newText);
    }
}

// --- Local Storage Functions ---
function saveLocal(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task));
}

function removeLocal(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocal(oldT, newT) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = tasks.indexOf(oldT);
    tasks[index] = newT;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}