let todo = JSON.parse(localStorage.getItem("todo") || "[]");

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todocount");
const addButton = document.querySelector(".btn");
const deleteButton = document.querySelector(".delete");

document.addEventListener("DOMContentLoaded", () => {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask) {
    todo.push({ text: newTask, disabled: false });
    todoInput.value = "";
    saveToLocalStorage();
    displayTasks();
  }
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "todo-container";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = item.disabled;
    checkbox.addEventListener("change", () => toggleTask(index));

    const p = document.createElement("p");
    p.className = "todo-text";
    p.textContent = item.text;
    if (item.disabled) p.classList.add("disabled");
    p.addEventListener("click", () => editTask(index));

    li.appendChild(checkbox);
    li.appendChild(p);
    todoList.appendChild(li);
  });

  todoCount.textContent = todo.length;
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function editTask(index) {
  const existingText = todo[index].text;
  const input = document.createElement("input");
  input.type = "text";
  input.value = existingText;
  input.className = "input-field";

  const li = todoList.children[index];
  li.innerHTML = ""; // Clear existing content
  li.appendChild(input);
  input.focus();

  input.addEventListener("blur", () => {
    const updatedText = input.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function deleteAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todo = [];
    saveToLocalStorage();
    displayTasks();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
