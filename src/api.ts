import type { Task } from './types'

// JSONPlaceholder is a free mock API. GET returns real data; POST/PATCH/DELETE
// reply with a fake success but don't actually persist, so the UI updates
// local state optimistically (see useTasks).
const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function getTodos(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/todos?_limit=10`)
  if (!res.ok) throw new Error('Failed to load tasks')
  return res.json()
}

export async function createTodo(title: string): Promise<Task> {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed: false }),
  })
  if (!res.ok) throw new Error('Failed to add task')
  return res.json()
}

export async function updateTodo(id: number, completed: boolean): Promise<Task> {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  })
  if (!res.ok) throw new Error('Failed to update task')
  return res.json()
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/todos/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete task')
}
