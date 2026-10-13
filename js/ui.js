
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyMessage = document.getElementById("empty-message");

// Display all tasks on the page
export function renderTasks(tasks) {
    taskList.replaceChildren();

    emptyMessage.hidden = tasks.length > 0;

    const completedCount = tasks.filter(
        task => task.completed
    ).length;

    taskCount.textContent =
        `${tasks.length} tasks · ${completedCount} completed`;

    tasks.forEach(task => {
        const item = document.createElement("li");
        item.className = "task-item";

        if (task.completed) {
            item.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute(
            "aria-label",
            `Mark ${task.text} as completed`
        );

        checkbox.addEventListener("change", () => {
            document.dispatchEvent(
                new CustomEvent("task-toggle", {
                    detail: {
                        id: task.id,
                        completed: checkbox.checked
                    }
                })
            );
        });

        const text = document.createElement("span");
        text.className = "task-text";

        // Use textContent instead of innerHTML for user input
        text.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute(
            "aria-label",
            `Delete ${task.text}`
        );

        deleteButton.addEventListener("click", () => {
            document.dispatchEvent(
                new CustomEvent("task-delete", {
                    detail: { id: task.id }
                })
            );
        });

        item.append(checkbox, text, deleteButton);
        taskList.appendChild(item);
    });
}

// Listen for the form submission
export function setupUI(onAddTask) {
    taskForm.addEventListener("submit", event => {
        event.preventDefault();

        const text = taskInput.value.trim();

        if (!text) {
            taskInput.focus();
            return;
        }

        onAddTask(text);
        taskInput.value = "";
        taskInput.focus();
    });
}
