const textInput = document.getElementById("textInput");
const addBtn = document.getElementById("addBtn");
const tasklist = document.getElementById("tasklist");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  tasklist.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    const span = document.createElement("span");

    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    span.addEventListener("click", function () {
      task.completed = !task.completed;

      saveTasks();
      displayTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);

      saveTasks();
      displayTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    tasklist.appendChild(li);
  });
}

function addTask() {
  const taskText = textInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    text: taskText,
    completed: false
  });

  saveTasks();
  displayTasks();

  textInput.value = "";
  textInput.focus();
}

addBtn.addEventListener("click", addTask);

displayTasks();