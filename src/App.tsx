import { useTasks } from './useTasks'
import { TaskForm } from './components/TaskForm'
import { TaskItem } from './components/TaskItem'
import type { Filter } from './types'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
]

function App() {
  const {
    visibleTasks,
    filter,
    setFilter,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    reload,
  } = useTasks()

  return (
    <div className="page">
      <main className="card">
        <h1 className="title">Task Manager</h1>

        <TaskForm onAdd={addTask} />

        <div className="filters" role="group" aria-label="Filter tasks">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={filter === f.value ? 'filter active' : 'filter'}
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading && (
          <p className="status" role="status">
            Loading tasks…
          </p>
        )}

        {error && (
          <div className="status error" role="alert">
            <p>{error}</p>
            <button className="btn" onClick={reload}>
              Try again
            </button>
          </div>
        )}

        {!loading && !error && visibleTasks.length === 0 && (
          <p className="status">No tasks here.</p>
        )}

        {!loading && !error && visibleTasks.length > 0 && (
          <ul className="task-list">
            {visibleTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default App
