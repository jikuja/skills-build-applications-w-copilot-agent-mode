import { useEffect, useState } from 'react'

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.docs)) return payload.docs
  return []
}

function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${apiBaseUrl}/teams/`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const payload = await response.json()
        setTeams(normalizeItems(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch teams')
      }
    }

    loadTeams()
  }, [apiBaseUrl])

  if (error) return <p className="text-danger mb-0">Failed to load teams: {error}</p>

  return (
    <div>
      <h2 className="h5 mb-3">Teams</h2>
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team._id || team.id || team.name} className="list-group-item">
            <strong>{team.name || 'Unnamed Team'}</strong>
            <div className="text-body-secondary small">{team.city || 'Unknown city'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Teams
