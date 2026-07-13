import { useEffect, useState } from 'react'

function normalizeItems(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  if (payload && Array.isArray(payload.docs)) return payload.docs
  return []
}

function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${apiBaseUrl}/users/`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const payload = await response.json()
        setUsers(normalizeItems(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users')
      }
    }

    loadUsers()
  }, [apiBaseUrl])

  if (error) return <p className="text-danger mb-0">Failed to load users: {error}</p>

  return (
    <div>
      <h2 className="h5 mb-3">Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id || user.id || user.email} className="list-group-item">
            <strong>{user.fullName || user.name || 'Unknown User'}</strong>
            <div className="text-body-secondary small">{user.email || 'No email provided'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
