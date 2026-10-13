
const STORAGE_KEY = "modular-todo-tasks";

// Get saved tasks from localStorage
export function getTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);

        if (!savedTasks) {
            return [];
        }

        const tasks = JSON.parse(savedTasks);

        if (
            !Array.isArray(tasks) ||
            !tasks.every(
                task =>
                    task &&
                    typeof task.id === "string" &&
                    typeof task.text === "string" &&
                    typeof task.completed === "boolean"
            )
        ) {
            return [];
        }

        return tasks;
    } catch (error) {
        console.error("Could not load tasks:", error);
        return [];
    }
}

// Save tasks to localStorage
export function saveTasks(tasks) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return true;
    } catch (error) {
        console.error("Could not save tasks:", error);
        return false;
    }
}
