/** Returns an error message for an invalid task title, or null when it's valid. */
export function validateTitle(title: string): string | null {
  const trimmed = title.trim()
  if (!trimmed) return 'Please enter a task title.'
  if (trimmed.length < 3) return 'Title must be at least 3 characters.'
  return null
}
