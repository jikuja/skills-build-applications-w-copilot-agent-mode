import { useEffect, useState } from 'react'

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.docs)) return payload.docs
  return []
}

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${apiBaseUrl}/activities/`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const payload = await response.json()
        setActivities(normalizeItems(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch activities')
      }
    }

    loadActivities()
  }, [apiBaseUrl])

  if (error) return <p className="text-danger mb-0">Failed to load activities: {error}</p>

  return (
    <div>
      <h2 className="h5 mb-3">Activities</h2>
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id || activity.id || `${activity.activityType}-${activity.completedAt}`} className="list-group-item">
            <strong>{activity.activityType || 'Activity'}</strong>
            <div className="text-body-secondary small">
              {activity.durationMinutes || 0} min, {activity.caloriesBurned || 0} kcal
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Activities
