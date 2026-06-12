# Task Manager

A simple task management app built with **React + TypeScript + Vite**. It loads tasks from a mock API and lets you add, complete, delete, and filter them.

## Features

- **List tasks** loaded from the API
- **Add a task** with form validation (required, at least 3 characters)
- **Toggle status** – mark a task done / undone
- **Delete a task**
- **Filter** – All / Pending / Completed
- Loading, error (with retry), and empty states
- Accessible and responsive (mobile, tablet, desktop)

## Getting started

Requires Node 18+.

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5173
npm test         # run unit tests
npm run build    # type-check + production build
```

## API

Data comes from the free **[JSONPlaceholder](https://jsonplaceholder.typicode.com/)** mock API.

| Action            | Method | Endpoint           |
| ----------------- | ------ | ------------------ |
| List tasks        | GET    | `/todos?_limit=10` |
| Add a task        | POST   | `/todos`           |
| Toggle completion | PATCH  | `/todos/:id`       |
| Delete a task     | DELETE | `/todos/:id`       |

> **Note:** the API is read-only. `GET` returns real data, but `POST` / `PATCH` /
> `DELETE` only return a fake success and don't persist. The app updates its local
> state immediately and fires the request in the background, so changes won't
> survive a page refresh.

## Architecture

Small and flat. State and data fetching live in one custom hook (`useTasks`),
which the `App` component reads from and passes down to two presentational
components.

```
src/
├── api.ts                # fetch functions for the /todos endpoints
├── types.ts              # Task and Filter types
├── validation.ts         # task title validation
├── useTasks.ts           # all task state + actions (useState based)
├── components/
│   ├── TaskForm.tsx      # add-task input with validation
│   └── TaskItem.tsx      # a single task row
├── App.tsx               # layout, filters, and the loading/error/empty states
├── index.css             # all styles
└── main.tsx              # entry point
```

- **`useTasks`** holds the tasks, the active filter, and loading/error flags, and
  exposes `addTask`, `toggleTask`, `deleteTask`, and `reload`.
- **`api.ts`** is the only place that calls `fetch`.
- **Components** are presentational – they receive data and callbacks as props.

## Tests

`src/App.test.tsx` covers title validation, loading tasks, adding a task, and
filtering — using Vitest + React Testing Library with the API module mocked.
