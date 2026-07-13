import { useEffect, useState } from 'react'

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.docs)) return payload.docs
  return []
}

function Leaderboard({ apiBaseUrl }) {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${apiBaseUrl}/leaderboard/`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const payload = await response.json()
        setEntries(normalizeItems(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard')
      }
    }

    loadLeaderboard()
  }, [apiBaseUrl])

  if (error) return <p className="text-danger mb-0">Failed to load leaderboard: {error}</p>

  return (
    <div>
      <h2 className="h5 mb-3">Leaderboard</h2>
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li key={entry._id || entry.id || `${entry.rank}-${entry.points}`} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <strong>{entry.user?.fullName || 'Unknown User'}</strong>
              <div className="text-body-secondary small">Streak: {entry.streakDays || 0} days</div>
            </div>
            <span className="badge text-bg-primary rounded-pill">{entry.points || 0} pts</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Leaderboard
