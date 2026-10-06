// Task class represents one task object.
class Task {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  // Class function to display task information.
  getDetails() {
    return `${this.title}: ${this.description}`;
  }
}


// TaskManager class stores and manages all tasks.
class TaskManager {
  constructor() {
    // Array stores the task objects.
    this.tasks = [
      new Task(1, "Learn JavaScript", "Practice classes and arrays"),
      new Task(2, "Complete Assignment", "Finish the task manager")
    ];

    // Keeps task IDs unique and incremented.
    this.nextId = 3;
  }

  // Add a new task to the array.
  addTask(title, description) {
    const task = new Task(this.nextId, title, description);

    this.tasks.push(task);
    this.nextId++;

    this.renderTasks();
  }

  // Delete a task using its unique ID.
  deleteTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);

    this.renderTasks();
  }

  // Display all tasks on the page.
  renderTasks() {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    this.tasks.forEach(task => {
      const card = document.createElement("div");
      card.className = "task-card";

      card.innerHTML = `
        <h3>${escapeHtml(task.title)}</h3>
        <p>${escapeHtml(task.description)}</p>
        <p><strong>Task ID:</strong> ${task.id}</p>
        <button class="delete-btn" onclick="taskManager.deleteTask(${task.id})">
          Delete
        </button>
      `;

      taskList.appendChild(card);
    });
  }
}


// Create the TaskManager.
const taskManager = new TaskManager();


// Add task button.
document.getElementById("addTaskBtn").addEventListener("click", () => {
  const title = document.getElementById("taskTitle").value.trim();
  const description = document.getElementById("taskDescription").value.trim();

  if (title === "" || description === "") {
    alert("Please enter both task title and description.");
    return;
  }

  taskManager.addTask(title, description);

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
});


// Prevent HTML from being inserted into task text.
function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// Show initial tasks.
taskManager.renderTasks();
