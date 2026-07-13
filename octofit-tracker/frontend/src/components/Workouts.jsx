import { useEffect, useState } from 'react'

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.docs)) return payload.docs
  return []
}

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${apiBaseUrl}/workouts/`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const payload = await response.json()
        setWorkouts(normalizeItems(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch workouts')
      }
    }

    loadWorkouts()
  }, [apiBaseUrl])

  if (error) return <p className="text-danger mb-0">Failed to load workouts: {error}</p>

  return (
    <div>
      <h2 className="h5 mb-3">Workouts</h2>
      <ul className="list-group">
        {workouts.map((workout) => (
          <li key={workout._id || workout.id || workout.title} className="list-group-item">
            <strong>{workout.title || 'Workout'}</strong>
            <div className="text-body-secondary small">
              {workout.category || 'General'} | {workout.difficulty || 'mixed'} | {workout.durationMinutes || 0} min
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Workouts
