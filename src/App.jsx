
import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("todo-tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(newTask) {
    setTasks((previousTasks) => [...previousTasks, newTask]);
  }

  function deleteTask(taskToDelete) {
    setTasks((previousTasks) => {
      const index = previousTasks.indexOf(taskToDelete);

      if (index === -1) {
        return previousTasks;
      }

      return previousTasks.filter((_, i) => i !== index);
    });
  }

  function clearTasks() {
    setTasks([]);
  }

  return (
    <main className="app-container">
      <section className="todo-card">
        <header className="todo-header">
          <span className="app-icon">✓</span>
          <h1>My To-Do List</h1>
          <p>Organize your day, one task at a time.</p>
        </header>

        <TodoInput onAddTask={addTask} />

        <div className="task-summary">
          <span>
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>

          {tasks.length > 0 && (
            <button
              type="button"
              className="clear-button"
              onClick={clearTasks}
            >
              Clear all
            </button>
          )}
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📝</span>
            <h2>No tasks yet!</h2>
            <p>Add your first task to get started.</p>
          </div>
        ) : (
          <ul className="todo-list">
            {tasks.map((task, index) => (
              <TodoItem
                key={`${task}-${index}`}
                task={task}
                onDeleteTask={deleteTask}
              />
            ))}
          </ul>
        )}

        <footer className="todo-footer">
          Made with React 💜
        </footer>
      </section>
    </main>
  );
}

export default App;
