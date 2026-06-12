import { useState } from 'react'
import type { FormEvent } from 'react'
import { validateTitle } from '../validation'

interface TaskFormProps {
  onAdd: (title: string) => void
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const validationError = validateTitle(title)
    if (validationError) {
      setError(validationError)
      return
    }
    onAdd(title.trim())
    setTitle('')
    setError(null)
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label className="sr-only" htmlFor="new-task">
          New task
        </label>
        <input
          id="new-task"
          className="input"
          value={title}
          placeholder="Add a new task..."
          onChange={(event) => {
            setTitle(event.target.value)
            if (error) setError(null)
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'task-error' : undefined}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
      {error && (
        <p id="task-error" className="error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
