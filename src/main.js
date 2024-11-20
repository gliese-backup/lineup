import localforage from "localforage";
import "./index.css";
import { formEl, inputEl, taskListEl, yearEl } from "./domSelection";
import Task from "./components/Task";

let state = [];

localforage.getItem("tasks").then((tasks) => {
  if (tasks) {
    state = tasks;
    console.log(state);
    renderTasks();
  }
});

// This toggles the isCompleted property of the task
// Will be called when the user clicks on the checkbox
function toggleTask(id) {
  state = state.map((task) => {
    if (task.id === id) {
      return { ...task, isCompleted: !task.isCompleted };
    }
    return task;
  });

  // Show uncompleted state first
  state.sort((a, b) => a.isCompleted - b.isCompleted);
  localforage.setItem("tasks", state);
}

function renderTasks() {
  taskListEl.innerHTML = "";
  const fragment = document.createDocumentFragment();

  state.forEach((task) => {
    const taskEl = Task(task.value, task.isCompleted, task.id);
    fragment.appendChild(taskEl);
  });

  // Render on real DOM
  taskListEl.appendChild(fragment);
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the page from reloading

  //  Checking for empty input
  if (!inputEl.value) {
    return;
  }

  state.unshift({
    id: crypto.randomUUID(),
    value: inputEl.value,
    isCompleted: false,
  });

  console.log(state);
  localforage.setItem("tasks", state);

  renderTasks();

  //  Empty the input field
  inputEl.value = "";
});

taskListEl.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT") {
    console.log(e.target.closest("label").id);
    toggleTask(e.target.closest("label").id);
    renderTasks();
  }
});

// IIFE
(function () {
  const year = new Date().getFullYear();

  // MARK: Update the DOM
  yearEl.textContent = `${year}`;
})();
