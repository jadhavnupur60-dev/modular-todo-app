
import { useState } from "react";

function TodoInput({ onAddTask }) {
  const [task, setTask] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTask = task.trim();

    if (!trimmedTask) {
      return;
    }

    onAddTask(trimmedTask);
    setTask("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What do you need to do?"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        aria-label="New task"
      />

      <button type="submit">+ Add Task</button>
    </form>
  );
}

export default TodoInput;
