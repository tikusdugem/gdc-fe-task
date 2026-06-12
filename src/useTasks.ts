import { useEffect, useState } from 'react'
import * as api from './api'
import type { Filter, Task } from './types'

/**
 * All task state + actions in one place. Mutations update local state
 * immediately and fire the API call in the background (the mock API doesn't
 * persist, so we don't wait on it).
 */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  // Load tasks on mount and whenever "Try again" bumps reloadKey. loading/error
  // are reset by the initial state (mount) and by reload() (retry), so the
  // effect only touches state inside its async callbacks.
  useEffect(() => {
    let active = true
    api
      .getTodos()
      .then((data) => active && setTasks(data))
      .catch(() => active && setError('Could not load tasks. Please try again.'))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [reloadKey])

  function reload() {
    setLoading(true)
    setError(null)
    setReloadKey((key) => key + 1)
  }

  function addTask(title: string) {
    const newTask: Task = { id: Date.now(), title, completed: false }
    setTasks((prev) => [newTask, ...prev])
    api.createTodo(title).catch(() => {})
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
    const task = tasks.find((t) => t.id === id)
    if (task) api.updateTodo(id, !task.completed).catch(() => {})
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
    api.deleteTodo(id).catch(() => {})
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  return {
    visibleTasks,
    filter,
    setFilter,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    reload,
  }
}
