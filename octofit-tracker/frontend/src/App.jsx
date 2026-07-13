import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1 className="h3 mb-2">OctoFit Tracker</h1>
        <p className="text-body-secondary mb-1">
          API base URL: <code>{apiBaseUrl}</code>
        </p>
        <p className="text-body-secondary mb-3">
          Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> when running in Codespaces.
          Example: <code>VITE_CODESPACE_NAME=your-codespace-name</code>
        </p>
        <nav className="nav nav-pills gap-2">
          <Link className="btn btn-outline-primary" to="/users">Users</Link>
          <Link className="btn btn-outline-primary" to="/teams">Teams</Link>
          <Link className="btn btn-outline-primary" to="/activities">Activities</Link>
          <Link className="btn btn-outline-primary" to="/leaderboard">Leaderboard</Link>
          <Link className="btn btn-outline-primary" to="/workouts">Workouts</Link>
        </nav>
      </header>

      <section className="card shadow-sm">
        <div className="card-body">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
            <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
            <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
            <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
            <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
          </Routes>
        </div>
      </section>
    </main>
  )
}

export default App
