
import { getTasks, saveTasks } from "./storage.js";
import { renderTasks, setupUI } from "./ui.js";

// Load previously saved tasks
let tasks = getTasks();

// Generate a unique ID for each task
function createTaskId() {
    if (globalThis.crypto?.randomUUID) {
        return globalThis.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Save data and update the page
function updateTasks() {
    const saved = saveTasks(tasks);

    renderTasks(tasks);

    if (!saved) {
        console.error("Your latest changes could not be saved.");
    }
}

// Add a new task
function addTask(text) {
    const newTask = {
        id: createTaskId(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    updateTasks();
}

// Listen for task completion events
document.addEventListener("task-toggle", event => {
    const { id, completed } = event.detail;

    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed }
            : task
    );

    updateTasks();
});

// Listen for task deletion events
document.addEventListener("task-delete", event => {
    const { id } = event.detail;

    tasks = tasks.filter(task => task.id !== id);

    updateTasks();
});

// Connect the form to the addTask function
setupUI(addTask);

// Display tasks when the application starts
renderTasks(tasks);
