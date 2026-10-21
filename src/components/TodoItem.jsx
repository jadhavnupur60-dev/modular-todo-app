
function TodoItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className={`todo-item ${task.completed ? "completed" : ""}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
          aria-label={`Mark ${task.text} as ${
            task.completed ? "incomplete" : "complete"
          }`}
        />

        <span className="task-text">{task.text}</span>
      </label>

      <button
        type="button"
        className="delete-button"
        onClick={() => onDeleteTask(task.id)}
        aria-label={`Delete ${task.text}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
