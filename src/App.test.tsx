import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { validateTitle } from './validation'
import * as api from './api'

vi.mock('./api')
const mockedApi = vi.mocked(api)

beforeEach(() => {
  mockedApi.getTodos.mockResolvedValue([
    { id: 1, title: 'Pending task', completed: false },
    { id: 2, title: 'Done task', completed: true },
  ])
  mockedApi.createTodo.mockResolvedValue({
    id: 3,
    title: 'New',
    completed: false,
  })
  mockedApi.updateTodo.mockResolvedValue({ id: 1, title: 'x', completed: true })
  mockedApi.deleteTodo.mockResolvedValue()
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('validateTitle', () => {
  it('rejects empty and too-short titles, accepts valid ones', () => {
    expect(validateTitle('')).toBeTruthy()
    expect(validateTitle('ab')).toBeTruthy()
    expect(validateTitle('Buy milk')).toBeNull()
  })
})

describe('App', () => {
  it('loads and shows tasks from the API', async () => {
    render(<App />)
    expect(await screen.findByText('Pending task')).toBeInTheDocument()
    expect(screen.getByText('Done task')).toBeInTheDocument()
  })

  it('adds a new task to the list', async () => {
    render(<App />)
    await screen.findByText('Pending task')

    await userEvent.type(screen.getByLabelText(/new task/i), 'Walk the dog')
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('Walk the dog')).toBeInTheDocument()
  })

  it('filters to show only completed tasks', async () => {
    render(<App />)
    await screen.findByText('Pending task')

    await userEvent.click(screen.getByRole('button', { name: 'Completed' }))

    expect(screen.getByText('Done task')).toBeInTheDocument()
    expect(screen.queryByText('Pending task')).not.toBeInTheDocument()
  })
})
