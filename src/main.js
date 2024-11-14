import "./index.css";
import { formEl, inputEl, taskListEl, yearEl } from "./domSelection";
import Task from "./components/Task";

const tasks = [];

function renderTasks() {
  taskListEl.innerHTML = "";
  const fragment = document.createDocumentFragment();

  tasks.forEach((task) => {
    const taskEl = Task(task.value, task.isCompleted);
    fragment.appendChild(taskEl);
  });

  taskListEl.appendChild(fragment);
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the page from reloading

  //  Checking for empty input
  if (!inputEl.value) {
    return;
  }

  tasks.unshift({
    id: crypto.randomUUID(),
    value: inputEl.value,
    isCompleted: false,
  });

  console.log(tasks);

  renderTasks();

  //  Empty the input field
  inputEl.value = "";
});

// IIFE
(function () {
  const year = new Date().getFullYear();

  // MARK: Update the DOM
  yearEl.textContent = `${year}`;
})();
